create table public.plans (
  id bigserial,
  name varchar(255) not null,
  description varchar(255),
  amount integer not null,
  stripe_product_id varchar(255) not null,
  stripe_price_id varchar(255) not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  streamer_id uuid not null references public.streamers(id),

  primary key (id)
);

create table public.plans_games (
  plan_id bigint not null references public.plans(id) on delete cascade,
  game_id bigint not null references public.games(id) on delete cascade,

  primary key (plan_id, game_id)
);
