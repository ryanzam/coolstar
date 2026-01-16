"use server"

import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import z from "zod";

// schemas for auth actions
const bookingSchema = z.object({
    serviceType: z.string('Service type is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    phone: z.string("Phone number is required"),
    address: z.string('Address is required'),
    userId: z.string().optional(),
});

export async function bookService(prevState: any, formData: FormData) {
    try {
        const formdata = {
            serviceType: formData.get('serviceType') as string,
            description: formData.get('description') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            userId: formData.get('userId') as string,
        };

        const validateData = bookingSchema.parse(formdata)

        const booking = await prisma.booking.create({
            data: {
                serviceType: validateData.serviceType,
                description: validateData.description,
                phone: validateData.phone,
                address: validateData.address,
                status: 'PENDING',
                userId: validateData.userId || '',
            }
        })

        return {
            success: true,
            message: "Booking successful.",
            data: booking
        }

    } catch (error) {
        console.error('Booking error:', error);
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: "Validation failed"
            }
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to book a service.',
        }
    }
}

export async function getUserBookings(userId: string) {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                created: 'desc'
            }
        });

        return {
            success: true,
            message: "Booking fetched successfully.",
            data: bookings
        };

    } catch (error) {
        console.error('Error fetching user bookings:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch user bookings.',
        }
    }
}

export async function getAllBookings() {
    try {
        const bookings = await prisma.booking.findMany({
            select: {
                id: true,
                serviceType: true,
                description: true,
                address: true,
                phone: true,
                status: true,
                created: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                created: 'desc',
            },
        });

        return {
            success: true,
            message: "Bookings fetched successfully.",
            data: bookings
        };

    } catch (error) {
        console.error('Error fetching all bookings:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch all bookings.',
        }
    }
}

export async function updateBookingStatus(prevState: any, formData: FormData) {
    try {
        const bookingId = formData.get('bookingId') as string;
        const status = formData.get('bookingStatus') as BookingStatus;

        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: status },
        });

        return {
            success: true,
            message: "Booking status updated successfully.",
            data: updatedBooking
        };
    } catch (error) {
        console.error('Error updating booking status:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update booking status.',
        }
    }
}