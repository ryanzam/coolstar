"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface CarouselImgSlide {
    src: string;
    alt: string;
}

interface CarouselProps {
    slides: CarouselImgSlide[];
    autoSlideInterval?: number;
}

const Carousel = ({ slides, autoSlideInterval = 3000 }: CarouselProps) => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    useEffect(() => {
        if (isPaused || slides.length <= 1) return;

        const timer = setInterval(nextSlide, autoSlideInterval);
        return () => clearInterval(timer);
    }, [nextSlide, autoSlideInterval, isPaused, slides.length]);

    return (
        <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg">
            <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className="relative w-full md:h-100 h-80 shrink-0"
                    >
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            className="object-cover w-full h-full"
                            priority={idx === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Previous Button */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 transition"
            >
                &#10094;
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 transition"
            >
                &#10095;
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2.5 rounded-full transition-all ${
                            current === idx
                                ? "w-6 bg-white"
                                : "w-2.5 bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
