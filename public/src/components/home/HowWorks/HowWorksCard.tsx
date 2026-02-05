import type { ReactNode } from "react";

interface HowWorksCardsProps {
    icon: ReactNode;
    iconColor: string;
    backgroundIcon: string;
    title: string;
    description: string;
}

export const HowWorksCard = ({ icon, iconColor, backgroundIcon, title, description }: HowWorksCardsProps) => {
    return (
        <div className="flex flex-col items-center p-8 gap-4 bg-card-background rounded-4xl w-xl shadow-[0_0_0_2px_rgba(0,0,0,0.05)] 
        hover:scale-105 transition-all duration-300 hover:shadow-[0_0_0_2px_rgba(0,0,0,0.15)]">
            <div
                className="w-16 h-16 rounded-full flex justify-center items-center"
                style={{ backgroundColor: backgroundIcon, color: iconColor }}
            >
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