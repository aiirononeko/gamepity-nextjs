-- テーブルにカラムを追加する
ALTER TABLE public.streamers
ADD COLUMN available_date_times_count integer DEFAULT 0;

-- カラムの初期化（必要に応じて）
UPDATE public.streamers
SET available_date_times_count = 0;

-- カラムのデフォルト値を設定
ALTER TABLE public.streamers
ALTER COLUMN available_date_times_count SET DEFAULT 0;

-- テーブルにカラムを追加する
ALTER TABLE public.streamers
ADD COLUMN plans_count integer DEFAULT 0;

-- カラムの初期化（必要に応じて）
UPDATE public.streamers
SET plans_count = 0;

-- カラムのデフォルト値を設定
ALTER TABLE public.streamers
ALTER COLUMN plans_count SET DEFAULT 0;
