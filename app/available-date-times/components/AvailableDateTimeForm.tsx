'use client'

import { DAYS_LABEL } from '@/app/streamers/[id]/reservation/constants'
import type { AvailableDateTime } from '@/types/availableDateTime'
import { addHour, date, dayStart } from '@formkit/tempo'
import AvailableDateTimeCard from './AvailableDateTimeCard'

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
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <th className='h-10 text-left md:h-14'>{`${hour}:00`}</th>
              {oneWeekDateTimes.map((day, i) => {
                const targetStartDateTime = addHour(dayStart(date(day)), hour)
                const matchedAvailableDateTime = availableDateTimes.find(
                  (availableDateTime) =>
                    date(availableDateTime.start_date_time).getDate() ===
                      targetStartDateTime.getDate() &&
                    date(availableDateTime.start_date_time).getHours() ===
                      targetStartDateTime.getHours(),
                )
                return (
                  <AvailableDateTimeCard
                    key={`${i}_${day}_${hour}`}
                    isActive={matchedAvailableDateTime ? true : false}
                    availableDateTime={matchedAvailableDateTime}
                    targetStartDateTime={targetStartDateTime}
                    streamerId={streamerId}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
