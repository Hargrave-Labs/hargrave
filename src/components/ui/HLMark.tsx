import { useId } from 'react';
import { cn } from '../../lib/utils';

// The HL monogram paths, shared with public/favicon.svg (same 150-unit grid).
export const HL_GLYPH_PATH =
  'M40 35.6h22.5v1.3c-3.9.3-6.3 1.7-6.3 5.6v63c0 3.5 2.4 5.1 6.3 5.4V112H40v-1.1c3.9-.3 6.3-1.9 6.3-5.4v-63c0-3.9-2.4-5.3-6.3-5.6zM80 35.6h22.5v1.3c-3.9.3-6.3 1.7-6.3 5.6V106c0 2.6 1.1 3.6 3.8 3.6h7.6c5.8 0 10.1-3.4 12.3-9.6l1 .1V112H80v-1.1c3.9-.3 6.3-1.9 6.3-5.4v-63c0-3.9-2.4-5.3-6.3-5.6zM56 71.7h30.5v3.2H56z';

/** The Hargrave Labs icon: white HL on the dark green glow tile. Decorative; size it with className. */
export function HLMark({ className }: { className?: string }) {
  // Unique gradient id so several marks on one page don't clash.
  const bg = `hl-bg-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 150 150" className={cn('shrink-0', className)} aria-hidden focusable="false">
      <defs>
        <radialGradient id={bg} cx="75" cy="84" r="110" gradientUnits="userSpaceOnUse" gradientTransform="translate(75 84) scale(.82 1) translate(-75 -84)">
          <stop offset="0" stopColor="#07493f" />
          <stop offset=".35" stopColor="#083631" />
          <stop offset=".7" stopColor="#081a1b" />
          <stop offset="1" stopColor="#0a0d0f" />
        </radialGradient>
      </defs>
      <rect width="150" height="150" rx="30" fill={`url(#${bg})`} />
      <path d={HL_GLYPH_PATH} fill="#f4f6f5" />
    </svg>
  );
}
