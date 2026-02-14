import { type ReactNode } from 'react';

interface InfoCardProps {
  children: ReactNode;
}

export const InfoCard = ({ children }: InfoCardProps) => {
  return (
    <section className="w-full">
      <div className="bg-background border border-border rounded-2xl p-6 flex flex-col justify-center ml-10">
        {children}
      </div>
    </section>
  );
};