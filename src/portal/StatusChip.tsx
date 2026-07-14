import { STATUS_META } from './constants';
import type { CrStatus } from './types';
import { cn } from '../lib/utils';

export default function StatusChip({ status }: { status: CrStatus }) {
  const meta = STATUS_META[status] ?? {
    label: status,
    className: 'text-brand-300 bg-white/5 border-white/10',
  };
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium',
        meta.className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
