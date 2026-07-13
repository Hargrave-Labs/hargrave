-- === Enums ===
create type request_type as enum ('bug', 'content', 'feature', 'design');
create type cr_status as enum (
  'submitted', 'in_backlog', 'in_progress', 'in_review',
  'completed', 'needs_info', 'declined'
);

-- === profiles (one row per client) ===
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_name text,
  website_url text,
  created_at timestamptz not null default now()
);

-- === change_requests ===
create table public.change_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  request_type request_type not null,
  page_url text,
  acceptance_criteria text,
  status cr_status not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index change_requests_user_id_idx on public.change_requests (user_id);

-- === cr_attachments ===
create table public.cr_attachments (
  id uuid primary key default gen_random_uuid(),
  cr_id uuid not null references public.change_requests(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  created_at timestamptz not null default now()
);
create index cr_attachments_cr_id_idx on public.cr_attachments (cr_id);

-- === updated_at trigger ===
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger change_requests_set_updated_at
before update on public.change_requests
for each row execute function public.set_updated_at();

-- === auto-create a profile row when an invited user is added ===
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, company_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'company_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- === Row-Level Security ===
alter table public.profiles enable row level security;
alter table public.change_requests enable row level security;
alter table public.cr_attachments enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

create policy "cr_select_own" on public.change_requests
  for select using (user_id = auth.uid());

-- clients may only create requests for themselves, and only as 'submitted'
create policy "cr_insert_own" on public.change_requests
  for insert with check (user_id = auth.uid() and status = 'submitted');

create policy "att_select_own" on public.cr_attachments
  for select using (
    exists (
      select 1 from public.change_requests cr
      where cr.id = cr_attachments.cr_id and cr.user_id = auth.uid()
    )
  );

create policy "att_insert_own" on public.cr_attachments
  for insert with check (
    exists (
      select 1 from public.change_requests cr
      where cr.id = cr_attachments.cr_id and cr.user_id = auth.uid()
    )
  );

-- === Storage bucket (private) ===
insert into storage.buckets (id, name, public)
values ('cr-attachments', 'cr-attachments', false)
on conflict (id) do nothing;

create policy "cr_attach_read_own" on storage.objects
  for select using (
    bucket_id = 'cr-attachments'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "cr_attach_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'cr-attachments'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
