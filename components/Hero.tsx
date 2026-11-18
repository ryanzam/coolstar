import { ArrowRight, Snowflake, Star } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Carousel, { CarouselImgSlide } from "./Carousel";

const images: CarouselImgSlide[] = [
    { src: "/images/cs.jpg", alt: "Hero Image 1" },
    { src: "/images/cs1.jpg", alt: "Hero Image 2" },
    { src: "/images/cs2.jpg", alt: "Hero Image 3" },
    { src: "/images/cs3.jpg", alt: "Hero Image 4" },
    { src: "/images/cs4.jpg", alt: "Hero Image 5" },
    { src: "/images/cs5.jpg", alt: "Hero Image 6" },
];

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden pb-8 mt-20 pt-2">
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

            <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 grid-cols-1 gap-8 items-center">
                <div className="max-w-3xl">
                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 animate-fade-up"
                        style={{ animationDelay: "100ms" }}
                    >
                        Expert Cooling
                        <br />
                        <span className="text-arctic">Solutions</span> for
                        <br />
                        Every Need
                    </h1>

                    <p
                        className="text-xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed animate-fade-up"
                        style={{ animationDelay: "200ms" }}
                    >
                        From residential AC repairs to industrial refrigeration
                        systems, Coolstar delivers reliable, professional HVAC
                        solutions you can trust.
                    </p>

                    <div
                        className="flex flex-col sm:flex-row gap-4 animate-fade-up"
                        style={{ animationDelay: "300ms" }}
                    >
                        <Button asChild variant="default" size="lg">
                            <Link href="/booking" className="gap-3">
                                Book a Service
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div
                        className="flex items-center gap-8 mt-12 pt-8 border-t border-primary-foreground/20 animate-fade-up"
                        style={{ animationDelay: "400ms" }}
                    >
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
                            <span className="text-primary-foreground font-semibold">
                                15+
                            </span>{" "}
                            Years Experience
                        </div>
                        <div className="text-primary-foreground/80 text-sm hidden sm:block">
                            <span className="text-primary-foreground font-semibold">
                                Maintenance &
                            </span>{" "}
                            Support
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Carousel slides={images} />
                </div>
            </div>
        </section>
    );
};

export default Hero;
