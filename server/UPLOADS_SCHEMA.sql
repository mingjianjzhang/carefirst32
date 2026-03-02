-- Tax upload metadata table
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('Provider', 'Financial_Admin');
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'tax_upload_status') then
    create type public.tax_upload_status as enum ('pending', 'analyzed');
  end if;
end $$;

alter table public.profiles
  add column if not exists role public.user_role default 'Provider',
  add column if not exists practice_name text;

create table if not exists public.tax_uploads (
  id uuid primary key,
  user_id uuid references auth.users(id) on delete cascade,
  filename text not null,
  content_type text not null,
  s3_key text not null,
  status public.tax_upload_status not null default 'pending',
  potential_savings numeric,
  analyzed_at timestamp with time zone,
  reviewer_id uuid references public.profiles(id),
  created_at timestamp with time zone default now()
);

alter table public.tax_uploads
  alter column status drop default,
  alter column status type public.tax_upload_status
    using status::public.tax_upload_status,
  alter column status set default 'pending',
  add column if not exists potential_savings numeric,
  add column if not exists analyzed_at timestamp with time zone,
  add column if not exists reviewer_id uuid references public.profiles(id);

alter table public.tax_uploads enable row level security;

alter table public.profiles enable row level security;

create or replace function public.is_financial_admin()
returns boolean
language sql
security definer
set search_path = public, auth, pg_catalog
set row_security = off
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'Financial_Admin'
  );
$$;

drop policy if exists "Providers can insert own uploads" on public.tax_uploads;
create policy "Providers can insert own uploads"
  on public.tax_uploads for insert
  with check (auth.uid() = user_id);

drop policy if exists "Providers can view own uploads" on public.tax_uploads;
create policy "Providers can view own uploads"
  on public.tax_uploads for select
  using (auth.uid() = user_id);

drop policy if exists "Financial admins can view all uploads" on public.tax_uploads;
create policy "Financial admins can view all uploads"
  on public.tax_uploads for select
  using (public.is_financial_admin());

drop policy if exists "Financial admins can update uploads" on public.tax_uploads;
create policy "Financial admins can update uploads"
  on public.tax_uploads for update
  using (public.is_financial_admin())
  with check (public.is_financial_admin());

drop policy if exists "Users can view their profile" on public.profiles;
create policy "Users can view their profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Financial admins can view profiles" on public.profiles;
create policy "Financial admins can view profiles"
  on public.profiles for select
  using (public.is_financial_admin());

create or replace function public.notify_new_tax_upload()
returns trigger
language plpgsql
as $$
begin
  perform supabase_functions.http_request(
    'POST',
    current_setting('app.edge_notify_url', true),
    jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.edge_notify_service_key', true)
    ),
    jsonb_build_object(
      'upload_id', new.id,
      'user_id', new.user_id,
      'created_at', new.created_at
    )
  );
  return new;
end;
$$;

drop trigger if exists tax_uploads_notify_insert on public.tax_uploads;
create trigger tax_uploads_notify_insert
  after insert on public.tax_uploads
  for each row
  execute function public.notify_new_tax_upload();
