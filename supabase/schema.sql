-- ============================================================
-- IELTS Master — Supabase schema
-- ------------------------------------------------------------
-- Run this in your Supabase project (Dashboard → SQL Editor →
-- New query → Run) so the app's CRUD operations have real
-- tables to talk to.
--
-- SECURITY NOTE: the app uses its own demo authentication
-- (usernames + password hashes in the `users` table) and talks
-- to Supabase with the anon key, so the RLS policies below are
-- intentionally permissive for this demo. For production,
-- replace them with policies keyed on auth.uid() (Supabase Auth)
-- and stop storing password hashes in plain tables.
-- ============================================================

-- Accounts: one row per sign-up, mirrors the app's user object.
create table if not exists public.users (
  id            text primary key,             -- client-generated "u…" id
  username      text not null unique,
  email         text not null default '',
  password_hash text not null default '',     -- demo hash only (not real security)
  xp            integer not null default 0,
  claims        jsonb not null default '[]'::jsonb,
  created_at    bigint not null default 0,    -- epoch milliseconds
  updated_at    bigint not null default 0
);

-- Profiles: display name, bio, target band, avatar and activity log.
create table if not exists public.profiles (
  user_id      text primary key references public.users (id) on delete cascade,
  display_name text not null default '',
  bio          text not null default '',
  target_band  text not null default '',
  avatar       text,
  activity     jsonb not null default '[]'::jsonb,
  updated_at   bigint not null default 0
);

-- Training progress: one row per user holding all module state.
create table if not exists public.training_progress (
  user_id    text primary key references public.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at bigint not null default 0
);

-- Weekly exam results: one row per exam attempt.
create table if not exists public.exam_results (
  id           text primary key,              -- client-generated "e…" id
  user_id      text not null references public.users (id) on delete cascade,
  week         integer not null,
  score        integer not null default 0,
  total        integer not null default 15,
  seconds_used integer not null default 0,
  created_at   bigint not null default 0
);

-- Community feed: one row per post (shared by all users).
create table if not exists public.posts (
  id         text primary key,
  author     text not null,
  avatar     text,
  level      text not null default '',
  text       text not null default '',
  attachment jsonb,
  likes      jsonb not null default '[]'::jsonb,
  comments   jsonb not null default '[]'::jsonb,
  system     boolean not null default false,
  created_at bigint not null default 0
);

-- Useful indexes for feed ordering and exam lookups.
create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists exam_results_user_idx on public.exam_results (user_id, created_at);

-- Allow the anon / authenticated roles (the anon key) to use the tables.
grant all on public.users, public.profiles, public.training_progress,
           public.exam_results, public.posts
           to anon, authenticated;

-- ============================================================
-- Row Level Security (demo: permissive — see the note above)
-- ============================================================
alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.training_progress enable row level security;
alter table public.exam_results enable row level security;
alter table public.posts enable row level security;

create policy "users_all" on public.users
  for all using (true) with check (true);
create policy "profiles_all" on public.profiles
  for all using (true) with check (true);
create policy "training_progress_all" on public.training_progress
  for all using (true) with check (true);
create policy "exam_results_all" on public.exam_results
  for all using (true) with check (true);
create policy "posts_all" on public.posts
  for all using (true) with check (true);
