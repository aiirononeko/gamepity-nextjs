'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Plan } from '@/types/plan'

type Props = {
  plan: Plan
}

export const PlanCard = ({ plan }: Props) => {
  // @ts-ignore
  const gameNames = plan.plans_games.map((plans_game) => plans_game.game_id.name)

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{gameNames.join(', ')}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-4'>{plan.description}</p>
        <p className='font-semibold'>{`${plan.amount}円 / 60分`}</p>
      </CardContent>
      <CardFooter>
        <Button variant='outline' className='text-white' onClick={() => alert('開発中')}>
          編集
        </Button>
      </CardFooter>
    </Card>
  )
}
