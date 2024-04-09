create table public.plans (
  id bigserial,
  name varchar(255) not null,
  description varchar(255),
  amount integer not null,
  stripe_product_id varchar(255) not null,
  stripe_price_id varchar(255) not null,
  stripe_payment_link_id varchar(255) not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,
  streamer_id uuid not null references public.streamers(id),
  game_id bigint not null references public.games(id),

  primary key (id)
);

create or replace function public.handle_new_plan()
returns trigger
language plpgsql
as $$
begin
  insert into public.streamer_games (streamer_id, game_id)
  values (new.streamer_id, new.game_id)
  on conflict do nothing;

  return new;
end;
$$;

create trigger on_plan_created
after insert on public.plans
for each row
  execute procedure public.handle_new_plan();
