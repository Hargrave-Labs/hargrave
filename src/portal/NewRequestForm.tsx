import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { useAuth } from './AuthProvider';
import { Input, Textarea } from '../components/ui/Input';
import { cn } from '../lib/utils';
import {
  REQUEST_TYPES,
  MAX_FILE_BYTES,
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_LABEL,
  PRIMARY_BTN,
} from './constants';
import type { RequestType } from './types';
import { portalPath } from './routes';

const labelCls = 'block text-sm text-brand-400 font-medium tracking-wide';
const controlCls =
  'w-full bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-xl px-4 py-3 text-white text-sm ' +
  'placeholder:text-brand-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 ' +
  'transition-[border-color,box-shadow] duration-200';

export default function NewRequestForm() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requestType, setRequestType] = useState<RequestType>('bug');
  const [pageUrl, setPageUrl] = useState('');
  const [acceptance, setAcceptance] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    for (const f of picked) {
      if (!ACCEPTED_FILE_TYPES.includes(f.type)) {
        setFileError(`"${f.name}" is not an accepted type. Allowed: ${ACCEPTED_FILE_LABEL}.`);
        e.target.value = '';
        setFiles([]);
        return;
      }
      if (f.size > MAX_FILE_BYTES) {
        setFileError(`"${f.name}" is larger than 5MB.`);
        e.target.value = '';
        setFiles([]);
        return;
      }
    }
    setFileError('');
    setFiles(picked);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return;
    setSubmitting(true);
    setSubmitError('');

    const { data: cr, error: crErr } = await supabase
      .from('change_requests')
      .insert({
        user_id: session.user.id,
        title: title.trim(),
        description: description.trim(),
        request_type: requestType,
        page_url: pageUrl.trim() || null,
        acceptance_criteria: acceptance.trim() || null,
      })
      .select('id')
      .single();

    if (crErr || !cr) {
      setSubmitError(crErr?.message ?? 'Could not save your request.');
      setSubmitting(false);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Supabase Storage keys reject spaces and most punctuation ("Invalid key"),
      // so sanitize the key while keeping the original name for display.
      const safeName =
        file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^_+|_+$/g, '') || 'file';
      const path = `${session.user.id}/${cr.id}/${i}-${safeName}`;
      const { error: upErr } = await supabase.storage
        .from('cr-attachments')
        .upload(path, file, { upsert: false });
      if (upErr) {
        setSubmitError(`Request saved, but "${file.name}" failed to upload: ${upErr.message}`);
        setSubmitting(false);
        return;
      }
      await supabase.from('cr_attachments').insert({
        cr_id: cr.id,
        storage_path: path,
        file_name: file.name,
      });
    }

    navigate(portalPath(), { replace: true });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link to={portalPath()} className="text-sm text-brand-400 hover:text-white">← Back</Link>
      <h1 className="mb-8 mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">New change request</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
      >
        <Input
          label="Title"
          required
          maxLength={140}
          placeholder="Short summary of the change"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space-y-2">
          <label htmlFor="request_type" className={labelCls}>Request type</label>
          <select
            id="request_type"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value as RequestType)}
            className={cn(controlCls, 'cursor-pointer appearance-none')}
          >
            {REQUEST_TYPES.map((t) => (
              <option key={t.value} value={t.value} className="bg-brand-900 text-white">
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <Textarea
          label="Description"
          required
          placeholder="What needs to change, and why?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          label="Affected page URL (optional)"
          type="url"
          placeholder="https://yoursite.com/about"
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
        />

        <Textarea
          label="Done when… (optional)"
          rows={3}
          placeholder="How we'll know this request is complete"
          value={acceptance}
          onChange={(e) => setAcceptance(e.target.value)}
        />

        <div className="space-y-2">
          <label htmlFor="files" className={labelCls}>
            Attachments <span className="font-normal text-brand-500">({ACCEPTED_FILE_LABEL})</span>
          </label>
          <input
            id="files"
            type="file"
            multiple
            accept={ACCEPTED_FILE_TYPES.join(',')}
            onChange={onFiles}
            className={cn(
              controlCls,
              'file:mr-3 file:rounded-full file:border-0 file:bg-emerald-500 file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-brand-950'
            )}
          />
          {files.length > 0 && (
            <ul className="mt-1 text-sm text-brand-300">
              {files.map((f) => (
                <li key={f.name}>
                  {f.name} <span className="text-brand-500">({Math.round(f.size / 1024)} KB)</span>
                </li>
              ))}
            </ul>
          )}
          {fileError && <p className="text-sm text-rose-400">{fileError}</p>}
        </div>

        {submitError && <p className="text-sm text-rose-400">{submitError}</p>}

        <button
          type="submit"
          disabled={submitting || !title || !description || !!fileError}
          className={cn(PRIMARY_BTN, 'w-full')}
        >
          {submitting ? 'Submitting…' : 'Submit request'}
        </button>
      </form>
    </div>
  );
}
