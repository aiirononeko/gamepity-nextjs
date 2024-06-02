'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { createReview } from '@/actions/review'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { reviewSchema } from '@/schemas/review'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  userId: string
  userName: string
  streamerId: string
  streamerEmail: string
  planId: number
  reservationId: number
}

export function ReviewForm({
  userId,
  userName,
  streamerId,
  streamerEmail,
  planId,
  reservationId,
}: Props) {
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: undefined,
      comment: '',
      userId,
      userName,
      streamerId,
      streamerEmail,
      planId,
      reservationId,
    },
  })

  async function onSubmit(data: z.infer<typeof reviewSchema>) {
    await createReview(data)
    toast.success('レビューを投稿しました', {
      position: 'top-right',
      duration: 2000,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center space-y-6 md:items-start'
      >
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              <FormLabel>評価</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-80 border-border bg-background'>
                    <SelectValue placeholder='評価してください' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='1'>1</SelectItem>
                  <SelectItem value='2'>2</SelectItem>
                  <SelectItem value='3'>3</SelectItem>
                  <SelectItem value='4'>4</SelectItem>
                  <SelectItem value='5'>5</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem>
              <FormLabel>レビュー</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='遊んだ感想をお聞かせください'
                  className='w-80 resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className='w-40'
        >
          {form.formState.isSubmitting && (
            <Loader2 className='mr-2 size-4 animate-spin' />
          )}
          レビューを送信
        </Button>
      </form>
    </Form>
  )
}
