import Link from 'next/link'
import { Database } from '@/supabase/schema'

type Props = {
  plan: Database['public']['Tables']['plans']['Row']
}

export default function PlanCard({ plan }: Props) {
  return (
    <div className='grid h-20 grid-cols-12 items-center rounded-lg bg-game-gray-600'>
      <p className='col-span-2 line-clamp-1 text-center font-bold text-game-white'>
        {plan.name}
      </p>
      <p className='col-span-8 line-clamp-2 font-bold text-game-white'>
        {plan.description}
      </p>
      <p className='col-span-1 text-center font-bold text-game-white'>60分</p>
      <p className='col-span-1 text-center font-bold text-game-white'>{plan.amount}円</p>
    </div>
  )
}
