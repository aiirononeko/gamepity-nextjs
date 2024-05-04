'use client'

import { useEffect, useState } from 'react'
import {
  createAvailableDateTime,
  deleteAvailableDateTime,
} from '@/actions/availableDateTime'
import { DAYS_LABEL } from '@/app/streamers/[id]/reservation/constants'
import type { Database } from '@/supabase/schema'
import { addHour, dayStart, format, hourStart, isEqual, tzDate } from '@formkit/tempo'

type Props = {
  availableDateTimes: Database['public']['Tables']['available_date_times']['Row'][]
  oneWeekDateTimes: Date[]
  streamerId: string
}

type AvailableDateTimesMap = {
  [key: string]: Database['public']['Tables']['available_date_times']['Row']
}

export default function AvailableDateTimeTable({
  availableDateTimes,
  oneWeekDateTimes,
  streamerId,
}: Props) {
  const [availableDateTimesMap, setAvailableDateTimesMap] =
    useState<AvailableDateTimesMap>({})

  useEffect(() => {
    const dateTimeMap: AvailableDateTimesMap = {}
    availableDateTimes.forEach((availableDateTime) => {
      const jstStartDateTime = tzDate(availableDateTime.start_date_time, 'Asia/Tokyo')
      const key = format({
        date: hourStart(jstStartDateTime),
        format: 'YYYY-MM-DDTHH:mm:ss',
      })
      dateTimeMap[key] = availableDateTime
    })
    setAvailableDateTimesMap(dateTimeMap)
  }, [availableDateTimes])

  const toggleDateTime = async (targetDateTime: Date, targetHour: number) => {
    const jstTargetDateTimeString = addHour(
      dayStart(tzDate(targetDateTime, 'Asia/Tokyo')),
      targetHour,
    )

    const found = Object.entries(availableDateTimesMap).find(([startDateTime, _]) => {
      return isEqual(startDateTime, jstTargetDateTimeString)
    })

    if (found) {
      // 予約可能日時を削除
      await deleteAvailableDateTime(found[1].id)
      const newAvailableDateTimeMap = Object.entries(availableDateTimesMap).filter(
        ([_, value]) => value.id !== found[1].id,
      )
      setAvailableDateTimesMap(Object.fromEntries(newAvailableDateTimeMap))
    } else {
      // 予約可能日時を追加
      const targetDateTime = format({
        date: hourStart(jstTargetDateTimeString),
        format: 'YYYY-MM-DDTHH:mm:ss',
      })
      const data = await createAvailableDateTime(targetDateTime, streamerId)
      if (data) {
        const newMap = { ...availableDateTimesMap }
        newMap[targetDateTime] = data
        setAvailableDateTimesMap(newMap)
      }
    }
  }

  return (
    <div className='w-full rounded-xl bg-game-gray-600 py-6 text-game-white'>
      <table className='mx-auto w-11/12'>
        <thead className='h-24'>
          <tr>
            <th className='w-12'></th>
            {oneWeekDateTimes.map((dateTime) => (
              <th key={dateTime.toISOString()} className='w-28'>
                <span className='block'>{DAYS_LABEL[dateTime.getDay()]}</span>
                <p className='text-3xl'>{dateTime.getDate()}</p>
              </th>
            ))}
          </tr>
        </thead>
        {availableDateTimesMap && (
          <tbody>
            {[...Array(24)].map((_, hour) => (
              <tr key={hour}>
                <th className='h-20 text-left'>{`${hour + 1}:00`}</th>
                {oneWeekDateTimes.map((day, i) => {
                  const isActive = Object.entries(availableDateTimesMap).some(
                    ([_, availableDateTime]) =>
                      tzDate(
                        availableDateTime.start_date_time,
                        'Asia/Tokyo',
                      ).getDate() === tzDate(day, 'Asia/Tokyo').getDate() &&
                      tzDate(
                        availableDateTime.start_date_time,
                        'Asia/Tokyo',
                      ).getHours() ===
                        hour + 1,
                  )
                  return (
                    <td
                      key={`${i}_${day}`}
                      className='border border-solid'
                      onClick={() => toggleDateTime(day, hour - 8)} // UTC時刻として渡す
                    >
                      {isActive && (
                        <div className='block h-20 cursor-pointer bg-game-white'></div>
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
