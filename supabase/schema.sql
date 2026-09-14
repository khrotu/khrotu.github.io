create table public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  message text not null check (char_length(message) between 1 and 2000),
  parent_id uuid references public.guestbook (id) on delete set null,
  is_hidden boolean not null default false,
  spam_probability double precision,
  created_at timestamptz not null default now()
);

create index guestbook_created_at_idx on public.guestbook (created_at desc);
create index guestbook_parent_id_idx on public.guestbook (parent_id)
  where parent_id is not null;

alter table public.guestbook enable row level security;

grant select on public.guestbook to anon;
grant select, insert, delete on public.guestbook to service_role;

create policy "anon read all"
  on public.guestbook for select to anon
  using (true);

create policy "no anon insert"
  on public.guestbook for insert to anon
  with check (false);

create policy "no anon update"
  on public.guestbook for update to anon
  using (false);

create policy "no anon delete"
  on public.guestbook for delete to anon
  using (false);
