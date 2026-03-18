import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto max-w-[1600px] px-6 lg:px-8', className)}>
      {children}
    </Tag>
  );
}
