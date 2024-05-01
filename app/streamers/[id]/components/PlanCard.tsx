import Link from 'next/link'
import { Database } from '@/supabase/schema'

type Props = {
  plan: Database['public']['Tables']['plans']['Row']
}

export default function PlanCard({ plan }: Props) {
  return (
    <div className='h-32 bg-game-gray-600 transition hover:-translate-y-1 duration-300'></div>
  )
  // return (
  //   <div className='grid h-20 grid-cols-12 items-center rounded-lg bg-game-gray-600'>
  //     <p className='col-span-2 line-clamp-1 text-center font-bold text-game-white'>
  //       {plan.name}
  //     </p>
  //     <p className='col-span-6 line-clamp-2 font-bold text-game-white'>
  //       {plan.description}
  //     </p>
  //     <p className='col-span-1 text-center font-bold text-game-white'>60分</p>
  //     <p className='col-span-1 text-center font-bold text-game-white'>{plan.amount}円</p>
  //     <Link
  //       href={`/streamers/${plan.streamer_id}/reservation/?planId=${plan.id}`}
  //       className='col-span-2 mx-auto'
  //     >
  //       <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-6 py-3 text-game-white'>
  //         このプランで予約
  //       </button>
  //     </Link>
  //   </div>
  // )
}
