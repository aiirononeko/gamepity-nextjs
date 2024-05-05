create table public.available_date_times (
  id bigserial,
  start_date_time timestamp with time zone not null,
  is_reserved boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  streamer_id uuid not null references public.streamers(id),
  reservation_id bigint references public.reservations(id),

  primary key (id)
);
