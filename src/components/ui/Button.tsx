import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size" | "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', withArrow = true, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-pill font-ui tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown disabled:pointer-events-none disabled:opacity-50 border-0 outline-none uppercase font-medium',
          {
            'bg-brand-brown text-white hover:bg-brand-brown-dark': variant === 'primary',
            'bg-accent-yellow text-brand-brown-dark hover:bg-yellow-500': variant === 'secondary',
            'border-2 border-brand-brown bg-transparent hover:bg-brand-brown hover:text-white text-brand-brown': variant === 'outline',
            'hover:bg-gray-100 text-brand-brown': variant === 'ghost',
            'h-10 px-6 text-xs': size === 'sm',
            'h-12 px-8 text-sm': size === 'md',
            'h-14 px-10 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {withArrow && <ArrowRight className={cn("ml-2", size === 'sm' ? "w-3 h-3" : size === 'lg' ? "w-5 h-5" : "w-4 h-4")} />}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
