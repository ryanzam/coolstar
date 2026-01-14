import { ChevronRight, Clock, Wrench } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const QuickAction = () => {
    return (
        <section className="py-24 bg-glacier">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Complaint Card */}
                    <Link
                        href="/booking"
                        className="group relative p-10 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-destructive/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

                        <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-6">
                                <Wrench className="w-7 h-7 text-destructive" />
                            </div>

                            <h3 className="text-2xl font-heading font-semibold text-foreground mb-3">
                                Submit a Complaint
                            </h3>

                            <p className="text-muted-foreground mb-6">
                                Having issues with a product or service? Let us know and we'll
                                resolve it quickly.
                            </p>

                            <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300">
                                Submit Now
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>

                    {/* Booking Card */}
                    <Link
                        href="/booking"
                        className="group relative p-10 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

                        <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                <Clock className="w-7 h-7 text-primary" />
                            </div>

                            <h3 className="text-2xl font-heading font-semibold text-foreground mb-3">
                                Book an Appointment
                            </h3>

                            <p className="text-muted-foreground mb-6">
                                Schedule a service appointment for installation, repair, or
                                maintenance at your convenience.
                            </p>

                            <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300">
                                Book Now
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default QuickAction