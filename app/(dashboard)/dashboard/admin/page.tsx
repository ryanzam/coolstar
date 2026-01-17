import { getAllBookings, updateBookingStatus } from '@/app/api/booking';
import BookingCard from '@/components/booking/BookingCard';
import BookingCollapsible from '@/components/booking/BookingCollapsible';
import BookingStats from '@/components/booking/BookingStats';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { BookingStatus } from '@prisma/client';
import { ClockFadingIcon } from 'lucide-react';
import { refresh } from 'next/cache'
interface DashboardAdminPageProps {
    user: any
}

const DashboardAdminPage = async ({ user }: DashboardAdminPageProps) => {

    const { data: bookings } = await getAllBookings();
    
    return (
        <main className="pt-20 min-h-screen frost-bg">
            <section className="py-16">
                <div className="container mx-auto px-4">

                    <BookingStats bookings={bookings} />

                    {bookings && bookings?.length > 0 ? (
                        <div className='grid grid-cols-1 gap-2'>
                            {bookings.map((booking: any) => (
                                <BookingCollapsible key={booking.id} booking={booking} />
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