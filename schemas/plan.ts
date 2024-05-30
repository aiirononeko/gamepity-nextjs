import { z } from 'zod'

export const planSchema = z.object({
  name: z
    .string({ required_error: 'プラン名は必須です' })
    .max(30, 'プラン名は30文字以内で入力してください'),
  description: z.string({ required_error: 'プランの説明は必須です' }),
  amount: z
    .number({ required_error: 'プランの価格は必須です' })
    .min(100, 'プランの価格は100円以上にしてください'),
  gameIds: z.string().array().nonempty(),
  streamerId: z.string({
    required_error: 'ストリーマーIDが選択されていません',
  }),
})
