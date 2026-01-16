import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Booking, BookingStatus } from '@prisma/client'
import { Badge } from "@/components/ui/badge"
import { CircleCheckBigIcon, CircleXIcon, ClockCheckIcon, ClockFadingIcon } from 'lucide-react'
import { Button } from './ui/button'

interface BookingCardProps {
    booking: Booking
}

const getStatusBadgeVariant = (status: string) => {
    if (status === BookingStatus.CONFIRMED)
        return <Badge variant="default"><ClockCheckIcon /> Confirmed</Badge>
    if (status === BookingStatus.CANCELLED)
        return <Badge variant="destructive" ><CircleXIcon /> Cancelled</Badge>
    if (status === BookingStatus.COMPLETED)
        return <Badge variant="outline" className='bg-green-500'><CircleCheckBigIcon /> Completed</Badge>

    return <Badge variant="outline"><ClockFadingIcon /> Pending</Badge>
}

const BookingCard = ({ booking }: BookingCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{booking.serviceType}</CardTitle>
                <CardDescription>{booking.description}</CardDescription>
                <CardAction>
                    {getStatusBadgeVariant(booking.status)}
                    <Button variant="default" className='ml-5'>Edit Info</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p className='text-[14px]'><strong>Phone:</strong> {booking.phone}</p>
                <p className='text-[14px]'><strong>Address:</strong> {booking.address}</p>
            </CardContent>
        </Card>
    )
}

export default BookingCard