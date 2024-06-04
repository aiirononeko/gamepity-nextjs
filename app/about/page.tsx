import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  return (
    <div className='mx-auto mb-12 mt-6 flex w-80 flex-col justify-center space-y-12 md:mx-[160px] md:mb-24 md:mt-10 md:block md:w-full md:space-y-16 md:tracking-widest'>
      <div className='space-y-6 bg-background md:space-y-10'>
        <h1 className='text-[56px] font-bold leading-[68px] text-accent md:text-[118px] md:leading-[140px] md:tracking-[10px]'>
          For <br />
          All
          <br />
          Gamers
          <br /> Platform
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 md:items-end'>
          <p className='mb-10 md:mb-0 md:text-xl'>
            ゲーマーとストリーマーを繋ぐマッチングプラットフォーム。
          </p>
          <Button
            variant='default'
            className='font-bold md:h-[50px] md:w-[240px]'
            asChild
          >
            <Link href='/streamers/signup'>
              ストリーマー登録はこちら
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className='space-y-6 leading-8 md:w-2/3'>
        <h2 className='text-4xl font-semibold text-accent'>
          What is Gamepity?
        </h2>
        <div className='space-y-4'>
          <p>
            Gamepity (ゲーミピティ)
            は、ゲームがうまくなりたい、憧れのストリーマーと一緒にゲームがしたいというゲーマーと、ストリーマーを繋ぐサービスです。
          </p>
          <p>
            ストリーマーはコーチングやランクマッチ、カジュアルを遊ぶ&quot;プラン&quot;を作成し、販売します。
          </p>
          <p>
            ユーザーがプランを購入したら、指定の時間にDiscordサーバーに集まり、決まった時間ゲームを遊びます。
          </p>
          <p>ゲームが終わったら、ユーザーがストリーマーを評価して完了です。</p>
        </div>
      </div>
      <div className='space-y-6 leading-8 md:w-2/3'>
        <h2 className='text-4xl font-semibold text-accent'>For Streamers.</h2>
        <div className='space-y-4'>
          <p>
            Gamepity (ゲーミピティ)
            は、ストリーマー様の収益化を最大化することを目標にサービスを開発・運営しています。
          </p>
          <p>
            現在はβ運用期間のため、プラットフォーム手数料は頂戴いたしません。
          </p>
          <p>
            β運用が終了し、本リリースするタイミングで改めてアナウンスしますが、プラットフォーム手数料は7~8%程度を想定しています。
          </p>
        </div>
      </div>
    </div>
  )
}
