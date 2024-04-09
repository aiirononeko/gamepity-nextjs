create table public.games (
  id bigserial primary key,
  name varchar(255) not null,
  description varchar(255),
  icon_url varchar(255),
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);
