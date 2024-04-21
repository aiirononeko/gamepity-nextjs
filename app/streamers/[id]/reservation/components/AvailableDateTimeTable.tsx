import Link from 'next/link'
import { DAYS_LABEL } from '@/app/streamers/[id]/reservation/constants'
import type { Database } from '@/supabase/schema'
import { tzDate } from '@formkit/tempo'

type Props = {
  availableDateTimes: Database['public']['Tables']['available_date_times']['Row'][]
  plan: Database['public']['Tables']['plans']['Row']
  oneWeekDateTimes: Date[]
}

export default function AvailableDateTimeTable({
  availableDateTimes,
  plan,
  oneWeekDateTimes,
}: Props) {
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
        <tbody>
          {[...Array(24)].map((_, hour) => (
            <tr key={hour}>
              <th className='h-20 text-left'>{`${hour + 1}:00`}</th>
              {oneWeekDateTimes.map((day, i) => {
                const matchingDateTimes = availableDateTimes.filter((dateTime) => {
                  const jstStartDateTime = tzDate(dateTime.start_date_time, 'Asia/Tokyo')
                  return (
                    jstStartDateTime.getDate() === tzDate(day, 'Asia/Tokyo').getDate() &&
                    jstStartDateTime.getHours() === hour + 1
                  )
                })
                return (
                  <td key={`${i}_${day.toISOString()}`} className='border border-solid'>
                    {matchingDateTimes.map((dateTime) => (
                      <Link
                        key={dateTime.id}
                        href={`/streamers/${plan.streamer_id}/reservation/confirm/?planId=${plan.id}&availableDateTimeId=${dateTime.id}`}
                      >
                        <div className='block h-20 cursor-pointer bg-game-white'></div>
                      </Link>
                    ))}
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
