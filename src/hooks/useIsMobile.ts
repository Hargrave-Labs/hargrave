import { useState, useEffect } from 'react';

/**
 * Detects mobile viewport using matchMedia.
 * Default breakpoint matches Tailwind's `lg` (1024px).
 */
export function useIsMobile(breakpoint = 1024): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    onChange(mql);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}
