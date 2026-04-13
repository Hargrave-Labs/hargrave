import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card p-8 transition-[transform,border-color,background-color] duration-200 ease-[var(--ease-out)]',
        hover && 'hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]',
        className
      )}
    >
      {children}
    </div>
  );
}
