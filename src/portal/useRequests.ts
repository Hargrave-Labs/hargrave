import { useCallback, useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { useAuth } from './AuthProvider';
import type { Profile, ChangeRequest, ChangeRequestListItem, Attachment } from './types';

export function useProfile(): Profile | null {
  const { session } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!session) return;
    let active = true;
    supabase
      .from('profiles')
      .select('company_name, website_url')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => {
        if (active) setProfile(data as Profile | null);
      });
    return () => {
      active = false;
    };
  }, [session]);

  return profile;
}

const selectRequestList = () =>
  supabase
    .from('change_requests')
    .select('id, title, request_type, status, created_at')
    .order('created_at', { ascending: false });

export function useRequests() {
  const [requests, setRequests] = useState<ChangeRequestListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // reload() is invoked from event handlers, so setting loading here is fine.
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: qErr } = await selectRequestList();
    if (qErr) setError(qErr.message);
    else setRequests((data ?? []) as ChangeRequestListItem[]);
    setLoading(false);
  }, []);

  // Initial fetch: async IIFE so no setState happens synchronously in the effect.
  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error: qErr } = await selectRequestList();
      if (!active) return;
      if (qErr) setError(qErr.message);
      else setRequests((data ?? []) as ChangeRequestListItem[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  return { requests, loading, error, reload: load };
}

export function useRequest(id: string | undefined) {
  const [request, setRequest] = useState<ChangeRequest | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      const { data: cr, error: crErr } = await supabase
        .from('change_requests')
        .select('*')
        .eq('id', id)
        .single();
      if (!active) return;
      if (crErr) {
        setError(crErr.message);
        setLoading(false);
        return;
      }
      setRequest(cr as ChangeRequest);

      const { data: atts } = await supabase
        .from('cr_attachments')
        .select('id, storage_path, file_name')
        .eq('cr_id', id);
      if (!active) return;
      setAttachments((atts ?? []) as Attachment[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [id]);

  return { request, attachments, loading, error };
}
