'use client'

import {
  createAvailableDateTime,
  deleteAvailableDateTime,
} from '@/actions/availableDateTime'
import { DAYS_LABEL } from '@/app/streamers/[id]/reservation/constants'
import type { AvailableDateTime } from '@/types/availableDateTime'
import {
  addHour,
  dayStart,
  format,
  hourStart,
  isEqual,
  tzDate,
} from '@formkit/tempo'

type Props = {
  availableDateTimes: AvailableDateTime[]
  oneWeekDateTimes: Date[]
  streamerId: string
}

export default function AvailableDateTimeForm({
  availableDateTimes,
  oneWeekDateTimes,
  streamerId,
}: Props) {
  const hours = [...Array(24)].map((_, index) => (index + 9) % 24).slice(0, 20)

  const toggleDateTime = async (targetDateTime: Date, targetHour: number) => {
    const jstTargetDateTimeString = addHour(
      dayStart(tzDate(targetDateTime, 'Asia/Tokyo')),
      targetHour,
    )

    const found = availableDateTimes.find((availableDateTime) => {
      return isEqual(availableDateTime.start_date_time, jstTargetDateTimeString)
    })

    if (found) {
      // 予約可能日時を削除
      await deleteAvailableDateTime(found.id)
    } else {
      // 予約可能日時を追加
      const targetDateTime = format({
        date: hourStart(jstTargetDateTimeString),
        format: 'YYYY-MM-DDTHH:mm:ss',
      })
      await createAvailableDateTime(targetDateTime, streamerId)
    }
  }

  return (
    <div className='w-[352px] md:w-full'>
      <div className='mb-2 flex flex-row items-center space-x-2'>
        <div className='size-4 cursor-pointer bg-zinc-300 md:size-6'></div>
        <p>...予約可能</p>
      </div>
      <table className='md:w-full'>
        <thead>
          <tr>
            <th className='w-20 md:w-12'></th>
            {oneWeekDateTimes.map((dateTime) => (
              <th key={dateTime.toISOString()} className='w-28'>
                <span className='block'>{DAYS_LABEL[dateTime.getDay()]}</span>
                <p className='md:text-2xl'>{dateTime.getDate()}</p>
              </th>
            ))}
          </tr>
        </thead>
        {availableDateTimes && (
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <th className='h-10 text-left md:h-14'>{`${hour}:00`}</th>
                {oneWeekDateTimes.map((day, i) => {
                  const isActive = availableDateTimes.some(
                    (availableDateTime) =>
                      tzDate(
                        availableDateTime.start_date_time,
                        'Asia/Tokyo',
                      ).getDate() === tzDate(day, 'Asia/Tokyo').getDate() &&
                      tzDate(
                        availableDateTime.start_date_time,
                        'Asia/Tokyo',
                      ).getHours() === hour,
                  )
                  return (
                    <td
                      key={`${i}_${day}`}
                      className='border border-solid'
                      onClick={() => toggleDateTime(day, hour - 9)} // UTC時刻として渡す
                    >
                      {isActive && (
                        <div className='block h-10 cursor-pointer bg-zinc-300 hover:bg-zinc-400 md:h-14'></div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  )
}
