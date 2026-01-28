import { getAllBookings } from '@/app/api/booking';
import BookingCollapsible from '@/components/booking/BookingCollapsible';
import BookingStats from '@/components/booking/BookingStats';

interface DashboardAdminPageProps {
    user: any
}

const DashboardAdminPage = async ({ user }: DashboardAdminPageProps) => {

    const { data: bookings } = await getAllBookings();

    const newBookings = bookings?.filter(booking => booking.status === 'PENDING') || [];
    const oldBookings = bookings?.filter(booking => booking.status !== 'PENDING') || [];

    const getNewBookings = () => {
        if (newBookings.length === 0) {
            return <div className='bg-white border border-gray-400 rounded-md py-3 px-5'>
                You don't have any pending service.
            </div>
        }
        return (
            newBookings.map((booking: any) => (
                <BookingCollapsible key={booking.id} booking={booking} />
            ))
        )
    }

    return (
        <main className="pt-10 min-h-screen frost-bg">
            <section className="py-16">
                <div className="container mx-auto px-4">

                    <BookingStats bookings={bookings} />

                    {bookings && bookings?.length > 0 ? (
                        <div className='flex gap-8 flex-col'>
                            <div className='grid grid-cols-1 gap-2'>
                                <p className="font-semibold pb-2">Pending booking (s)</p>
                                {getNewBookings()}
                            </div>

                            <div>
                                <p className="font-semibold pb-2">Completed</p>
                                {oldBookings.map((booking: any) => (
                                    <BookingCollapsible key={booking.id} booking={booking} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>No pending bookings.</p>
                    )}

                </div>
            </section>
        </main >
    )
}

export default DashboardAdminPage