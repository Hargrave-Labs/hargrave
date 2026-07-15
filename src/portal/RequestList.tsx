import { Link, useNavigate } from 'react-router-dom';
import { useRequests } from './useRequests';
import StatusChip from './StatusChip';
import { REQUEST_TYPES, PRIMARY_BTN } from './constants';
import type { RequestType } from './types';
import { portalPath } from './routes';

const typeLabel = (v: RequestType) => REQUEST_TYPES.find((t) => t.value === v)?.label ?? v;

export default function RequestList() {
  const { requests, loading, error } = useRequests();
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-white">Change requests</h1>
          <p className="mt-1 text-sm text-brand-400">Submit and track work for your website.</p>
        </div>
        <button onClick={() => navigate(portalPath('/new'))} className={PRIMARY_BTN}>New request</button>
      </div>

      {loading && <p className="py-10 text-brand-400">Loading your requests…</p>}
      {error && <p className="py-10 text-rose-400">Couldn’t load requests: {error}</p>}

      {!loading && !error && requests.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] py-16 text-center">
          <p className="text-brand-300">No requests yet.</p>
          <button onClick={() => navigate(portalPath('/new'))} className={`${PRIMARY_BTN} mt-5`}>
            Create your first request
          </button>
        </div>
      )}

      {requests.length > 0 && (
        <ul className="space-y-3">
          {requests.map((r) => (
            <li key={r.id}>
              <Link
                to={portalPath(`/requests/${r.id}`)}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-white/[0.05]"
              >
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-500">
                    {typeLabel(r.request_type)}
                  </p>
                  <h3 className="truncate text-base font-medium text-white">{r.title}</h3>
                  <time className="text-xs text-brand-500">
                    {new Date(r.created_at).toLocaleDateString()}
                  </time>
                </div>
                <StatusChip status={r.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
