"use client";

import { ChevronsUpDown } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Booking } from "@prisma/client";
import { getStatusBadgeVariant } from "./BookingCard";
import { updateBookingStatus } from "@/app/api/booking";
import { toast } from "sonner";
import { getDistance } from 'geolib';

interface BookingCardProps {
    booking: Booking,
}

const getDistanceBetween = (location: any) => {

    if (location === null) return "N/A";

    const locationObj = JSON.parse(location);

    const distance = getDistance(
        { latitude: locationObj.lat, longitude: locationObj.lng },
        { latitude: 27.6881848, longitude: 84.4327423 }
    );

    return (distance / 1000).toFixed(2);

    console.log();
    return "N/A";
}

const BookingCollapsible = ({ booking }: BookingCardProps) => {

    const [isOpen, setIsOpen] = React.useState(false);
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
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col gap-5 border rounded-md shadow-md"
            style={{ backgroundColor: "white" }}
        >
            <div className="flex items-center justify-between gap-4 px-4 pt-3">
                <div className="pt-5">
                    <span className="font-semibold">{booking.serviceType} {" "}</span>
                    <span>{getStatusBadgeVariant(booking.status)}</span>
                </div>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-28 px-2">
                        <ChevronsUpDown />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <div className="rounded-md px-4 py-2 font-mono text-sm">
                <span className="text-sm font-medium text-gray-500">{booking.created.toDateString()} </span>
            </div>
            <CollapsibleContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="border-y px-4 py-2 font-mono text-sm">
                        <p className='text-sm'><strong>Name:</strong> {booking?.user?.name}</p>
                        <p className='text-sm'><strong>Email:</strong> {booking?.user?.email}</p>
                    </div>
                    <div className="border-y px-4 py-2 font-mono text-sm">
                        <p className='text-sm'><strong>Phone:</strong> {booking.phone}</p>
                        <p className='text-sm'><strong>Address:</strong> {booking.address}</p>
                    </div>
                    <div className="flex md:gap-3">
                        <form action={formAction}>
                            <input type="hidden" name="bookingId" value={booking.id} />
                            <select name="bookingStatus" defaultValue={booking.status} id="booking-status" className="border md:px-3 rounded-md text-sm py-1 font-bold">
                                <option value="PENDING"> Pending</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                            <Button type="submit" size="sm" variant="secondary" className='md:ml-2' disabled={isPending}>
                                {isPending ? 'Updating...' : 'Update'}
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    <span className="font-bold">Distance:</span> {getDistanceBetween(booking.location)} km(s)
                    
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

export default BookingCollapsible