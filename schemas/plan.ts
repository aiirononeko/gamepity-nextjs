import { z } from 'zod'

export const planSchema = z.object({
  name: z
    .string({ required_error: 'プラン名は必須です' })
    .min(1, 'プラン名は1文字以上で入力してください')
    .max(30, 'プラン名は30文字以内で入力してください'),
  description: z
    .string({ required_error: 'プランの説明は必須です' })
    .min(1, 'プランの説明は1文字以上で入力してください')
    .max(500, 'プランの説明は500文字以内で入力してください'),
  amount: z
    .string({ required_error: 'プランの価格は必須です' })
    .min(3, 'プランの料金は100円以上に設定してください')
    .max(6, 'プランの料金は999999円以内に設定してください'),
  gameId: z
    .string({ required_error: 'ゲームタイトルは必須です' })
    .min(1, 'ゲームタイトルは1文字以上で入力してください')
    .max(100, 'ゲームタイトルは100文字以内で入力してください'),
  streamerId: z.string({
    required_error: 'ストリーマーIDが選択されていません',
  }),
})
