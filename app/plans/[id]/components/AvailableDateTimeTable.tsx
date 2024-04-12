import type { Database } from '@/supabase/schema'
import { DAYS_LABEL } from '@/app/plans/[id]/constants'

type Props = {
  availableDateTimes: Database['public']['Tables']['available_date_times']['Row'][]
  oneWeekDateTimes: Date[]
}

export default function AvailableDateTimeTable({
  availableDateTimes,
  oneWeekDateTimes,
}: Props) {
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
                const isAvailable = availableDateTimes.some((dateTime) => {
                  const jstStartDate = new Date(dateTime.start_date_time)
                  return (
                    jstStartDate.getDate() === day.getDate() &&
                    jstStartDate.getHours() === hour + 1
                  )
                })
                return (
                  <td key={`${i}_${day}`} className='border border-solid'>
                    {isAvailable && <div className='h-20 bg-game-white'></div>}
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
