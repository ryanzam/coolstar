interface BookingStatsProps {
    bookings: any[] | undefined
}

const BookingStats = ({ bookings }: BookingStatsProps) => {

    const pendingBookings = bookings?.filter(booking => booking.status === 'PENDING')?.length || 0;
    const confirmedBookings = bookings?.filter(booking => booking.status === 'CONFIRMED')?.length || 0;
    const cancelledBookings = bookings?.filter(booking => booking.status === 'CANCELLED')?.length || 0;
    const completedBookings = bookings?.filter(booking => booking.status === 'COMPLETED')?.length || 0;

    return (
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mb-8">
            <div className="bg-card p-4 rounded-lg shadow text-center text-muted-foreground w-full">
                <h3 className='text-lg font-medium'>Pending</h3>
                <p className='text-2xl font-bold'>{pendingBookings}</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow text-center text-primary w-full">
                <h3 className='text-lg font-medium'>Confirmed </h3>
                <p className='text-2xl font-bold'>{confirmedBookings}</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow text-center  w-full" style={{ color: "green"}}>
                <h3 className='text-lg font-medium'>Completed</h3>
                <p className='text-2xl font-bold'>{completedBookings}</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow text-center text-red-800 w-full" style={{ color: "green"}}>
                <h3 className='text-lg font-medium'>Cancelled </h3>
                <p className='text-2xl font-bold'>{cancelledBookings}</p>
            </div>
        </div>
    )
}

export default BookingStats