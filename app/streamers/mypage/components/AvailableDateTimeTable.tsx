'use client'

import { useEffect, useState } from 'react'
import { DAYS_LABEL } from '@/app/streamers/[id]/reservation/constants'
import type { Database } from '@/supabase/schema'
import { createAvailableDateTime, deleteAvailableDateTime } from '@/actions/availableDateTime'

type Props = {
  availableDateTimes: Database['public']['Tables']['available_date_times']['Row'][]
  oneWeekDateTimes: Date[]
  streamerId: string
}

export default function AvailableDateTimeTable({
  availableDateTimes,
  oneWeekDateTimes,
  streamerId
}: Props) {
  const [localAvailableDateTimes, setLocalAvailableDateTimes] = useState<Database['public']['Tables']['available_date_times']['Row'][]>([])

  useEffect(() => {
    setLocalAvailableDateTimes(availableDateTimes)
  }, [availableDateTimes])

  const toggleDateTime = async (dateTime: Date, hour: number) => {
    // JSTの時差を考慮して日時を生成
    const jstOffset = dateTime.getTimezoneOffset() + 540; // Tokyo is UTC+9, 540 minutes ahead
    dateTime.setMinutes(dateTime.getMinutes() + jstOffset);

    // 修正した時間（JST）で日時文字列を生成
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const date = dateTime.getDate().toString().padStart(2, '0');
    const jstHour = hour % 24; // 時間を24時間形式で調整
    const jstHourString = jstHour.toString().padStart(2, '0');

    // ISO8601形式の日時文字列を手動で構築
    const dateTimeString = `${year}-${month}-${date}T${jstHourString}:00:00`;

    const found = localAvailableDateTimes.find(d => d.start_date_time === dateTimeString + '+09:00');
    if (found) {
      // 予約可能日時を削除
      await deleteAvailableDateTime(found.id)
      setLocalAvailableDateTimes(localAvailableDateTimes.filter(d => d.id !== found.id))
    } else {
      // 予約可能日時を追加
      const data = await createAvailableDateTime(dateTimeString, streamerId)
      if (data) setLocalAvailableDateTimes([...localAvailableDateTimes, ...data])
    }
  }

  return (
    <div className='w-full rounded-xl bg-game-gray-600 py-6 text-game-white'>
      <table className='mx-auto w-11/12'>
        <thead className='h-24'>
          <tr>
            <th className='w-12'></th>
            {oneWeekDateTimes.map((dateTime) => (
              <th key={dateTime.toUTCString()} className='w-28'>
                <span className='block'>{DAYS_LABEL[dateTime.getDay()]}</span>
                <p className='text-3xl'>{dateTime.getDate()}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(24)].map((_, hour) => (
            <tr key={hour}>
              <th className='h-20 text-left'>{`${hour + 1}:00`}</th>
              {oneWeekDateTimes.map((day, i) => {
                const isActive = localAvailableDateTimes.some(dateTime =>
                  new Date(dateTime.start_date_time).getDate() === day.getDate() &&
                  new Date(dateTime.start_date_time).getHours() === hour + 1
                )
                return (
                  <td
                    key={`${i}_${day}`}
                    className='border border-solid'
                    onClick={() => toggleDateTime(day, hour + 1)}
                  >
                    {isActive && <div className='block h-20 cursor-pointer bg-game-white'></div>}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
