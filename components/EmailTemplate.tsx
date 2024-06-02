import type { Review } from '@/types/review'
import * as React from 'react'

interface EmailTemplateProps {
  userName: string
  review: Review
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,
  review,
}) => (
  <div>
    <p>ユーザーがあなたを評価しましたのでお知らせいたします。</p>
    <p>あなたを評価したユーザー: {userName}さん</p>
    <p>レビュー: {review.rating}</p>
    <p>コメント: {review.comment}</p>
    <p>評価内容は評価管理画面からも確認いただけます。</p>
    <br />
    <a href='https://gamepity.com/reviews'>評価管理はこちら</a>
    <br />
    <p>Gamepity 運営</p>
  </div>
)
