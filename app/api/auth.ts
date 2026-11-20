"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

// schemas for auth actions
const registerSchema = z.object({
    username: z.string().min(3, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
    username: z.string().min(3, "Invalid username"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function registerUser(prevState: any, formData: FormData) {
    try {
        const formdata = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        const validateData = registerSchema.parse(formdata);

        const existingUser = await prisma.user.findUnique({
            where: { username: validateData.username },
        });

        if (existingUser) {
            return {
                success: false,
                error: "Username already exists.",
            };
        }

        const hashedPassword = await bcrypt.hash(validateData.password, 10);

        const user = await prisma.user.create({
            data: {
                username: validateData.username,
                password: hashedPassword,
            },
        });

        return {
            success: true,
            message: "Registration successful. Please log in.",
        };
    } catch (error) {
        console.error("Registration error:", error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: "Validation failed",
            };
        }

        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create account",
        };
    }
}

export async function loginUser(prevState: any, formData: FormData) {
    try {
        const formdata = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        const validateData = loginSchema.parse(formdata);

        const result = await signIn("credentials", {
            redirect: false,
            username: validateData.username,
            password: validateData.password,
        });

        if (result?.error) {
            return {
                success: false,
                error: "Invalid username or password.",
            };
        }
    } catch (error) {
        console.error("Login user error:", error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: "Invalid username or password.",
            };
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to sign in",
        };
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function logoutUser() {
    try {
        await signOut({ redirect: false });

        return {
            success: true,
            message: "Sign out successful.",
        };
    } catch (error) {
        console.error("Logout user error:", error);

        return {
            success: false,
            error:
                error instanceof Error ? error.message : "Failed to sign out",
        };
    }
}

/**
 * Check if user is authenticated
 */
export async function requireAuth() {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    return session;
}
