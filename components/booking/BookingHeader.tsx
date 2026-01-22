"use client"

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BookingHeaderProps {
    title?: string
    description?: string
}

const BookingHeader = ({ title = "No Bookings.", description = "You don't have any bookings yet." }: BookingHeaderProps) => {

    const router = useRouter();

    return (
        <Card>
            <CardContent>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>

                    <CardAction>
                        <Button variant="secondary" onClick={() => router.push("/booking")} className='cursor-pointer'>
                            <PlusCircleIcon />
                            Book a Service
                        </Button>
                    </CardAction>
                </CardHeader>
            </CardContent>
        </Card>
    )
}

export default BookingHeader