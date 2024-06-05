'use client'

import {
  createAvailableDateTime,
  deleteAvailableDateTime,
} from '@/actions/availableDateTime'
import { cn } from '@/lib/utils'
import type { AvailableDateTime } from '@/types/availableDateTime'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  isActive: boolean
  availableDateTime?: AvailableDateTime
  targetStartDateTime: Date
  streamerId: string
}

export default function AvailableDateTimeCard({
  isActive,
  availableDateTime,
  targetStartDateTime,
  streamerId,
}: Props) {
  const [isActiveState, setIsActiveState] = useState(isActive)
  const [loading, setLoading] = useState(false)

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const toggleIsActive = async () => {
    if (loading) return

    if (isActiveState) {
      await deleteAvailableDateTime(availableDateTime?.id ?? 0)
      setIsActiveState(!isActiveState)
      toast.success('予約可能日時を削除しました', {
        position: 'top-right',
        duration: 1000,
      })
    } else {
      await createAvailableDateTime(
        targetStartDateTime.toUTCString(),
        streamerId,
      )
      setIsActiveState(!isActiveState)

      // MEMO: 作成直後にdeleteをすると、データフェッチが間に合わず処理に失敗するため、
      // 1.5秒間のsleep処理を入れて回避
      setLoading(true)
      await sleep(1500)
      setLoading(false)

      toast.success('予約可能日時を追加しました', {
        position: 'top-right',
        duration: 1000,
      })
    }
  }

  return (
    <td className='border border-solid' onClick={toggleIsActive}>
      {isActiveState && (
        <div
          className={cn(
            'block h-10 cursor-pointer bg-zinc-300 hover:bg-zinc-400 md:h-14',
            loading && 'flex items-center justify-center bg-zinc-400',
          )}
        >
          {loading && <Loader />}
        </div>
      )}
    </td>
  )
}
