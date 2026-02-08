import { type ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
}

export const InfoCard = ({ title, children }: InfoCardProps) => {
  return (
    <section className="w-full px-60">
      <h2 className="text-3xl font-display font-semibold text-foreground mb-4">{title}</h2>
      <div className="bg-white rounded-2xl p-6 shadow-[0_0_0_2px_rgba(0,0,0,0.05)] flex flex-col justify-center ml-10">
        {children}
      </div>
    </section>
  );
};