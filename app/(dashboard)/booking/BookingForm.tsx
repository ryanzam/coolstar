"use client"

import { requireAuth } from '@/app/api/auth'
import { bookService } from '@/app/api/booking'
import MapPicker from '@/components/map/MapPicker'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { SendHorizonal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
interface BookingFormProps {
    user: any
}

const serviceTypes = [
    { value: "AC Installation", label: "AC Installation" },
    { value: "Repair Service", label: "Repair Service" },
    { value: "Inspection", label: "Inspection" },
    { value: "Consultation", label: "Consultation" },
];

const BookingForm = ({ user }: BookingFormProps) => {

    const router = useRouter()
    const [state, formAction, isPending] = useActionState(bookService, null);
    const [location, setLocation] = useState({ lat: 0, lng: 0, address: '' });

    useEffect(() => {
        if (state?.success) {
            toast.success("Service has been booked now.!");
            router.push("/dashboard")
        }
    }, [state?.success])


    const handleLocationSelect = async (lat: number, lng: number, address: string) => {
        try {
            setLocation({ lat, lng, address });
            //toast.success("Location selected.");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">

                {state && state.error && (
                    <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        {state.error}
                    </div>
                )}

                <form action={formAction}>
                    <input type="hidden" name="userId" value={user?.user?.id} />
                    <input type="hidden" name="location" value={JSON.stringify(location)} />
                    <Card>
                        <CardContent className="space-y-4">
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type='tel'
                                        placeholder="9801234567"
                                        required
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor="serviceType">Service Type *</Label>
                                    <select name="serviceType" id="" className='border p-2 ml-2'>
                                        {serviceTypes.map((st, idx) => (
                                            <option key={idx} value={st.value}>{st.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    minLength={10}
                                    placeholder="Describe what you want. Installation, Service, Repairs.."
                                    rows={6}
                                    required
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="name">Address *</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    type='text'
                                    placeholder="Synergy chowk"
                                    required
                                />
                            </div>

                            <div className='flex flex-col gap-3 pt-2'>
                                <p className=''>Pinpoint address and click <strong>Confirm Location</strong> </p>
                                <p>{location.address !== "" && <mark>{location.address}</mark>}</p>
                                <MapPicker onLocationSelect={handleLocationSelect} />
                            </div>

                            <Button type='submit' className='w-full cursor-pointer' size={'lg'} disabled={isPending}>Book a Service <SendHorizonal /></Button>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </section>
    )
}

export default BookingForm