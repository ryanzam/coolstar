import { getAllBookings } from '@/app/api/booking';
import BookingCard from '@/components/BookingCard';
import React from 'react'

interface DashboardAdminPageProps {
    user: any
}

const DashboardAdminPage = async ({ user }: DashboardAdminPageProps) => {

    const bookings = await getAllBookings();

    return (
        <main className="pt-20 min-h-screen frost-bg">
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {bookings?.data && bookings?.data?.length > 0 ? (
                        <div className='grid grid-cols-1 gap-2'>
                            {bookings.data.map((booking: any) => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                        </div>
                    ) : (
                        <p>No bookings available.</p>
                    )}

                </div>
            </section>
        </main>
    )
}

export default DashboardAdminPage