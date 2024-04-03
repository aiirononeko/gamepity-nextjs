create table users (
  id uuid primary key,
  name varchar(255) not null unique,
  icon_url varchar(255),
  profile varchar(255),
  is_streamer boolean not null default false,
  stripe_account_id varchar(255) unique,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);

create table games (
  id bigserial primary key,
  name varchar(255) not null,
  description varchar(255),
  icon_url varchar(255),
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);

create table plans (
  id bigserial primary key,
  name varchar(255) not null,
  description varchar(255),
  amount integer not null,
  stripe_product_id varchar(255) not null,
  stripe_price_id varchar(255) not null,
  stripe_payment_link_id varchar(255) not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,
  user_id uuid not null references auth.users(id),
  game_id bigint not null references public.games(id)
);

create table reservations (
  id bigserial primary key,
  start_date_dime timestamp with time zone not null,
  end_date_time timestamp with time zone not null,
  is_available boolean not null default false,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,
  streamer_id uuid not null references auth.users(id),
  user_id uuid not null references auth.users(id),
  plan_id bigint not null references public.plans(id)
);

create table available_date_times (
  id bigserial primary key,
  start_date_time timestamp with time zone not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,
  user_id uuid not null references auth.users(id),
  reservation_id bigint references public.reservations(id)
);
