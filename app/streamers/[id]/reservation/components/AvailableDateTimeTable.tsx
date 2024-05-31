import { DAYS_LABEL } from '@/app/streamers/[id]/reservation/constants'
import type { AvailableDateTime } from '@/types/availableDateTime'
import type { Plan } from '@/types/plan'
import { tzDate } from '@formkit/tempo'
import Link from 'next/link'

type Props = {
  availableDateTimes: AvailableDateTime[]
  plan: Plan
  oneWeekDateTimes: Date[]
}

export default function AvailableDateTimeTable({
  availableDateTimes,
  plan,
  oneWeekDateTimes,
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
                const matchingDateTimes = availableDateTimes.filter(
                  (dateTime) => {
                    const jstStartDateTime = tzDate(
                      dateTime.start_date_time,
                      'Asia/Tokyo',
                    )
                    return (
                      jstStartDateTime.getDate() ===
                        tzDate(day, 'Asia/Tokyo').getDate() &&
                      jstStartDateTime.getHours() === hour
                    )
                  },
                )
                return (
                  <td
                    key={`${i}_${day.toISOString()}`}
                    className='border border-solid'
                  >
                    {matchingDateTimes.map((dateTime) => (
                      <Link
                        key={dateTime.id}
                        href={`/streamers/${plan.streamer_id}/reservation/confirm/?planId=${plan.id}&availableDateTimeId=${dateTime.id}`}
                      >
                        <div className='block h-10 cursor-pointer bg-zinc-300 hover:bg-zinc-400 md:h-14'></div>
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
