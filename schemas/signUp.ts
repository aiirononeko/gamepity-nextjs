import { z } from 'zod'

export const signUpSchema = z.object({
  name: z
    .string({ required_error: 'ユーザー名は必須です' })
    .min(1, 'ユーザー名は1文字以上入力してください')
    .max(20, 'ユーザー名は20文字以内で入力してください'),
  email: z
    .string({ required_error: 'メールアドレスは必須です' })
    .email('正しいメールアドレスを入力してください'),
  password: z
    .string({ required_error: 'パスワードは必須です' })
    .min(6, 'パスワードは6文字以上入力してください')
    .max(30, 'パスワードは30文字以内で入力してください'),
  hasAgreedWithTermsOfService: z.literal(true, {
    errorMap: () => ({ message: '同意してください' }),
  }),
  hasAgreedWithPrivacyPolicy: z.literal(true, {
    errorMap: () => ({ message: '同意してください' }),
  }),
})
