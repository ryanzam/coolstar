import { ShieldUserIcon } from "lucide-react"
import { requireAuth } from "../api/auth"
import { redirect } from "next/navigation"

const ProfilePage = async () => {

    const { user } = await requireAuth()

    if (!user) {
        redirect("/signin")
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
                    <div className="max-w-2xl flex items-center">
                        <ShieldUserIcon size={100} color="#fff" />
                        <span className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground">Hi, {user.name}</span>
                    </div>
                </div>

            </section>

            {/* Form Section */}
            <section style={{ marginTop: "30px" }}>
                <div className="container mx-auto px-4">
                    <p className="text-xl animate-fade-up" style={{ animationDelay: "100ms" }}>
                        Email: {user.email} <br />
                        Role: {user.role}
                    </p>
                </div>
            </section>
        </main>
    )
}

export default ProfilePage