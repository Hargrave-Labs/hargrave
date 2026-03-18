import { cn } from '../../lib/utils';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-brand-400 font-medium tracking-wide">
        {label}
      </label>
      <input
        className={cn(
          'w-full bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-xl px-4 py-3 text-white text-sm',
          'placeholder:text-brand-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20',
          'transition-all duration-300',
          className
        )}
        {...props}
      />
    </div>
  );
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-brand-400 font-medium tracking-wide">
        {label}
      </label>
      <textarea
        className={cn(
          'w-full bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-xl px-4 py-3 text-white text-sm',
          'placeholder:text-brand-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20',
          'transition-all duration-300 resize-none',
          className
        )}
        rows={6}
        {...props}
      />
    </div>
  );
}
