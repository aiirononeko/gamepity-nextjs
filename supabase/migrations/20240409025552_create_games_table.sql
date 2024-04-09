create table public.games (
  id bigserial,
  name varchar(255) not null,
  description varchar(255),
  icon_url varchar(255),
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,

  primary key (id)
);

create table public.streamer_games (
  streamer_id uuid not null references public.streamers(id) on delete cascade,
  game_id bigint not null references public.games(id) on delete cascade,
  
  primary key (streamer_id, game_id)
);
