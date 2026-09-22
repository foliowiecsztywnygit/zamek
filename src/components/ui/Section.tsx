import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { RotatingRozeta } from './Icons';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'card';
  ornament?: boolean;
}

export function Section({ children, className, id, background = 'default', ornament = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-32 relative overflow-hidden',
        {
          'bg-background': background === 'default',
          'bg-background-card': background === 'card',
          'bg-ornament': ornament,
        },
        className
      )}
    >
      <RotatingRozeta className="w-[420px] h-[420px] md:w-[640px] md:h-[640px] -left-[210px] md:-left-[320px] top-1/2 -translate-y-1/2" />
      <RotatingRozeta className="w-[360px] h-[360px] md:w-[560px] md:h-[560px] -right-[180px] md:-right-[280px] top-1/3" />
      <div className="container relative z-10">
        {children}
      </div>
    </section>
  );
}
