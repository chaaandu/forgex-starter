-- 0001_base.sql
-- The base tables for your app, and the rules for who can see what.
--
-- A migration is a file of SQL that sets up or changes your database.
-- Run it once: open your Supabase project, go to SQL Editor, paste this whole
-- file, and click Run. (README step 2, card 10.)
--
-- Two tables:
--   profiles       one row per person who signs in: their display name
--   example_items  a neutral example table to copy for your own (title, note, status)
--
-- At the bottom: a block to copy when you add a table of your own.


-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
-- One row per signed-in person. Its id is the same as their Supabase sign-in id,
-- so you can always find it from auth.uid().

create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  display_name  text not null default '' check (length(display_name) <= 80),
  created_at    timestamptz not null default now()
);

-- Makes a profile the first time someone signs in, named from their Google
-- account. "security definer" lets this one function write the row for them;
-- "search_path = ''" stops it being tricked into using someone else's table.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    left(coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''), 80)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ---------------------------------------------------------------------------
-- example_items
-- ---------------------------------------------------------------------------
-- Meaningless on purpose. Copy it for each table your flow needs, then rename.

create table public.example_items (
  id          uuid primary key default gen_random_uuid(),
  -- Who owns the row. It fills itself in with the signed-in person's id.
  owner_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title       text not null check (length(title) between 1 and 120),
  note        text not null default '' check (length(note) <= 1000),
  status      text not null default 'open' check (status in ('open', 'done')),
  created_at  timestamptz not null default now()
);

-- An index makes the common lookup fast: "my rows, newest first".
create index example_items_owner_created_idx on public.example_items (owner_id, created_at desc);


-- ---------------------------------------------------------------------------
-- Who may use the tables
-- ---------------------------------------------------------------------------
-- Supabase gives every new table broad rights by default. Take them all away,
-- then give back only what the app uses: signed-in people (authenticated) may
-- read and write, and only through the row-level security rules below.
-- Signed-out visitors (anon) get nothing.

revoke all on public.profiles, public.example_items from anon, authenticated;
grant select, insert, update, delete on public.profiles, public.example_items to authenticated;


-- ---------------------------------------------------------------------------
-- Row-level security (RLS)
-- ---------------------------------------------------------------------------
-- RLS is a rule on each table that decides which rows each person can see and
-- change. With RLS on and no rule that matches, the answer is "none".
--
-- auth.uid() is the id of the signed-in person making the request. Writing it
-- as (select auth.uid()) lets the database work it out once per query, not
-- once per row, which keeps big tables fast.
--
-- "using"      decides which existing rows you can see, change or delete.
-- "with check" decides what a new or changed row is allowed to look like.
-- Updates need both, so nobody can hand a row to someone else.

alter table public.profiles      enable row level security;
alter table public.example_items enable row level security;


-- profiles: you see and change only your own.
-- There is no delete rule: a profile goes when its sign-in account is deleted.

create policy "People see their own profile"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create policy "People create their own profile"
  on public.profiles for insert to authenticated
  with check (id = (select auth.uid()));

create policy "People change their own profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));


-- example_items: you see and change only rows whose owner_id is you.

create policy "Owners see their example items"
  on public.example_items for select to authenticated
  using (owner_id = (select auth.uid()));

create policy "Owners add example items for themselves"
  on public.example_items for insert to authenticated
  with check (owner_id = (select auth.uid()));

create policy "Owners change their example items"
  on public.example_items for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "Owners delete their example items"
  on public.example_items for delete to authenticated
  using (owner_id = (select auth.uid()));


-- ---------------------------------------------------------------------------
-- COPY THIS BLOCK TO ADD YOUR OWN TABLE
-- ---------------------------------------------------------------------------
-- 1. Copy everything between the two lines of dashes below into a new file,
--    supabase/migrations/0002_[your_table].sql. Don't change this file once
--    it has run: add a new numbered file for each change instead.
-- 2. Remove the "-- " at the start of each line.
-- 3. Replace [your_table] with your table's name: lower case, words joined
--    by underscores, plural.
-- 4. Replace the [your columns] line with your own columns. Keep id,
--    owner_id and created_at.
-- 5. Paste the file into the Supabase SQL Editor and click Run.
-- frameworks/04-data.md and prompts/add-a-table.md walk you through it.
--
-- ----------------------------------------------------------------------------
-- create table public.[your_table] (
--   id          uuid primary key default gen_random_uuid(),
--   owner_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
--   [your columns, like: name text not null check (length(name) between 1 and 120),]
--   created_at  timestamptz not null default now()
-- );
--
-- create index [your_table]_owner_created_idx on public.[your_table] (owner_id, created_at desc);
--
-- revoke all on public.[your_table] from anon, authenticated;
-- grant select, insert, update, delete on public.[your_table] to authenticated;
--
-- alter table public.[your_table] enable row level security;
--
-- create policy "Owners see their [your_table]"
--   on public.[your_table] for select to authenticated
--   using (owner_id = (select auth.uid()));
--
-- create policy "Owners add [your_table] for themselves"
--   on public.[your_table] for insert to authenticated
--   with check (owner_id = (select auth.uid()));
--
-- create policy "Owners change their [your_table]"
--   on public.[your_table] for update to authenticated
--   using (owner_id = (select auth.uid()))
--   with check (owner_id = (select auth.uid()));
--
-- create policy "Owners delete their [your_table]"
--   on public.[your_table] for delete to authenticated
--   using (owner_id = (select auth.uid()));
-- ----------------------------------------------------------------------------
--
-- A column that points at a row in another of your tables, like
--   [other]_id uuid references public.[other] (id) on delete cascade,
-- needs one more line in the insert and update "with check", so nobody can
-- point at someone else's row:
--   and [other]_id in (select id from public.[other] where owner_id = (select auth.uid()))
