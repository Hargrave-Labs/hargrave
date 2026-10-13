import { cn } from '../../lib/utils';

// The HL monogram paths, shared with public/favicon.svg (same 150-unit grid).
export const HL_GLYPH_PATH =
  'M40 35.6h22.5v1.3c-3.9.3-6.3 1.7-6.3 5.6v63c0 3.5 2.4 5.1 6.3 5.4V112H40v-1.1c3.9-.3 6.3-1.9 6.3-5.4v-63c0-3.9-2.4-5.3-6.3-5.6zM80 35.6h22.5v1.3c-3.9.3-6.3 1.7-6.3 5.6V102c0 2.6 1.1 3.9 3.8 3.9h7.6c5.8 0 10.1-2.4 12.3-7.6l1 .1V112H80v-1.1c3.9-.3 6.3-1.9 6.3-5.4v-63c0-3.9-2.4-5.3-6.3-5.6zM56 71.7h30.5v3.2H56z';

/** The Hargrave Labs HL monogram on its own, in the current text colour. Decorative; size it by height with className. */
export function HLMark({ className }: { className?: string }) {
  return (
    <svg viewBox="40 35.5 81.6 76.6" fill="currentColor" className={cn('w-auto shrink-0', className)} aria-hidden focusable="false">
      <path d={HL_GLYPH_PATH} />
    </svg>
  );
}
