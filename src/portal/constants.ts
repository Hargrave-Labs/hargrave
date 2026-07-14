import type { RequestType, CrStatus } from './types';

export const REQUEST_TYPES: { value: RequestType; label: string }[] = [
  { value: 'bug', label: 'Bug fix' },
  { value: 'content', label: 'Content update' },
  { value: 'feature', label: 'New feature' },
  { value: 'design', label: 'Design tweak' },
];

// Keys MUST match the cr_status enum in the DB migration.
// className strings are full literals so Tailwind's scanner keeps them.
export const STATUS_META: Record<CrStatus, { label: string; className: string }> = {
  submitted:   { label: 'Submitted',   className: 'text-sky-300 bg-sky-500/10 border-sky-500/20' },
  in_backlog:  { label: 'In backlog',  className: 'text-violet-300 bg-violet-500/10 border-violet-500/20' },
  in_progress: { label: 'In progress', className: 'text-amber-300 bg-amber-500/10 border-amber-500/20' },
  in_review:   { label: 'In review',   className: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20' },
  completed:   { label: 'Completed',   className: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' },
  needs_info:  { label: 'Needs info',  className: 'text-orange-300 bg-orange-500/10 border-orange-500/20' },
  declined:    { label: 'Declined',    className: 'text-rose-300 bg-rose-500/10 border-rose-500/20' },
};

export const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_FILE_TYPES = [
  'image/png', 'image/jpeg', 'image/gif', 'image/webp', 'application/pdf',
];
export const ACCEPTED_FILE_LABEL = 'PNG, JPG, GIF, WEBP or PDF, up to 5MB each';

// Shared emerald pill for the portal's primary actions.
export const PRIMARY_BTN =
  'inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 ' +
  'text-sm font-medium text-brand-950 transition-colors duration-200 hover:bg-emerald-400 ' +
  'active:!scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed';
