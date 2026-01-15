"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import z from "zod";

// schemas for auth actions
const registerSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 8 characters'),
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