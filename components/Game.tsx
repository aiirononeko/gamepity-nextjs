import Link from 'next/link'
import { Database } from '@/supabase/schema'

type Props = {
  game: Database['public']['Tables']['games']['Row']
}

export default function Game({ game }: Props) {
  return (
    <div className='transition hover:-translate-y-1 duration-300'>
      <Link href={`/games/${game.id}`}>
        <div className='flex h-10 w-40 items-center justify-center rounded-full bg-game-gray-600'>
          <p className='text-game-white'>{game.name}</p>
        </div>
      </Link>
    </div>
  )
}
