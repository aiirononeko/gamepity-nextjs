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
  const gameNames = plan.plans_games.map(
    (plans_game) => plans_game.game_id.name,
  )

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{gameNames.join(', ')}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-4 whitespace-pre-wrap'>{plan.description}</p>
        <p className='font-semibold'>{`${plan.amount}円 / 60分`}</p>
      </CardContent>
      <CardFooter>
        <div className='space-x-4'>
          <Button
            variant='destructive'
            className='text-white'
            onClick={() => alert('開発中')}
          >
            削除
          </Button>
          <Button
            variant='default'
            className='text-white'
            onClick={() => alert('開発中')}
          >
            売り切れにする
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
