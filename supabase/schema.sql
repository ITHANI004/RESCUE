-- Enable PostGIS for geospatial queries
create extension if not exists postgis;

-- 1. Users Table (extends auth.users)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text check (role in ('admin', 'officer', 'citizen')) default 'citizen',
  district text,
  created_at timestamptz default now()
);

-- 2. Disasters Table
create table public.disasters (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  type text not null, -- e.g., 'Flood', 'Fire', 'Earthquake'
  severity int check (severity between 1 and 5),
  latitude float not null,
  longitude float not null,
  status text check (status in ('active', 'contained', 'resolved')) default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Reports Table (Crowdsourced data)
create table public.reports (
  id uuid default gen_random_uuid() primary key,
  disaster_id uuid references public.disasters(id) on delete set null,
  user_id uuid references public.users(id) on delete set null,
  details text not null,
  image_url text,
  verified boolean default false,
  created_at timestamptz default now()
);

-- 4. Resources Table
create table public.resources (
  id uuid default gen_random_uuid() primary key,
  disaster_id uuid references public.disasters(id) on delete cascade,
  type text not null, -- 'Ambulance', 'FireTruck', 'Food', 'Personnel'
  quantity int default 1,
  status text check (status in ('dispatched', 'available', 'depleted')) default 'available',
  created_at timestamptz default now()
);

-- RLS Policies

-- Enable RLS
alter table public.users enable row level security;
alter table public.disasters enable row level security;
alter table public.reports enable row level security;
alter table public.resources enable row level security;

-- USERS Policies
create policy "Public profiles are viewable by everyone." on public.users
  for select using (true);

create policy "Users can insert their own profile." on public.users
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.users
  for update using (auth.uid() = id);

-- DISASTERS Policies
create policy "Disasters are viewable by everyone." on public.disasters
  for select using (true);

create policy "Only officers and admins can insert disasters." on public.disasters
  for insert with check (
    exists (select 1 from public.users where id = auth.uid() and role in ('officer', 'admin'))
  );

create policy "Only officers and admins can update disasters." on public.disasters
  for update using (
    exists (select 1 from public.users where id = auth.uid() and role in ('officer', 'admin'))
  );

-- REPORTS Policies
create policy "Reports are viewable by everyone." on public.reports
  for select using (true);

create policy "Authenticated users can create reports." on public.reports
  for insert with check (auth.role() = 'authenticated');

-- RESOURCES Policies
create policy "Resources visible to everyone" on public.resources
  for select using (true);

create policy "Only officers can manage resources" on public.resources
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role in ('officer', 'admin'))
  );

-- Realtime
alter publication supabase_realtime add table public.disasters;
alter publication supabase_realtime add table public.reports;
alter publication supabase_realtime add table public.resources;
