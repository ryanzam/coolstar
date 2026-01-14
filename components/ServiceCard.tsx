import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
    delay?: number;
}

const ServiceCard = ({
    icon: Icon,
    title,
    description,
    className,
    delay = 0,
}: ServiceCardProps) => {
    return (
        <div
            className={cn(
                "group relative p-8 rounded-2xl bg-card card-gradient border border-border/50 shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-1",
                className
            )}
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
                <div className="w-14 h-14 rounded-xl cta-gradient flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default ServiceCard