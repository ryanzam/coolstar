import { ArrowRight, Snowflake, Star } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden pb-8 mt-20 pt-2">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-96 h-96 bg-arctic/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Snowflake Pattern */}
            <div className="absolute inset-0 opacity-5">
                {[...Array(6)].map((_, i) => (
                    <Snowflake
                        key={i}
                        className="absolute text-primary-foreground animate-float"
                        style={{
                            width: `${40 + i * 20}px`,
                            height: `${40 + i * 20}px`,
                            top: `${10 + i * 15}%`,
                            left: `${5 + i * 18}%`,
                            animationDelay: `${i * 0.5}s`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm mb-8 animate-fade-up">
                        <Snowflake className="w-4 h-4" />
                        <span>Trusted by 1000+ customers across Chitwan</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
                        Expert Cooling
                        <br />
                        <span className="text-arctic">Solutions</span> for
                        <br />
                        Every Need
                    </h1>

                    <p className="text-xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
                        From residential AC repairs to industrial refrigeration systems,
                        Coolstar delivers reliable, professional HVAC solutions you can
                        trust.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
                        <Button asChild variant="default" size="lg">
                            <Link href="/booking" className="gap-3">
                                Book Appointment
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex items-center gap-8 mt-12 pt-8 border-t border-primary-foreground/20 animate-fade-up" style={{ animationDelay: "400ms" }}>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>
                            <span className="text-primary-foreground/80 text-sm">
                                4.9/5 Rating
                            </span>
                        </div>
                        <div className="text-primary-foreground/80 text-sm">
                            <span className="text-primary-foreground font-semibold">15+</span> Years
                            Experience
                        </div>
                        <div className="text-primary-foreground/80 text-sm hidden sm:block">
                            <span className="text-primary-foreground font-semibold">Maintenance &</span> Support
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero