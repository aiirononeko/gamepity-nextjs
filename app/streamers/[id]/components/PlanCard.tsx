import Image from 'next/image'
import Link from 'next/link'
import { Database } from '@/supabase/schema'

type Props = {
  plan: Database['public']['Tables']['plans']['Row']
  streamer: Database['public']['Tables']['streamers']['Row']
  games: Database['public']['Tables']['games']['Row'][]
}

export default function PlanCard({ plan, streamer, games }: Props) {
  return (
    <div className='flex h-44 flex-row bg-game-gray-600 transition duration-300'>
      <div className='basis-2/12'>
        {streamer.icon_url ? (
          <div className='relative mx-16 my-11 h-2/3 w-2/5 rounded-full bg-game-gray-300'>
            <Image
              alt={`${streamer.name}のアイコン`}
              src={streamer.icon_url}
              fill={true}
            />
          </div>
        ) : (
          <div className='mx-16 my-11 h-1/2 w-2/5 rounded-full bg-game-gray-300'></div>
        )}
      </div>
      <div className='basis-3/12'>
        <div>
          <p className='mb-4 mt-8 text-2xl font-bold text-game-white'>{plan.name}</p>
          <p className='mb-4 text-xl font-bold text-game-white'>{plan.amount}円 / 60分</p>
          <div className='flex flex-row space-x-4'>
            {games.map((game) => (
              <div key={game.id} className=''>
                <p className='text-game-white'>{game.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='basis-5/12'>
        <p className='my-10 mr-8 line-clamp-4 text-game-white'>{plan.description}</p>
      </div>
      <div className='basis-2/12'>
        <Link href={`/streamers/${plan.streamer_id}/reservation/?planId=${plan.id}`}>
          <button className='my-16 rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-6 py-3 text-game-white hover:-translate-y-1'>
            このプランで予約
          </button>
        </Link>
      </div>
    </div>
  )
}
