-- reservations テーブルの変更
ALTER TABLE public.reservations
DROP CONSTRAINT reservations_user_id_fkey;

ALTER TABLE public.reservations
ADD CONSTRAINT reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

-- reviews テーブルの変更
ALTER TABLE public.reviews
DROP CONSTRAINT reviews_user_id_fkey;

ALTER TABLE public.reviews
ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
