import { Building2, Factory, Home } from 'lucide-react';
import React from 'react'

const sectors = [
    {
        icon: Home,
        title: "Residential",
        description: "Home cooling solutions",
    },
    {
        icon: Building2,
        title: "Commercial",
        description: "Business HVAC systems",
    },
    {
        icon: Factory,
        title: "Industrial",
        description: "Large-scale refrigeration",
    },
];

const Sectors = () => {
    return (
        <section className="py-8 bg-linear-to-b from-navy to-secondary">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sectors.map((sector, index) => (
                        <div
                            key={sector.title}
                            className="flex items-center gap-4 p-6 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-lg bg-arctic/20 flex items-center justify-center">
                                <sector.icon className="w-6 h-6 text-arctic" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary-foreground">
                                    {sector.title}
                                </h3>
                                <p className="text-sm text-primary-foreground/60">
                                    {sector.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Sectors