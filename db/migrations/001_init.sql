create extension if not exists "pgcrypto";

create type unit_status as enum ('Occupied', 'Vacant', 'Turnover');
create type lease_status as enum ('Active', 'Expired', 'Upcoming');
create type rent_status as enum ('Paid', 'Partial', 'Unpaid', 'Late');
create type payment_method as enum ('Cash', 'Zelle', 'ACH', 'Check', 'Other');
create type maintenance_priority as enum ('Low', 'Medium', 'High');
create type maintenance_status as enum ('Open', 'Scheduled', 'In Progress', 'Waiting', 'Completed');
create type vacancy_status as enum ('Needs Repair', 'Cleaning', 'Ready', 'Listed', 'Showing', 'Approved Applicant', 'Leased');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text not null,
  zip text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  unit_label text not null,
  bedrooms numeric(3,1) not null default 0,
  bathrooms numeric(3,1) not null default 0,
  square_feet integer,
  status unit_status not null default 'Vacant',
  current_rent numeric(10,2) not null default 0,
  market_rent numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (property_id, unit_label)
);

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  emergency_contact text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  unit_id uuid not null references public.units(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  monthly_rent numeric(10,2) not null,
  security_deposit numeric(10,2) not null default 0,
  rent_due_day int not null check (rent_due_day between 1 and 31),
  status lease_status not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rent_charges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lease_id uuid not null references public.leases(id) on delete cascade,
  charge_month date not null,
  amount_due numeric(10,2) not null,
  due_date date not null,
  status rent_status not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lease_id, charge_month)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lease_id uuid not null references public.leases(id) on delete cascade,
  rent_charge_id uuid references public.rent_charges(id) on delete set null,
  amount numeric(10,2) not null check (amount > 0),
  payment_date date not null,
  payment_method payment_method not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.maintenance_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  unit_id uuid not null references public.units(id) on delete cascade,
  issue_type text not null,
  title text not null,
  description text,
  priority maintenance_priority not null default 'Medium',
  status maintenance_status not null default 'Open',
  assigned_to text,
  date_opened date not null default current_date,
  date_closed date,
  estimated_cost numeric(10,2),
  actual_cost numeric(10,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vacancies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  unit_id uuid not null references public.units(id) on delete cascade,
  date_vacated date not null,
  asking_rent numeric(10,2) not null,
  status vacancy_status not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['profiles','properties','units','tenants','leases','rent_charges','payments','maintenance_tickets','vacancies']
  loop
    execute format('drop trigger if exists set_updated_at_%1$s on public.%1$s', t);
    execute format('create trigger set_updated_at_%1$s before update on public.%1$s for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.units enable row level security;
alter table public.tenants enable row level security;
alter table public.leases enable row level security;
alter table public.rent_charges enable row level security;
alter table public.payments enable row level security;
alter table public.maintenance_tickets enable row level security;
alter table public.vacancies enable row level security;

create policy "profiles own row" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "properties owner" on public.properties for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "units owner" on public.units for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tenants owner" on public.tenants for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "leases owner" on public.leases for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "rent_charges owner" on public.rent_charges for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "payments owner" on public.payments for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "maintenance_tickets owner" on public.maintenance_tickets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "vacancies owner" on public.vacancies for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
