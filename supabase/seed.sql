/**
 * Streamers
 */
insert into auth.users
  (instance_id, id, aud, role, email, encrypted_password, raw_app_meta_data, raw_user_meta_data, email_confirmed_at, created_at)
values
  ('00000000-0000-0000-0000-000000000000', '185f2f83-d63a-4c9b-b4a0-7e4a885799e2', 'authenticated', 'authenticated', 'streamer1@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('00000000-0000-0000-0000-000000000001', '185f2f83-d63a-4c9b-b4a0-7e4a885799e3', 'authenticated', 'authenticated', 'streamer2@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('00000000-0000-0000-0000-000000000002', '185f2f83-d63a-4c9b-b4a0-7e4a885799e4', 'authenticated', 'authenticated', 'streamer3@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('00000000-0000-0000-0000-000000000003', '185f2f83-d63a-4c9b-b4a0-7e4a885799e5', 'authenticated', 'authenticated', 'streamer4@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('00000000-0000-0000-0000-000000000004', '185f2f83-d63a-4c9b-b4a0-7e4a885799e6', 'authenticated', 'authenticated', 'streamer5@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('00000000-0000-0000-0000-000000000005', '185f2f83-d63a-4c9b-b4a0-7e4a885799e7', 'authenticated', 'authenticated', 'streamer6@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('00000000-0000-0000-0000-000000000006', '185f2f83-d63a-4c9b-b4a0-7e4a885799e8', 'authenticated', 'authenticated', 'streamer7@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('00000000-0000-0000-0000-000000000007', '185f2f83-d63a-4c9b-b4a0-7e4a885799e9', 'authenticated', 'authenticated', 'streamer8@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('00000000-0000-0000-0000-000000000008', '185f2f83-d63a-4c9b-b4a0-7e4a885799e0', 'authenticated', 'authenticated', 'streamer9@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('00000000-0000-0000-0000-000000000009', '185f2f83-d63a-4c9b-b4a0-7e4a885799e1', 'authenticated', 'authenticated', 'streamer10@email.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now()));

insert into users
  (id, name, profile, is_streamer, stripe_account_id, created_at, updated_at)
values
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e2', 'ゲテモノピロ毛', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12345', NOW(), NOW()),
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e3', 'yangamer', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12346', NOW(), NOW()),
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e4', 'きこりんご', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12347', NOW(), NOW()),
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e5', 'ponchell', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12348', NOW(), NOW()),
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e6', 'ツーシーム投げ猫', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12349', NOW(), NOW()),
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e7', 'ペペンギン', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12355', NOW(), NOW()),
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e8', 'ウイスキーウガイのど', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12356', NOW(), NOW()),
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e9', 'ゲテモノピロ毛2', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12357', NOW(), NOW()),
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e0', 'ゲテモノピロ毛3', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12358', NOW(), NOW()),
  ('185f2f83-d63a-4c9b-b4a0-7e4a885799e1', 'ゲテモノピロ毛4', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', true, '12359', NOW(), NOW());

/**
 * Games
 */
insert into games
  (name, description, created_at, updated_at)
values
  ('Apex Legends', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW()),
  ('Call Of Duty', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW()),
  ('モンスターハンター', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW()),
  ('Factorio', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW()),
  ('スプラトゥーン', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW()),
  ('Battle Flelds', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW()),
  ('Battle Flelds2', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW()),
  ('Battle Flelds3', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW()),
  ('Battle Flelds4', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW()),
  ('Battle Flelds5', '一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!一緒に遊びましょう!', NOW(), NOW());
