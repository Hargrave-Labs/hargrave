import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { useRequest } from './useRequests';
import StatusChip from './StatusChip';
import { REQUEST_TYPES } from './constants';
import type { RequestType } from './types';
import PortalLoading from './PortalLoading';
import { portalPath } from './routes';

const typeLabel = (v: RequestType) => REQUEST_TYPES.find((t) => t.value === v)?.label ?? v;
const isImage = (name: string) => /\.(png|jpe?g|gif|webp)$/i.test(name);

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-7">
      <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-500">{title}</h2>
      <div className="whitespace-pre-wrap leading-relaxed text-brand-100">{children}</div>
    </div>
  );
}

export default function RequestDetail() {
  const { id } = useParams();
  const { request, attachments, loading, error } = useRequest(id);
  const [urls, setUrls] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (!attachments.length) return;
    let active = true;
    (async () => {
      const entries = await Promise.all(
        attachments.map(async (a) => {
          const { data } = await supabase.storage
            .from('cr-attachments')
            .createSignedUrl(a.storage_path, 3600);
          return [a.id, data?.signedUrl] as const;
        })
      );
      if (active) setUrls(Object.fromEntries(entries));
    })();
    return () => {
      active = false;
    };
  }, [attachments]);

  if (loading) return <PortalLoading />;
  if (error || !request) {
    return (
      <div className="space-y-3">
        <p className="text-brand-300">Request not found.</p>
        <Link to={portalPath()} className="text-emerald-400 hover:text-emerald-300">← Back to requests</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link to={portalPath()} className="text-sm text-brand-400 hover:text-white">← Back to requests</Link>

      <div className="mb-8 mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-500">
            {typeLabel(request.request_type)}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">{request.title}</h1>
          <time className="text-sm text-brand-500">
            Submitted {new Date(request.created_at).toLocaleString()}
          </time>
        </div>
        <StatusChip status={request.status} />
      </div>

      <Section title="Description">{request.description}</Section>

      {request.page_url && (
        <Section title="Affected page">
          <a
            href={request.page_url}
            target="_blank"
            rel="noreferrer"
            className="break-all text-emerald-400 hover:text-emerald-300"
          >
            {request.page_url}
          </a>
        </Section>
      )}

      {request.acceptance_criteria && (
        <Section title="Done when">{request.acceptance_criteria}</Section>
      )}

      {attachments.length > 0 && (
        <div className="mb-7">
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-500">Attachments</h2>
          <div className="flex flex-wrap gap-3">
            {attachments.map((a) => (
              <a
                key={a.id}
                href={urls[a.id]}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
              >
                {isImage(a.file_name) && urls[a.id] ? (
                  <img src={urls[a.id]} alt={a.file_name} className="block max-h-40 max-w-[220px] object-cover" />
                ) : (
                  <span className="inline-block px-4 py-3 text-sm text-brand-200">📄 {a.file_name}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
