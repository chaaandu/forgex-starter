-- 0001_init.sql
-- The tables for your shop app, and the rules for who can see what.
--
-- A migration is a file of SQL that sets up or changes your database.
-- Run it once: open your Supabase project, go to SQL Editor, paste this whole
-- file, and click Run. (README step 2.)
--
-- Five tables:
--   shops        one per owner
--   products     what the shop sells
--   messages     the WhatsApp message an order came from, and what AI read in it
--   orders       one per customer order
--   order_items  the lines of an order: what, how many, at what price


-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.shops (
  id          uuid primary key default gen_random_uuid(),
  -- The Supabase user who owns the shop. unique = one shop per owner.
  owner_id    uuid not null unique references auth.users (id) on delete cascade,
  name        text not null check (length(name) between 1 and 80),
  created_at  timestamptz not null default now()
);

create table public.products (
  id          uuid primary key default gen_random_uuid(),
  shop_id     uuid not null references public.shops (id) on delete cascade,
  name        text not null check (length(name) between 1 and 80),
  price       numeric(10, 2) not null check (price >= 0),  -- in rupees
  unit        text not null default 'piece',               -- like "1 kg" or "box of 6"
  created_at  timestamptz not null default now()
);

create table public.messages (
  id               uuid primary key default gen_random_uuid(),
  shop_id          uuid not null references public.shops (id) on delete cascade,
  raw_text         text not null,               -- the message exactly as pasted
  ai_lines         jsonb,                       -- what AI read; null if AI wasn't used
  confirmed_lines  jsonb not null default '[]', -- what the owner saved
  edits            int not null default 0 check (edits >= 0), -- lines the owner changed after AI
  created_at       timestamptz not null default now()
);

create table public.orders (
  id              uuid primary key default gen_random_uuid(),
  shop_id         uuid not null references public.shops (id) on delete cascade,
  customer_name   text,
  customer_phone  text,
  status          text not null default 'new'
                  check (status in ('new', 'ready', 'delivered', 'paid')),
  total           numeric(10, 2) not null default 0 check (total >= 0),
  -- The message this order came from. If the message is deleted, the order stays.
  message_id      uuid references public.messages (id) on delete set null,
  created_at      timestamptz not null default now()
);

create table public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders (id) on delete cascade,
  -- Empty when the item isn't in the product list, or the product was deleted.
  -- The name and price below are copied in, so old orders never change.
  product_id  uuid references public.products (id) on delete set null,
  name        text not null,
  qty         int not null check (qty > 0),
  price       numeric(10, 2) not null check (price >= 0)
);

-- Indexes make the common lookups fast: "this shop's orders, newest first".
create index products_shop_id_idx    on public.products (shop_id);
create index messages_shop_id_idx    on public.messages (shop_id);
create index orders_shop_created_idx on public.orders (shop_id, created_at desc);
create index orders_message_id_idx   on public.orders (message_id);
create index order_items_order_idx   on public.order_items (order_id);
create index order_items_product_idx on public.order_items (product_id);


-- ---------------------------------------------------------------------------
-- Who may use the tables
-- ---------------------------------------------------------------------------
-- Signed-in users may read and write these tables, but only through the
-- row-level security rules below. Signed-out visitors (anon) get nothing.

grant select, insert, update, delete
  on public.shops, public.products, public.messages, public.orders, public.order_items
  to authenticated;

revoke all
  on public.shops, public.products, public.messages, public.orders, public.order_items
  from anon;


-- ---------------------------------------------------------------------------
-- Row-level security (RLS)
-- ---------------------------------------------------------------------------
-- RLS is a rule on each table that decides which rows each person can see
-- and change. With RLS on and no rule that matches, the answer is "none".
--
-- auth.uid() is the id of the signed-in user making the request.
--
-- Every rule below comes down to one question:
--   "Is this row part of a shop whose owner_id is me?"
--
-- "using" decides which existing rows you can see, change or delete.
-- "with check" decides what a new or changed row is allowed to look like.
-- Updates need both, so nobody can move a row into someone else's shop.

alter table public.shops       enable row level security;
alter table public.products    enable row level security;
alter table public.messages    enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;


-- shops: you can only see and change your own shop.

create policy "Owners see their own shop"
  on public.shops for select to authenticated
  using (owner_id = auth.uid());

create policy "Owners create a shop for themselves"
  on public.shops for insert to authenticated
  with check (owner_id = auth.uid());

