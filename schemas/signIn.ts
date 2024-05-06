import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'メールアドレスは必須です' })
    .email('正しいメールアドレスを入力してください'),
  password: z
    .string({ required_error: 'パスワードは必須です' })
    .min(6, 'パスワードは6文字以上入力してください')
    .max(30, 'パスワードは30文字以内で入力してください'),
})
