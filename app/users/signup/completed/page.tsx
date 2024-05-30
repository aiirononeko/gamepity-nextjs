import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='mx-10 mb-16 mt-8 flex flex-col items-start space-y-8 md:mx-[160px] md:mt-10 md:items-start'>
      <p>仮登録が完了しました。</p>
      <p>
        確認メールを送信しましたので、ご確認いただき本登録をお願いいたします。
      </p>
      <Button variant='outline' asChild>
        <Link href='/'>トップページに戻る</Link>
      </Button>
    </div>
  )
}
