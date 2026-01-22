"use client";

import { ChevronsUpDown, Mail, MapPinHouseIcon, Phone, User } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Booking } from "@prisma/client";
import { getStatusBadgeVariant } from "./BookingCard";
import { updateBookingStatus } from "@/app/api/booking";
import { toast } from "sonner";
import { getDistance } from 'geolib';
import GotoMapButton from "./GotoMapButton";
import Link from "next/link";

interface BookingCardProps {
    booking: Booking & { user?: { name: string | null; email: string } },
}

const getDistanceBetween = (location: any) => {

    if (location === null) return "N/A";

    const locationObj = JSON.parse(location);

    const distance = getDistance(
        { latitude: locationObj.lat, longitude: locationObj.lng },
        { latitude: 27.6881814, longitude: 84.432728 }
    );

    return (distance / 1000).toFixed(2);
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
    }, [isPending]);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col border rounded-md shadow-md py-2"
            style={{ backgroundColor: "white" }}
        >
            <div className="flex items-center justify-between gap-4 px-4">
                <div className="">
                    <span className="font-semibold">{booking.serviceType} {" "}</span>
                    <span>{getStatusBadgeVariant(booking.status)}</span>
                </div>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="px-10 cursor-pointer">
                        <ChevronsUpDown />
                        <span>Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <div className="rounded-md px-4">
                <span className="text-gray-500">{booking.created.toDateString()} </span>
            </div>
            <CollapsibleContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between mt-2 border-y">
                    <div className="py-2 px-2">
                        <p className='flex items-center gap-2 text-gray-800'><User size={16} />{booking?.user?.name}</p>
                        <p className='flex items-center gap-2 text-gray-800'><Mail size={16} />{booking?.user?.email}</p>
                    </div>
                    <div className="py-2 px-2">
                        <p className='flex items-center gap-2 text-gray-800'><Phone size={16} /><Link href={`tel:${booking.phone}`}>{booking.phone}</Link></p>
                        <p className='flex items-center gap-2 text-gray-800'><MapPinHouseIcon size={16} /> {booking.address}</p>
                    </div>
                </div>
                <div className="px-2 py-2 flex items-center justify-between">
                    <div>
                        <span className="">Distance:</span> {getDistanceBetween(booking.location)} km(s)
                        <GotoMapButton key={booking.id} location={booking.location} />
                    </div>

                    <div className="flex md:gap-3">
                        <form action={formAction}>
                            <input type="hidden" name="bookingId" value={booking.id} />
                            <select name="bookingStatus" defaultValue={booking.status} id="booking-status" className="border md:px-3 rounded-md  py-1 ">
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
            </CollapsibleContent>
        </Collapsible>
    )
}

export default BookingCollapsible