create policy "Owners change their own shop"
  on public.shops for update to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());  -- you can't hand your shop to someone else

create policy "Owners delete their own shop"
  on public.shops for delete to authenticated
  using (owner_id = auth.uid());


-- products: rows whose shop_id is one of your shops.

create policy "Owners see their products"
  on public.products for select to authenticated
  using (shop_id in (select id from public.shops where owner_id = auth.uid()));

create policy "Owners add products to their shop"
  on public.products for insert to authenticated
  with check (shop_id in (select id from public.shops where owner_id = auth.uid()));

create policy "Owners change their products"
  on public.products for update to authenticated
  using (shop_id in (select id from public.shops where owner_id = auth.uid()))
  with check (shop_id in (select id from public.shops where owner_id = auth.uid()));

create policy "Owners delete their products"
  on public.products for delete to authenticated
  using (shop_id in (select id from public.shops where owner_id = auth.uid()));


-- messages: rows whose shop_id is one of your shops.

create policy "Owners see their messages"
  on public.messages for select to authenticated
  using (shop_id in (select id from public.shops where owner_id = auth.uid()));

create policy "Owners add messages to their shop"
  on public.messages for insert to authenticated
  with check (shop_id in (select id from public.shops where owner_id = auth.uid()));

create policy "Owners change their messages"
  on public.messages for update to authenticated
  using (shop_id in (select id from public.shops where owner_id = auth.uid()))
  with check (shop_id in (select id from public.shops where owner_id = auth.uid()));

create policy "Owners delete their messages"
  on public.messages for delete to authenticated
  using (shop_id in (select id from public.shops where owner_id = auth.uid()));


-- orders: rows whose shop_id is one of your shops.
-- On insert and update there is one more check: if the order points at a
-- message, that message must belong to the same shop. Otherwise someone could
-- link their order to a message from another shop.

create policy "Owners see their orders"
  on public.orders for select to authenticated
  using (shop_id in (select id from public.shops where owner_id = auth.uid()));

create policy "Owners add orders to their shop"
  on public.orders for insert to authenticated
  with check (
    shop_id in (select id from public.shops where owner_id = auth.uid())
    and (
      message_id is null
      or message_id in (select id from public.messages where messages.shop_id = orders.shop_id)
    )
  );

create policy "Owners change their orders"
  on public.orders for update to authenticated
  using (shop_id in (select id from public.shops where owner_id = auth.uid()))
  with check (
    shop_id in (select id from public.shops where owner_id = auth.uid())
    and (
      message_id is null
      or message_id in (select id from public.messages where messages.shop_id = orders.shop_id)
    )
  );

create policy "Owners delete their orders"
  on public.orders for delete to authenticated
  using (shop_id in (select id from public.shops where owner_id = auth.uid()));


-- order_items: these have no shop_id of their own, so we go through the order.
-- A line is yours if its order is in one of your shops.
-- On insert and update, a line that names a product must name a product from
-- the same shop as its order.

create policy "Owners see their order items"
  on public.order_items for select to authenticated
  using (
    order_id in (
      select o.id from public.orders o
      join public.shops s on s.id = o.shop_id
      where s.owner_id = auth.uid()
    )
  );

create policy "Owners add items to their orders"
  on public.order_items for insert to authenticated
  with check (
    order_id in (
      select o.id from public.orders o
      join public.shops s on s.id = o.shop_id
      where s.owner_id = auth.uid()
    )
    and (
      product_id is null
      or product_id in (
        select p.id from public.products p
        join public.orders o on o.shop_id = p.shop_id
        where o.id = order_items.order_id
      )
    )
  );

create policy "Owners change their order items"
  on public.order_items for update to authenticated
  using (
    order_id in (
      select o.id from public.orders o
      join public.shops s on s.id = o.shop_id
      where s.owner_id = auth.uid()
    )
  )
  with check (
    order_id in (
      select o.id from public.orders o
      join public.shops s on s.id = o.shop_id
      where s.owner_id = auth.uid()
    )
    and (
      product_id is null
      or product_id in (
        select p.id from public.products p
        join public.orders o on o.shop_id = p.shop_id
        where o.id = order_items.order_id
      )
    )
  );

create policy "Owners delete their order items"
  on public.order_items for delete to authenticated
  using (
    order_id in (
      select o.id from public.orders o
      join public.shops s on s.id = o.shop_id
      where s.owner_id = auth.uid()
    )
  );
