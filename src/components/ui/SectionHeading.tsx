import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../../hooks/useGSAP';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.anim-heading');
    gsap.from(els, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
      },
    });
  }, [], ref);

  return (
    <div
      ref={ref}
      className={cn(
        'mb-16 lg:mb-20',
        align === 'center' && 'text-center',
        className
      )}
    >
      {label && (
        <p className="anim-heading label-style mb-4">
          {label}
        </p>
      )}
      <h2 className="anim-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-balance tracking-[-0.05em] leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="anim-heading mt-5 text-brand-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
          {description}
        </p>
      )}
    </div>
  );
}
