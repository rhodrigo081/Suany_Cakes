import type { ReactNode } from "react";

interface HowWorksCardsProps {
    icon: ReactNode;
    iconBgColor: string;
    title: string;
    description: string;
}

export const HowWorksCard = ({ icon, iconBgColor, title, description }: HowWorksCardsProps) => {
    return (
        <div className="flex flex-col items-center border-2 border-border p-8 gap-4 bg-card-background rounded-4xl w-xl transition-all duration-300 hover:scale-101">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
                {icon}
            </div>
            <h3 className="text-3xl font-medium text-foreground text-center">
                {title}
            </h3>
            <p className="text-accent-foreground text-center leading-relaxed">
                {description}
            </p>
        </div>
    );
}