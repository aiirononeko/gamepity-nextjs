import { EmailTemplate } from '@/components/EmailTemplate'
import { createClient } from '@/lib/resend'
import type { Review } from '@/types/review'

export const sendReviewdEmailToStreamer = async (
  streamerEmail: string,
  userName: string,
  review: Review,
) => {
  const resend = createClient()

  const { error } = await resend.emails.send({
    from: 'Gamepity <noreplay@gamepity.com>',
    to: [streamerEmail],
    subject: 'ユーザーがあなたを評価しました！',
    react: EmailTemplate({ userName, review }) as React.ReactElement,
  })
  if (error) {
    console.error(error.message)
    throw error
  }
}
