import SigninForm from './SigninForm'

const SigninPage = () => {
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
                            Sign into your Account
                        </h1>
                        <p className="text-xl text-primary-foreground/80 animate-fade-up" style={{ animationDelay: "100ms" }}>
                            Sign in and book service you want.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-100">
                    <SigninForm />
                </div>
            </section>
        </main>
    )
}

export default SigninPage