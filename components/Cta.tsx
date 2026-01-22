import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

const Cta = () => {
    return (
        <section className="py-24 hero-gradient relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-64 h-64 bg-arctic/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">
                        Need Immediate Assistance?
                    </h2>
                    <p className="text-xl text-primary-foreground/80 mb-10">
                        Whether it's an emergency repair or a scheduled maintenance, we're
                        here to help. Get in touch with our team today. Book your needs and we will follow back.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild variant="default" size="lg">
                            <Link href="/booking" className="gap-3">
                                Book a Service
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="default" size="lg">
                            <a href="tel:+9779865400200" className="gap-3">
                                Call 9865400200
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cta