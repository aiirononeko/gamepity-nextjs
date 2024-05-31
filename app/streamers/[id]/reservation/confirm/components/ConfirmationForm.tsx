'use client'

import { createReservation } from '@/actions/reservation'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { reservationSchema } from '@/schemas/reservation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

type Props = {
  amount: number
  availableDateTimeId: number
  startDateTime: string
  streamerId: string
  userId: string
  planId: number
  stripeAccountId: string
  stripePriceId: string
}

export default function ConfirmationForm({
  amount,
  availableDateTimeId,
  startDateTime,
  streamerId,
  userId,
  planId,
  stripeAccountId,
  stripePriceId,
}: Props) {
  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      amount,
      availableDateTimeId,
      startDateTime,
      streamerId,
      userId,
      planId,
      stripeAccountId,
      stripePriceId,
      hasConfirmedAndAgreedWithWarningInfo: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof reservationSchema>) {
    await createReservation(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center space-y-8 md:items-start'
      >
        <FormField
          control={form.control}
          name='hasConfirmedAndAgreedWithWarningInfo'
          render={({ field }) => (
            <FormItem className='flex flex-row space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>
                  <a
                    href='https://brash-ferry-996.notion.site/54ac9ecf2f41440dac1744f1bc94aedc'
                    target='_blank'
                    className='cursor-pointer underline hover:text-gray-600'
                  >
                    予約時の注意事項
                  </a>
                  を確認しました
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className='w-60'
          variant='default'
        >
          {form.formState.isSubmitting && (
            <Loader2 className='mr-2 size-4 animate-spin' />
          )}
          この内容で予約する
        </Button>
      </form>
    </Form>
  )
}
