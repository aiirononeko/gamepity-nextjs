import Link from 'next/link'
import type { Game } from '@/types/game'

type Props = {
  game: Game
}

export default function Game({ game }: Props) {
  return (
    <div className='transition duration-300 hover:-translate-y-1'>
      <Link href={`/games/${game.id}`}>
        <div className='bg-game-gray-600 flex h-10 w-40 items-center justify-center rounded-full'>
          <p className='text-game-white'>{game.name}</p>
        </div>
      </Link>
    </div>
  )
}
