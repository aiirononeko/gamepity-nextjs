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

create table public.streamers (
  id uuid not null references auth.users on delete cascade,
  name varchar(255) not null unique,
  icon_url varchar(255),
  profile varchar(255),
  stripe_account_id varchar(255) unique,
  avg_rating numeric(2, 1) default 0,
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

-- inserts a row into public.users
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if (new.raw_user_meta_data ->> 'is_streamer') then
    insert into public.streamers (id, name, created_at, updated_at)
    values (new.id, new.raw_user_meta_data ->> 'name', NOW(), NOW());
  else
    insert into public.users (id, name, created_at, updated_at)
    values (new.id, new.raw_user_meta_data ->> 'name', NOW(), NOW());
  end if;
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
