-- Run this migration in the Supabase SQL Editor before enabling the frontend.
create extension if not exists pgcrypto;

create type public.order_status as enum ('pending_payment', 'paid', 'processing', 'ready_for_delivery', 'out_for_delivery', 'delivered', 'cancelled');
create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type public.request_status as enum ('new', 'reviewing', 'quoted', 'accepted', 'declined', 'closed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2) check (compare_at_price is null or compare_at_price >= price),
  sku text unique,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  unique (product_id, sort_order)
);

create table public.delivery_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  cities text[] not null default '{}',
  fee numeric(12,2) not null check (fee >= 0),
  is_active boolean not null default true
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('ORD-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))),
  customer_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  delivery_address text not null,
  delivery_city text not null,
  postal_code text,
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery_fee numeric(12,2) not null default 0 check (delivery_fee >= 0),
  total numeric(12,2) not null check (total >= 0),
  status public.order_status not null default 'pending_payment',
  payment_status public.payment_status not null default 'pending',
  payment_provider text,
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  line_total numeric(12,2) generated always as (unit_price * quantity) stored
);

create table public.custom_furniture_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 320),
  phone text,
  furniture_type text,
  dimensions text,
  colour text,
  material text,
  budget text,
  details text not null check (char_length(details) between 10 and 5000),
  reference_image_path text,
  status public.request_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 320),
  message text not null check (char_length(message) between 10 and 5000),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.delivery_zones enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.custom_furniture_requests enable row level security;
alter table public.contact_messages enable row level security;

create policy "Public can read active categories" on public.categories for select using (is_active);
create policy "Public can read active products" on public.products for select using (is_active);
create policy "Public can read images for active products" on public.product_images for select using (exists (select 1 from public.products p where p.id = product_id and p.is_active));
create policy "Public can read active delivery zones" on public.delivery_zones for select using (is_active);
create policy "Visitors can send contact messages" on public.contact_messages for insert with check (true);
create policy "Visitors can send custom requests" on public.custom_furniture_requests for insert with check (true);
create policy "Customers can read their profile" on public.profiles for select using (auth.uid() = id);
create policy "Customers can update their profile" on public.profiles for update using (auth.uid() = id);
create policy "Customers can read their orders" on public.orders for select using (auth.uid() = customer_id);
create policy "Customers can read their order items" on public.order_items for select using (exists (select 1 from public.orders o where o.id = order_id and o.customer_id = auth.uid()));
create policy "Customers can read their own requests" on public.custom_furniture_requests for select using (auth.uid() = customer_id);

-- Orders are created by a payment-aware Edge Function, never directly from the browser.
-- Create private buckets named product-images and custom-request-images in Storage.
