-- 1. Create the blogs table
create table public.blogs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null,
  image_url text not null,
  published boolean default false not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.blogs enable row level security;

-- 3. Create Policy for Public Read Access
create policy "Public blogs are viewable by everyone"
  on public.blogs
  for select
  using (published = true);

-- 4. Create Policy for Authenticated Users (Admin)
create policy "Admins can do everything"
  on public.blogs
  for all
  using (auth.role() = 'authenticated');

-- 5. Create storage bucket for blog images
insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true);

-- 6. Storage Policies
create policy "Public images are viewable by everyone"
  on storage.objects
  for select
  using (bucket_id = 'blog-images');

create policy "Admins can upload images"
  on storage.objects
  for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "Admins can update images"
  on storage.objects
  for update
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "Admins can delete images"
  on storage.objects
  for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

-- ==========================================
-- PROJECTS SETUP
-- ==========================================

-- 1. Create the projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  slug text not null unique,
  title text not null,
  category text not null,
  short_desc text not null,
  subtitle text not null,
  hero text not null,
  client text not null,
  industry text not null,
  platform text not null,
  services text not null,
  overview text not null,
  image text not null,
  tech_stack jsonb default '[]'::jsonb not null,
  challenges jsonb default '[]'::jsonb not null,
  approach jsonb default '[]'::jsonb not null,
  results jsonb default '[]'::jsonb not null,
  revenue_before text default '',
  revenue_after text default '',
  impact text default '',
  gallery jsonb default '[]'::jsonb not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- 3. Create Policy for Public Read Access
create policy "Public projects are viewable by everyone"
  on public.projects
  for select
  using (true);

-- 4. Create Policy for Authenticated Users (Admin)
create policy "Admins can do everything on projects"
  on public.projects
  for all
  using (auth.role() = 'authenticated');

-- 5. Create storage bucket for project images
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true) ON CONFLICT DO NOTHING;

-- 6. Storage Policies for Projects
create policy "Public project images are viewable by everyone"
  on storage.objects
  for select
  using (bucket_id = 'project-images');

create policy "Admins can upload project images"
  on storage.objects
  for insert
  with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy "Admins can update project images"
  on storage.objects
  for update
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy "Admins can delete project images"
  on storage.objects
  for delete
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');

