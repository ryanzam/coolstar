import { ThermometerSnowflake, Wrench, Clock } from 'lucide-react';
import React from 'react'
import ServiceCard from './ServiceCard';


const services = [
    {
        icon: ThermometerSnowflake,
        title: "AC Installation",
        description:
            "Professional installation of air conditioning systems for homes and businesses with guaranteed quality workmanship.",
    },
    {
        icon: Wrench,
        title: "Repairs & Maintenance",
        description:
            "Expert repair services for refrigerators, freezers, and AC units. Quick response times and lasting solutions.",
    },
    {
        icon: Clock,
        title: "Emergency Service",
        description:
            "Round-the-clock emergency repairs when you need us most. We're always here to help.",
    },
];

const Services = () => {
    return (
        <section id="#services" className="py-24 frost-bg">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Our Services
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
                        Complete HVAC <span className="text-gradient">Solutions</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We provide comprehensive refrigeration and air conditioning services
                        tailored to your specific needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} {...service} delay={index * 100} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services