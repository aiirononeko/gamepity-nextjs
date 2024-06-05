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
  availableDateTime?: AvailableDateTime
  targetStartDateTime: Date
  streamerId: string
}

export default function AvailableDateTimeCard({
  availableDateTime,
  targetStartDateTime,
  streamerId,
}: Props) {
  const [availableDateTimeState, setAvailableDateTimeState] =
    useState(availableDateTime)
  const [loading, setLoading] = useState(false)

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const toggleIsActive = async () => {
    if (loading) return

    if (availableDateTimeState) {
      await deleteAvailableDateTime(availableDateTimeState?.id ?? 0)

      setLoading(true)
      await sleep(500)
      setLoading(false)

      setAvailableDateTimeState(undefined)

      toast.success('予約可能日時を削除しました', {
        position: 'top-right',
        duration: 1000,
      })
    } else {
      const newAvailableDateTime = await createAvailableDateTime(
        targetStartDateTime.toUTCString(),
        streamerId,
      )

      setAvailableDateTimeState(newAvailableDateTime)

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
      {availableDateTimeState && (
        <div
          className={cn(
            'block h-10 cursor-pointer bg-zinc-300 hover:bg-zinc-400 md:h-14',
            loading &&
              'flex items-center justify-center bg-zinc-600 hover:bg-zinc-600',
          )}
        >
          {loading && <Loader className='animate-spin' />}
        </div>
      )}
    </td>
  )
}
