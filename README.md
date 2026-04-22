# Domio

Domio is a production-quality MVP web app for small landlords who want one clean control center for unit operations, rent visibility, maintenance, and vacancies.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS + lightweight shadcn-style primitives
- Supabase (Auth + Postgres + RLS)
- React Hook Form + Zod

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your Supabase URL and anon key.
4. Run app:
   ```bash
   npm run dev
   ```

## Supabase migrations

Run `db/migrations/001_init.sql` in Supabase SQL editor or via Supabase CLI migration tooling.

Key entities included:
- profiles
- properties
- units
- tenants
- leases
- rent_charges
- payments
- maintenance_tickets
- vacancies

All core tables include `user_id` and RLS owner policies.

## Seed data

Use `db/seed/seed.sql` after replacing the placeholder `user_id` with your authenticated user UUID.

Seed includes:
- 2 properties
- 5 units
- mixed occupancy/vacancy
- vacancy turnover sample

## MVP routes

- `/login`
- `/dashboard`
- `/properties`, `/properties/[id]`
- `/units`, `/units/[id]`
- `/tenants`, `/tenants/[id]`
- `/rent`
- `/maintenance`, `/maintenance/[id]`
- `/vacancies`
- `/reports`
- `/settings`

## Deployment (Vercel)

1. Connect repo to Vercel.
2. Set environment variables from `.env.example`.
3. Deploy.
4. Apply Supabase migration and seed.
