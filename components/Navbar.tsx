"use client"

import { cn } from "@/lib/utils";
import { Phone, X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";
import { logoutUser, requireAuth } from "@/app/api/auth";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "#services" },
    { name: "Contact", path: "#contact" },
];

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    const location = usePathname();
    const router = useRouter();

    useEffect(() => {
        requireAuth().then((session) => {
            setUser(session?.user);
        }).catch(() => {
            setUser(null);
        });
    }, [])

    const onLogout = async () => {
        await logoutUser();
        setUser(null);
        router.push("/");
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img src="./coolstar.PNG" />
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                                    location === link.path
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ?
                            <>
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger>
                                                {user.name}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="w-100">
                                                <NavigationMenuLink className="cursor-pointer">Profile</NavigationMenuLink>
                                                <NavigationMenuLink href="/dashboard" className="cursor-pointer">Dashboard</NavigationMenuLink>
                                                {user.role === "CUSTOMER" && <NavigationMenuLink href="/booking" className="cursor-pointer">Booking</NavigationMenuLink>}
                                                <NavigationMenuLink onClick={onLogout} className="cursor-pointer">Logout</NavigationMenuLink>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </> :
                            <>
                                <a
                                    href="tel:986-5400200"
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>986-5400200</span>
                                </a>
                                <Button asChild variant="default" size="sm">
                                    <Link href="/signin">Sign In</Link>
                                </Button>
                            </>
                        }
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div >

            {/* Mobile Navigation */}
            {user ? (
                < div
                    className={
                        cn(
                            "lg:hidden overflow-hidden transition-all duration-300",
                            isOpen ? "max-h-96 border-t border-border" : "max-h-0"
                        )
                    }
                >
                    <div className="flex flex-col gap-3 text-center" style={{ padding: "10px" }}>
                        <h3>Welcome, {user.name}</h3>
                        <Link href="/profile" className="hover:bg-accent cursor-pointer py-2">Profile</Link>
                        <Link href="/dashboard" className="hover:bg-accent cursor-pointer py-2">Dashboard</Link>
                        {user?.role === "CUSTOMER" && <Link href="/booking" className="hover:bg-accent cursor-pointer py-2">Book a Service</Link>}
                        <Button onClick={onLogout} className="cursor-pointer">Logout</Button>
                    </div>
                </div>
            ) : (
                < div
                    className={
                        cn(
                            "lg:hidden overflow-hidden transition-all duration-300",
                            isOpen ? "max-h-96 border-t border-border" : "max-h-0"
                        )
                    }
                >
                    <div className="container mx-auto px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                                    location === link.path
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-border">
                            <Button asChild variant="default" className="w-full">
                                <Link href="/signin" onClick={() => setIsOpen(false)}>
                                    Sign in now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div >
            )
            }
        </nav >
    )
}

export default Navbar