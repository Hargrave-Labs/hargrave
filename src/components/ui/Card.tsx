import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'glass-card p-8 transition-all duration-300',
        hover && 'hover:border-white/20 hover:bg-white/[0.08]',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
