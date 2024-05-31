import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getPlan } from '@/data/plan'
import { getUser } from '@/data/user'
import type { Reservation } from '@/types/reservation'
import { addHour, date, format } from '@formkit/tempo'

type Props = {
  reservation: Reservation
}

export const ReservationCard = async ({ reservation }: Props) => {
  const user = await getUser(reservation.user_id)
  const plan = await getPlan(reservation.plan_id)

  const startDateTime = format({
    date: date(reservation.start_date_dime),
    format: 'YYYY-MM-DD hh:mm',
    tz: 'Asia/Tokyo',
  })

  const endDateTime = format({
    date: addHour(date(reservation.start_date_dime), 1),
    format: 'YYYY-MM-DD hh:mm',
    tz: 'Asia/Tokyo',
  })

  return (
    <Card className='w-[350px] md:transition md:duration-300 md:hover:-translate-y-3'>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>
          {startDateTime} ~ {endDateTime}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='font-semibold'>{plan.name}</p>
      </CardContent>
    </Card>
  )
}
