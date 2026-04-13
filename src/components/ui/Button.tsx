import { cn, scrollToSection } from '../../lib/utils';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
  className?: string;
}

const variants = {
  primary:
    'bg-white text-zinc-900 hover:bg-zinc-100 border border-transparent',
  secondary:
    'bg-white/5 backdrop-blur-[12px] text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
  ghost:
    'bg-transparent text-white border border-transparent hover:bg-white/5',
};

const sizes = {
  sm: 'pl-4 pr-2 py-1.5 text-sm gap-2',
  md: 'pl-6 pr-2 py-2 text-sm gap-3',
  lg: 'pl-6 pr-2 py-2 text-base gap-3',
};

function ArrowIcon({ variant: v }: { variant: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full shrink-0 transition-[background-color] duration-200 ease-[var(--ease-out)]',
        v === 'primary'
          ? 'w-10 h-10 bg-zinc-900 group-hover:bg-zinc-700'
          : 'w-10 h-10 bg-white/10 group-hover:bg-white/20',
      )}
    >
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </span>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    'group inline-flex items-center justify-center font-medium rounded-full tracking-wide',
    'transition-[transform,background-color,border-color] duration-150 ease-[var(--ease-out)]',
    'active:!scale-[0.97]',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (href.startsWith('#')) {
            e.preventDefault();
            scrollToSection(href);
          }
        }}
        className={classes}
      >
        <span>{children}</span>
        <ArrowIcon variant={variant} />
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    >
      <span>{children}</span>
      <ArrowIcon variant={variant} />
    </button>
  );
}
