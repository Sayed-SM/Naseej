# Orders API

`POST /api/orders` validates the checkout payload and recalculates all line prices from the server catalog. Client totals are ignored. The local development fallback keeps orders in process memory and the browser also persists a confirmation copy in `localStorage`.

This memory store is not durable across restarts, deployments, or serverless instances. Configure a real database before accepting public orders. Support contact values are placeholders in `src/lib/site.ts`.

## Supabase table DDL

```sql
create table public.orders (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null default 'تم استلام الطلب',
  customer jsonb not null,
  lines jsonb not null,
  subtotal integer not null check (subtotal >= 0),
  shipping integer not null check (shipping >= 0),
  total integer not null check (total = subtotal + shipping),
  eta text not null
);
alter table public.orders enable row level security;
-- Write and lookup through a server-side service role only. Never expose service_role to the browser.
```

The current endpoint is intentionally not connected to Supabase; its adapter must persist the validated server-side `Order` and perform protected order lookup before production.
