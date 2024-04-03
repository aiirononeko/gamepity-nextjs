create table public.users (
  id uuid not null references auth.users on delete cascade,
  name varchar(255) not null unique,
  icon_url varchar(255),
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,

  primary key (id)
);

alter table public.users enable row level security;

create policy "Users can select their own data."
  on users for select
  using ( auth.uid() = id );

create policy "Users can insert their own data."
  on users for insert
  with check ( auth.uid() = id );

create policy "Users can update own data."
  on users for update
  using ( auth.uid() = id );

-- inserts a row into public.users
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, name, created_at, updated_at)
  values (new.id, new.raw_user_meta_data ->> 'name', NOW(), NOW());
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table public.streamers (
  id uuid not null references auth.users on delete cascade,
  name varchar(255) not null unique,
  icon_url varchar(255),
  profile varchar(255),
  stripe_account_id varchar(255) unique,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,

  primary key (id)
);

alter table public.streamers enable row level security;

create policy "Public streamers are viewable by everyone."
  on streamers for select
  using ( true );

create policy "Streamers can insert their own data."
  on streamers for insert
  with check ( auth.uid() = id );

create policy "Streamers can update own data."
  on streamers for update
  using ( auth.uid() = id );

create table public.games (
  id bigserial primary key,
  name varchar(255) not null,
  description varchar(255),
  icon_url varchar(255),
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);

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
  user_id uuid not null references auth.users(id),
  game_id bigint not null references public.games(id)
);

create table public.reservations (
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

create table public.available_date_times (
  id bigserial primary key,
  start_date_time timestamp with time zone not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,
  user_id uuid not null references auth.users(id),
  reservation_id bigint references public.reservations(id)
);
