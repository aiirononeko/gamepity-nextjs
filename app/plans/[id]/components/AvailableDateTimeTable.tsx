import type { Database } from '@/supabase/schema'

type Props = {
  availableDateTimes: Database['public']['Tables']['available_date_times']['Row'][]
}

export default function AvailableDateTimeTable({ availableDateTimes }: Props) {
  const weekDateTimes = [...Array(7)].map((_, i) => {
    const today = new Date()
    today.setDate(today.getDate() + i)
    return today
  })
  const days = ['日', '月', '火', '水', '木', '金', '土']

  return (
    <div className='w-full bg-game-gray-600 text-game-white rounded-xl py-6'>
      {/* {availableDateTimes.map((availableDateTime) => ( */}
      {/*   <p key={availableDateTime.id} className='text-center text-xl font-bold text-game-white'>{availableDateTime.id}</p> */}
      {/* ))} */}
      <table className='w-11/12 mx-auto'>
        <thead className='h-24'>
          <tr>
            <th className='w-12'></th>
            {weekDateTimes.map((weekDateTime) => (
              <th key={weekDateTime.toUTCString()} className='w-28'>
                <span className='block'>{days[weekDateTime.getDay()]}</span>
                <p className='text-3xl'>{weekDateTime.getDate()}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(24)].map((_, i) => (
            <tr key={i}>
              <th className='h-20 text-left'>{`${i + 1}:00`}</th>
              <td className='border border-solid'>{true && <div className='bg-game-white h-20'></div>}</td>
              <td className='border border-solid'></td>
              <td className='border border-solid'></td>
              <td className='border border-solid'></td>
              <td className='border border-solid'></td>
              <td className='border border-solid'></td>
              <td className='border border-solid'></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
