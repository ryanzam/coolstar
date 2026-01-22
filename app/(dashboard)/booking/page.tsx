import { requireAuth } from '@/app/api/auth'
import BookingForm from './BookingForm'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboardIcon } from 'lucide-react'

const BookingsPage = async () => {

    let user: any;
    try {
        user = await requireAuth()
    } catch (error) {
        redirect("/signin")
    }

    if (user?.role === "ADMIN") {
        return (
            <main className="pt-20 min-h-screen frost-bg">
                {/* Header */}
                <section className="py-16 hero-gradient relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-10 right-20 w-48 h-48 bg-arctic/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-10 left-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4 animate-fade-up">
                                Hello {user.name}
                            </h1>
                            <p className="text-xl text-primary-foreground/80 animate-fade-up" style={{ animationDelay: "100ms" }}>
                                You are an admin.
                            </p>
                        </div>
                    </div>
                </section>

                <Link href={"/dashboard"} className='flex justify-center py-16 hover:text-primary'><LayoutDashboardIcon /> Go to Dashboard</Link>
            </main>
        )
    }

    return (
        <main className="pt-20 min-h-screen frost-bg">
            {/* Header */}
            <section className="py-16 hero-gradient relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-20 w-48 h-48 bg-arctic/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4 animate-fade-up">
                            Book a Service
                        </h1>
                        <p className="text-xl text-primary-foreground/80 animate-fade-up" style={{ animationDelay: "100ms" }}>
                            Schedule a service with our expert technicians for installations, repairs, and maintenance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section >
                <div className="container mx-auto px-4">
                    <BookingForm user={user} />
                </div>
            </section>
        </main>
    )
}

export default BookingsPage