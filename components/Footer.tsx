import { MapPin, Phone, Mail, Facebook } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer id='contact' className="bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-36 h-36 rounded-xl flex items-center justify-center">
                                <img src='./coolstar.PNG' />
                            </div>
                        </Link>
                        <p className="text-secondary-foreground/80 text-sm leading-relaxed">
                            Your trusted partner for all HVAC needs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-lg mb-4 text-primary-foreground">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Services", path: "#services" },
                                { name: "Book Appointment", path: "/booking" },
                                { name: "Contact", path: "#contact" },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        href={link.path}
                                        className="text-secondary-foreground/70 hover:text-arctic transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-heading font-semibold text-lg mb-4 text-primary-foreground">
                            Our Services
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "AC Installation",
                                "Refrigerator/AC Repair",
                                "Industrial Cooling",
                                "Emergency Repairs",
                            ].map((service) => (
                                <li
                                    key={service}
                                    className="text-secondary-foreground/70 text-sm"
                                >
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-semibold text-lg mb-4 text-primary-foreground">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-arctic mt-0.5 flex-shrink-0" />
                                <span className="text-secondary-foreground/80 text-sm">
                                    Synergy chowk, Bharatpur-10, Chitwan
                                </span>
                            </li>
                            <li>
                                <a
                                    href="tel:+27114521168"
                                    className="flex items-center gap-3 text-secondary-foreground/80 hover:text-arctic transition-colors text-sm"
                                >
                                    <Phone className="w-5 h-5 text-arctic flex-shrink-0" />
                                    986-5400200
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:coolstarofficial@outlook.com"
                                    className="flex items-center gap-3 text-secondary-foreground/80 hover:text-arctic transition-colors text-sm"
                                >
                                    <Mail className="w-5 h-5 text-arctic flex-shrink-0" />
                                    coolstarofficial@outlook.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/coolstarofficial/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-secondary-foreground/80 hover:text-arctic transition-colors text-sm"
                                >
                                    <Facebook className="w-5 h-5 text-arctic flex-shrink-0" />
                                    Follow us on Facebook
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-secondary-foreground/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-secondary-foreground/60 text-sm">
                            © {new Date().getFullYear()} Coolstar. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a
                                href="#"
                                className="text-secondary-foreground/60 hover:text-arctic text-sm transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-secondary-foreground/60 hover:text-arctic text-sm transition-colors"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer