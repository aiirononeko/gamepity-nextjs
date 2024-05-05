create table public.reviews (
  id bigserial,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  streamer_id uuid not null references public.streamers(id),
  user_id uuid not null references auth.users(id),
  plan_id bigint not null references public.plans(id),

  primary key (id)
);

create view streamer_avg_ratings as
select streamer_id, avg(rating) as avg_rating
from reviews
group by streamer_id;

create function update_streamer_avg_rating_func()
returns trigger as $$
begin
  update public.streamers
  set avg_rating = (
    select avg_rating
    from streamer_avg_ratings
    where streamer_id = new.streamer_id
  )
  where id = new.streamer_id;
  return new;
end;
$$ language plpgsql;

create trigger update_streamer_avg_rating_trigger
after insert or update or delete on reviews
for each row
  execute function update_streamer_avg_rating_func();
