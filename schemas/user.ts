import { z } from 'zod'

export const userSchema = z.object({
  name: z
    .string({ required_error: 'プラン名は必須です' })
    .min(1, 'プラン名は1文字以上で入力してください')
    .max(30, 'プラン名は30文字以内で入力してください'),
  iconUrl: z.string().url().optional(),
  userId: z.string({
    required_error: 'User IDが選択されていません',
  }),
})
