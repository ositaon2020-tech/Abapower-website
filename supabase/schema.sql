-- ============================================================================
--  Aba Power — Admin CMS backend (Supabase / Postgres)
-- ============================================================================
--  HOW TO APPLY
--    1. Open https://supabase.com/dashboard/project/zfhrlhgvzwjgteuclnyt
--    2. Left sidebar -> "SQL Editor" -> "New query"
--    3. Paste this whole file and press "Run".
--
--  This script is IDEMPOTENT — running it twice will not delete content.
--
--  WHAT IT CREATES
--    Tables   : cms_collections, cms_settings, cms_activity, analytics_events
--    Storage  : a public "cms-media" bucket for images/video uploaded by admins
--    Security : Row Level Security so the public site can READ content, but
--               only a signed-in admin can WRITE it.
-- ============================================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------------ helper --
-- Keeps `updated_at` honest without the client having to send it.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
--  1. CMS COLLECTIONS  — ordered lists (news, hero stats, safety topics, ...)
-- ============================================================================
create table if not exists public.cms_collections (
    key        text        primary key,
    items      jsonb       not null default '[]'::jsonb,
    updated_at timestamptz not null default now(),
    updated_by text
);

comment on table public.cms_collections is
    'One row per CMS collection key; `items` is the ordered array of records.';

-- ============================================================================
--  2. CMS SETTINGS  — singletons (hero, newsroom, branding)
-- ============================================================================
create table if not exists public.cms_settings (
    key        text        primary key,
    value      jsonb       not null default '{}'::jsonb,
    updated_at timestamptz not null default now(),
    updated_by text
);

comment on table public.cms_settings is
    'One row per settings group (hero, newsroom, branding); `value` is the object.';

-- ============================================================================
--  3. CMS ACTIVITY  — every admin action, so nothing happens off the record
-- ============================================================================
create table if not exists public.cms_activity (
    id          uuid        primary key default gen_random_uuid(),
    action      text        not null,
    detail      text,
    actor_email text,
    created_at  timestamptz not null default now()
);

create index if not exists cms_activity_created_at_idx
    on public.cms_activity (created_at desc);

