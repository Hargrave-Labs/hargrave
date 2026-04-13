import { useLayoutEffect, useRef, type DependencyList, type RefObject } from 'react';
import gsap from 'gsap';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useGSAP(
  callback: (ctx: gsap.Context) => void,
  deps: DependencyList = [],
  scope?: RefObject<HTMLElement | null>
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      // Skip animations but ensure elements are visible
      if (scope?.current) {
        const hidden = scope.current.querySelectorAll('[style*="opacity: 0"]');
        hidden.forEach((el) => ((el as HTMLElement).style.opacity = '1'));
      }
      return;
    }

    const ctx = gsap.context((self) => {
      callback(self);
    }, scope?.current || undefined);
    ctxRef.current = ctx;

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctxRef;
}
