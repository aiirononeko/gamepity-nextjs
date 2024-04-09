create table public.plans (
  id bigserial primary key,
  name varchar(255) not null,
  description varchar(255),
  amount integer not null,
  stripe_product_id varchar(255) not null,
  stripe_price_id varchar(255) not null,
  stripe_payment_link_id varchar(255) not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,
  streamer_id uuid not null references auth.users(id),
  game_id bigint not null references public.games(id)
);