-- ============================================================================
--  4. ANALYTICS EVENTS  — first-party site analytics
-- ============================================================================
create table if not exists public.analytics_events (
    id         uuid        primary key default gen_random_uuid(),
    type       text        not null,          -- visit | view | click | search
    visitor_id text,
    page       text,
    keyword    text,
    label      text,
    source     text,
    device     text,
    hour       int,
    created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx
    on public.analytics_events (created_at desc);

create index if not exists analytics_events_type_idx
    on public.analytics_events (type);

-- ------------------------------------------------------------- updated_at --
drop trigger if exists cms_collections_touch on public.cms_collections;
create trigger cms_collections_touch
    before update on public.cms_collections
    for each row execute function public.touch_updated_at();

drop trigger if exists cms_settings_touch on public.cms_settings;
create trigger cms_settings_touch
    before update on public.cms_settings
    for each row execute function public.touch_updated_at();

-- ============================================================================
--  5. ROW LEVEL SECURITY
-- ============================================================================
--  The publishable/anon key ships inside the public website, so it must only
--  ever be able to do what a *visitor* may do. Writes require a real session.

alter table public.cms_collections  enable row level security;
alter table public.cms_settings     enable row level security;
alter table public.cms_activity     enable row level security;
alter table public.analytics_events enable row level security;

-- Make sure the API roles can reach the tables (Supabase usually pre-grants).
grant usage on schema public to anon, authenticated;
grant select                on public.cms_collections, public.cms_settings to anon, authenticated;
grant insert, update, delete on public.cms_collections, public.cms_settings to authenticated;
grant select, insert         on public.analytics_events to anon, authenticated;
grant delete                 on public.analytics_events to authenticated;
grant select, insert         on public.cms_activity to authenticated;

-- -------------------------------------------------- cms_collections --------
drop policy if exists "collections are readable by everyone" on public.cms_collections;
create policy "collections are readable by everyone"
    on public.cms_collections for select
    to anon, authenticated
    using (true);

drop policy if exists "collections are writable by admins" on public.cms_collections;
create policy "collections are writable by admins"
    on public.cms_collections for all
    to authenticated
    using (true) with check (true);

-- ----------------------------------------------------- cms_settings --------
drop policy if exists "settings are readable by everyone" on public.cms_settings;
create policy "settings are readable by everyone"
    on public.cms_settings for select
    to anon, authenticated
    using (true);

drop policy if exists "settings are writable by admins" on public.cms_settings;
create policy "settings are writable by admins"
    on public.cms_settings for all
    to authenticated
    using (true) with check (true);

-- ----------------------------------------------------- cms_activity --------
drop policy if exists "activity is readable by admins" on public.cms_activity;
create policy "activity is readable by admins"
    on public.cms_activity for select
    to authenticated
    using (true);

drop policy if exists "activity is recorded by admins" on public.cms_activity;
create policy "activity is recorded by admins"
    on public.cms_activity for insert
    to authenticated
    with check (true);

-- ------------------------------------------------ analytics_events ---------
-- Anyone browsing the site may report an event...
drop policy if exists "analytics can be reported by visitors" on public.analytics_events;
create policy "analytics can be reported by visitors"
    on public.analytics_events for insert
    to anon, authenticated
    with check (true);

-- ...but only an admin may read the collected data back.
drop policy if exists "analytics is readable by admins" on public.analytics_events;
create policy "analytics is readable by admins"
    on public.analytics_events for select
    to authenticated
    using (true);

drop policy if exists "analytics is cleared by admins" on public.analytics_events;
create policy "analytics is cleared by admins"
    on public.analytics_events for delete
    to authenticated
    using (true);

-- ============================================================================
--  6. STORAGE — public "cms-media" bucket for admin uploads
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do update set public = true;

-- Anyone may view a media file (it is referenced by the public website)...
drop policy if exists "cms media is publicly readable" on storage.objects;
create policy "cms media is publicly readable"
    on storage.objects for select
    to anon, authenticated
    using (bucket_id = 'cms-media');

-- ...but only a signed-in admin may add, replace or remove files.
drop policy if exists "cms media is uploaded by admins" on storage.objects;
create policy "cms media is uploaded by admins"
    on storage.objects for insert
    to authenticated
    with check (bucket_id = 'cms-media');

drop policy if exists "cms media is replaced by admins" on storage.objects;
create policy "cms media is replaced by admins"
    on storage.objects for update
    to authenticated
    using (bucket_id = 'cms-media');

drop policy if exists "cms media is deleted by admins" on storage.objects;
create policy "cms media is deleted by admins"
    on storage.objects for delete
    to authenticated
    using (bucket_id = 'cms-media');

-- ============================================================================
--  OPTIONAL HARDENING — restrict writes to a named allowlist
-- ============================================================================
--  By default *any* user in auth.users can edit content. To lock it down to
--  specific administrators, uncomment the block below, replace the email, and
--  change the write policies to use `public.is_cms_admin()`.
--
--  create table if not exists public.cms_admins (
--      email      text primary key,
--      created_at timestamptz not null default now()
--  );
--  insert into public.cms_admins (email) values ('you@abapower.com')
--      on conflict (email) do nothing;
--  alter table public.cms_admins enable row level security;
--
--  create or replace function public.is_cms_admin()
--  returns boolean language sql stable security definer as $$
--      select exists (
--          select 1 from public.cms_admins
--          where email = auth.jwt() ->> 'email'
--      );
--  $$;
--
--  Then, in each "writable by admins" policy above, replace
--      using (true) with check (true)
--  with
--      using (public.is_cms_admin()) with check (public.is_cms_admin())
-- ============================================================================
