create table public.available_date_times (
  id bigserial,
  start_date_time timestamp with time zone not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  streamer_id uuid not null references public.streamers(id),

  primary key (id)
);
