import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from './lib/supabaseClient';
import { Input } from '../components/ui/Input';
import { siteConfig } from '../config/site';
import { PRIMARY_BTN } from './constants';
import { cn } from '../lib/utils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/portal/auth/callback`,
      },
    });

    // Never reveal whether the email is registered. Only surface transport errors.
    if (error && typeof error.status === 'number' && error.status >= 500) {
      setStatus('error');
      setErrorMsg('Something went wrong sending your link. Please try again.');
      return;
    }
    setStatus('sent');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#050706] px-6 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10">
        <p className="label-style mb-3">Client Portal</p>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-white">{siteConfig.name}</h1>

        {status === 'sent' ? (
          <div className="mt-8 space-y-3">
            <p className="text-brand-200">
              If <strong className="text-white">{email}</strong> is a registered client, a secure sign-in link is on its way.
            </p>
            <p className="text-sm text-brand-400">Check your inbox and spam folder.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Work email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'sending'}
            />
            {status === 'error' && <p className="text-sm text-rose-400">{errorMsg}</p>}
            <button
              type="submit"
              disabled={status === 'sending' || !email}
              className={cn(PRIMARY_BTN, 'w-full')}
            >
              {status === 'sending' ? 'Sending…' : 'Send me a sign-in link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
