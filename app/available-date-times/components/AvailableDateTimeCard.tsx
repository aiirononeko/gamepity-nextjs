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
      setLoading(true)

      setAvailableDateTimeState(undefined)
      await deleteAvailableDateTime(availableDateTimeState?.id ?? 0, streamerId)

      // MEMO: 作成直後にdeleteをすると、データフェッチが間に合わず処理に失敗するため、
      // 1秒間のsleep処理を入れて回避
      await sleep(500)
      setLoading(false)

      toast.success('予約可能日時を削除しました', {
        position: 'top-right',
        duration: 1000,
      })
    } else {
      setLoading(true)

      // MEMO: 表示上クリックと同時に色が変わって欲しいのでダミーのデータを入れる
      setAvailableDateTimeState({
        id: 0,
        start_date_time: '',
        streamer_id: '',
        created_at: '',
        updated_at: '',
      })

      const newAvailableDateTime = await createAvailableDateTime(
        targetStartDateTime.toUTCString(),
        streamerId,
      )

      setAvailableDateTimeState(newAvailableDateTime)

      // MEMO: 作成直後にdeleteをされると、データフェッチが間に合わず処理に失敗するため、
      // 1.5秒間のsleep処理を入れて回避
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
      {(availableDateTimeState || loading) && (
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
