create table public.plans (
  id bigserial,
  name varchar(255) not null,
  description varchar(255),
  amount integer not null,
  stripe_product_id varchar(255) not null,
  stripe_price_id varchar(255) not null,
  stripe_payment_link_id varchar(255) not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  streamer_id uuid not null references public.streamers(id),

  primary key (id)
);

create or replace function public.handle_new_plan()
returns trigger
language plpgsql
as $$
declare
  game_id bigint;
begin
  foreach game_id in array new.game_ids
  loop
    insert into public.streamer_games (streamer_id, game_id)
    values (new.streamer_id, game_id)
    on conflict do nothing;
  end loop;
  
  return new;
end;
$$;

create table public.plans_games (
  plan_id bigint not null references public.plans(id),
  game_id bigint not null references public.games(id),

  primary key (plan_id, game_id)
);
