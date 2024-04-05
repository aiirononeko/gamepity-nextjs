import Button from '@/app/components/Button'
import { Database } from '@/supabase/schema'
import Link from 'next/link'

type Props = {
  plan: Database['public']['Tables']['plans']['Row']
}

export default function PlanCard(props: Props) {
  const { plan } = props

  return (
    <div className='grid h-20 grid-cols-12 items-center rounded-lg bg-game-gray-500'>
      <p className='col-span-2 line-clamp-1 text-center font-bold text-game-white'>
        {plan.name}
      </p>
      <p className='col-span-6 line-clamp-2 font-bold text-game-white'>
        {plan.description}
      </p>
      <p className='col-span-1 text-center font-bold text-game-white'>60分</p>
      <p className='col-span-1 text-center font-bold text-game-white'>{plan.amount}円</p>
      <Link href={`/plans/${plan.id}`} className='col-span-2 mx-auto'>
        <Button>このプランで予約</Button>
      </Link>
    </div>
  )
}
