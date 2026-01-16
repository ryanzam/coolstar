import { getAllBookings } from '@/app/api/booking';
import BookingCard from '@/components/BookingCard';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { ClockFadingIcon } from 'lucide-react';
import React from 'react'

interface DashboardAdminPageProps {
    user: any
}

const DashboardAdminPage = async ({ user }: DashboardAdminPageProps) => {

    const { data: bookings } = await getAllBookings();

    return (
        <main className="pt-20 min-h-screen frost-bg">
            <section className="py-16">
                <div className="container mx-auto px-4">

                    <Alert className='mb-3 text-white bg-secondary'>
                        <ClockFadingIcon />
                        <AlertTitle>
                            {`${bookings?.length} pending booking(s).`}
                        </AlertTitle>
                    </Alert>

                    {bookings && bookings?.length > 0 ? (
                        <div className='grid grid-cols-1 gap-2'>
                            {bookings.map((booking: any) => (
                                <BookingCard key={booking.id} booking={booking} adminView={true} />
                            ))}
                        </div>
                    ) : (
                        <p>No pending bookings.</p>
                    )}

                </div>
            </section>
        </main>
    )
}

export default DashboardAdminPage