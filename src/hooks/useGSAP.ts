import { useLayoutEffect, useRef, type DependencyList, type RefObject } from 'react';
import gsap from 'gsap';

export function useGSAP(
  callback: (ctx: gsap.Context) => void,
  deps: DependencyList = [],
  scope?: RefObject<HTMLElement | null>
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
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
