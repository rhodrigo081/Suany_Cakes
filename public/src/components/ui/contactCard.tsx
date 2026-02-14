import { type ReactNode } from 'react';

interface ContactCardProps {
  icon: ReactNode;
  iconBgColor: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const ContactCard = ({ icon, iconBgColor, title, children, className = "" }: ContactCardProps) => {

  return (
    <div className={`bg-background border border-border w-lg rounded-2xl p-6 flex items-start gap-4 ${className}`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-display font-semibold text-foreground">{title}</h3>
        <div className="mt-1 text-accent-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};

