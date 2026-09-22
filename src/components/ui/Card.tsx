import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div 
      className={cn(
        'bg-background-card rounded-lg border-0 shadow-card overflow-hidden',
        hover && 'app-transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
        className
      )}
    >
      {children}
    </div>
  );
}
