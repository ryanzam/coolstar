"use client";

import Script from "next/script";

export default function GoogleReviewsWidget() {
    return (
        <section id="testimonials" className="py-20 container mx-auto px-4">
            <div className="text-center ">
                <span className="inline-block text-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    Testimonials
                </span>
            </div>
            <Script
                src="https://elfsightcdn.com/platform.js"
                strategy="lazyOnload"
            />

            <div className="overflow-hidden">
                <div className="-mb-11 px-5">
                    <div
                        className="elfsight-app-0fd02d57-d4a8-46e4-a5a1-7971d618438c"
                        data-elfsight-app-lazy
                    ></div>
                </div>
            </div>
        </section>
    );
}
