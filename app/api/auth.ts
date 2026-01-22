"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

// schemas for auth actions
const registerSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function registerUser(prevState: any, formData: FormData) {
    try {
        const formdata = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const validateData = registerSchema.parse(formdata)

        const existingUser = await prisma.user.findUnique({
            where: { email: validateData.email }
        })

        if (existingUser) {
            return {
                success: false,
                error: "User with this email already exists.",
            }
        }

        const hashedPassword = await bcrypt.hash(validateData.password, 10);

        const user = await prisma.user.create({
            data: {
                name: validateData.name,
                email: validateData.email,
                password: hashedPassword,
                role: 'CUSTOMER'
            }
        })

        return {
            success: true,
            message: "Registration successful. Please log in.",
        }

    } catch (error) {
        console.error('Registration error:', error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: "Validation failed"
            }
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create account'
        }
    }
}

export async function loginUser(prevState: any, formData: FormData) {
    try {
        const formdata = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const validateData = loginSchema.parse(formdata)

        const result = await signIn('credentials', {
            redirect: false,
            email: validateData.email,
            password: validateData.password,
        });

        if (result?.error) {
            return {
                success: false,
                error: "Invalid email or password.",
            }
        }

    } catch (error) {
        console.error('Login user error:', error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: "Invalid email or password."
            }
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to sign in'
        }
    }

    revalidatePath('/dashboard');
    redirect("/dashboard")
}

export async function logoutUser() {
    try {
        await signOut({ redirect: false });

        return {
            success: true,
            message: "Sign out successful.",
        }
    } catch (error) {
        console.error('Logout user error:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to sign out'
        }
    }
}

/**
 * Check if user is authenticated
 */
export async function requireAuth() {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function requireAdmin() {
    const session = await requireAuth();

    if (session.user.role !== 'ADMIN') {
        throw new Error('Admin access required');
    }
    return session;
}