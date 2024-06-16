'use client'

import { Share as ShareIcon } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  streamerId: string
}

export const Share = ({ streamerId }: Props) => {
  const url = `https://www.gamepity.com/streamers/${streamerId}`
  const text = 'Gamepityで一緒にゲームを遊びませんか？%20%23Gamepity%20'

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('ストリーマーページのURLをコピーしました', {
        position: 'top-right',
      })
    } catch {
      toast.error('URLのコピーに失敗しました', {
        position: 'top-right',
      })
    }
  }

  return (
    <div className='flex flex-row items-center space-x-3'>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
        target='_blank'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 1200 1227'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'
            fill='white'
          />
        </svg>
      </a>
      <ShareIcon onClick={copyUrl} />
    </div>
  )
}
