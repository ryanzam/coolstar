"use client"

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Booking, BookingStatus } from '@prisma/client'
import { Badge } from "@/components/ui/badge"
import { CircleCheckBigIcon, CircleXIcon, ClockCheckIcon, ClockFadingIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useActionState, useEffect } from 'react'
import { updateBookingStatus } from '@/app/api/booking'
import { toast } from 'sonner'

type ExtendedBooking = Booking & {
    user: {
        name: string
        email: string
    }
}
interface BookingCardProps {
    booking: ExtendedBooking,
    adminView?: boolean
}

export const getStatusBadgeVariant = (status: string) => {
    if (status === BookingStatus.CONFIRMED)
        return <Badge variant="default"><ClockCheckIcon /> Confirmed</Badge>
    if (status === BookingStatus.CANCELLED)
        return <Badge variant="destructive" ><CircleXIcon /> Cancelled</Badge>
    if (status === BookingStatus.COMPLETED)
        return <Badge variant="outline" className='bg-green-500'><CircleCheckBigIcon /> Completed</Badge>

    return <Badge variant="outline"><ClockFadingIcon /> Pending</Badge>
}

const BookingCard = ({ booking, adminView = false }: BookingCardProps) => {

    const [state, formAction, isPending] = useActionState(updateBookingStatus, null);

    useEffect(() => {
        if (state?.success) {
            toast.success("Booking status updated successfully.");
            window.location.reload();
        } else if (state?.error) {
            toast.error("Failed to update booking status.");
        }
    }, [state]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{booking.serviceType}  {getStatusBadgeVariant(booking.status)}</CardTitle>
                <CardDescription>{booking.description}</CardDescription>
                <CardAction>
                    {adminView ? (
                        <form action={formAction}>
                            <input type="hidden" name="bookingId" value={booking.id} />
                            <select name="bookingStatus" defaultValue={booking.status} id="booking-status" className="border px-3 rounded-md text-sm py-1 font-bold">
                                <option value="PENDING"> Pending</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                            <Button type="submit" size="sm" variant="secondary" className='ml-2' disabled={isPending}>
                                {isPending ? 'Updating...' : 'Update Status'}
                            </Button>
                        </form>
                    ) : (
                        <Button size="sm" variant="secondary" className='ml-5'>Edit Info</Button>
                    )}
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-sm'><strong>Name:</strong> {booking?.user?.name}</p>
                        <p className='text-sm'><strong>Email:</strong> {booking?.user?.email}</p>
                    </div>
                    <div>
                        <p className='text-sm'><strong>Phone:</strong> {booking.phone}</p>
                        <p className='text-sm'><strong>Address:</strong> {booking.address}</p>
                    </div>
                </div>
                <p className='text-sm'><strong>Service Booked:</strong> {booking.created.toDateString()}</p>

            </CardContent>
        </Card>
    )
}

export default BookingCard