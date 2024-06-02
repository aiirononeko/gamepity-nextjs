'use client'

import {
  createAvailableDateTime,
  deleteAvailableDateTime,
} from '@/actions/availableDateTime'
import type { AvailableDateTime } from '@/types/availableDateTime'
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

  const toggleIsActive = async () => {
    if (isActiveState) {
      await deleteAvailableDateTime(availableDateTime?.id ?? 0)
      toast.success('予約可能日時を削除しました', {
        position: 'top-right',
        duration: 1000,
      })
    } else {
      await createAvailableDateTime(
        targetStartDateTime.toUTCString(),
        streamerId,
      ),
        toast.success('予約可能日時を追加しました', {
          position: 'top-right',
          duration: 1000,
        })
    }
    setIsActiveState(!isActiveState)
  }

  return (
    <td className='border border-solid' onClick={toggleIsActive}>
      {isActiveState && (
        <div className='block h-10 cursor-pointer bg-zinc-300 hover:bg-zinc-400 md:h-14'></div>
      )}
    </td>
  )
}
