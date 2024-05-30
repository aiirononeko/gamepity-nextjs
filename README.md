# サービス概要

ストリーマーとゲーマーを繋ぐマッチングプラットフォーム。
ストリーマーが販売するチケットを購入して、一緒にゲームを楽しもう。

# 使用技術

## Development

- Nextjs AppRouter
- TypeScript
- TailwindCSS

## BaaS

- Supabase

## Hosting

- Vercel

# コマンド

## アプリケーションサーバー起動

```
npm run dev
```

## マイグレーション or DB Clean Up

```
supabase db reset
```

## 型生成

```
supabase gen types typescript --local > supabase/schema.ts
```

## Functions起動

```
supabase functions serve --no-verify-jwt
```

## Stripe Webhookローカル

```
stripe login
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhoo
stripe trigger payment_intent.succeeded
```
