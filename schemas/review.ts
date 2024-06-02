import { z } from 'zod'

export const reviewSchema = z.object({
  rating: z.string().min(1),
  comment: z
    .string({ required_error: 'レビューコメントを投稿してください' })
    .min(1),
  userId: z.string({ required_error: 'ユーザーIDは必須です' }),
  userName: z.string({ required_error: 'ユーザー名は必須です' }),
  streamerId: z.string({ required_error: 'ストリーマーIDは必須です' }),
  streamerEmail: z.string({
    required_error: 'ストリーマーメールアドレスは必須です',
  }),
  planId: z.number({ required_error: 'プランIDは必須です' }),
  reservationId: z.number({ required_error: '予約IDは必須です' }),
})
