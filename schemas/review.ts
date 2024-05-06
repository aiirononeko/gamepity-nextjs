import { z } from 'zod'

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string({ required_error: 'レビューコメントを投稿してください' }),
  userId: z.string({ required_error: 'ユーザーIDは必須です' }),
  streamerId: z.string({ required_error: 'ストリーマーIDは必須です' }),
  planId: z.number({ required_error: 'プランIDは必須です' }),
})
