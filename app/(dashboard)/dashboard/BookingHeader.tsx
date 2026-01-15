"use client"

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BookingHeader = () => {

    const router = useRouter();

    return (
        <Card>
            <CardContent>
                <CardHeader>
                    <CardTitle>No Bookings.</CardTitle>
                    <CardDescription>You don't have any bookings yet.</CardDescription>

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