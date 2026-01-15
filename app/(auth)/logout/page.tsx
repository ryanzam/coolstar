"use client"

import { logoutUser } from '@/app/api/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

const LogoutPage = () => {

    const router = useRouter();

    const onCancel = () => {

    }

    const onLogout = async () => {
        await logoutUser();
        router.push("/");
    }

    return (
        <main className="pt-20 min-h-screen frost-bg">
            <section className="py-16 hero-gradient relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-20 w-48 h-48 bg-arctic/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4 animate-fade-up">
                            Confirm Logout?
                        </h1>
                    </div>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <Card>
                        <CardContent className="space-y-4">
                            <p>Are you sure you want to logout?</p>
                            <div>
                                <Button onClick={onCancel} variant="outline" size="lg" className="cursor-pointer">Cancel</Button>
                                <Button onClick={onLogout} variant="destructive" size="lg" className="ml-4 cursor-pointer" >Logout</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    )
}

export default LogoutPage