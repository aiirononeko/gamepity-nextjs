'use client'

import { createPlan } from '@/actions/plan'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { planSchema } from '@/schemas/plan'
import type { Game } from '@/types/game'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

type Props = {
  streamerId: string
  games: Game[]
}

export default function PlanForm({ streamerId, games }: Props) {
  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: '',
      description: '',
      amount: '',
      gameId: '',
      streamerId,
    },
  })

  async function onSubmit(data: z.infer<typeof planSchema>) {
    await createPlan(data)
    toast.success('プランを作成しました', {
      position: 'top-right',
      duration: 5000,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center space-y-8 md:items-start'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>プラン名</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='みっちりコーチングプラン'
                  {...field}
                  className='w-80'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormItem>
                  <Label>プラン内容</Label>
                  <FormControl>
                    <Textarea
                      placeholder='1時間コーチングしながらカジュアル回しましょう！'
                      {...field}
                      className='w-80'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>料金</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='3000'
                  {...field}
                  className='w-80'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='gameId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ゲームタイトル</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className='w-80 border-border bg-background'>
                    <SelectValue placeholder='ゲームタイトルを選択してください' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {games.map((game) => (
                    <SelectItem key={game.id} value={game.id.toString()}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          プランを作成
        </Button>
      </form>
    </Form>
  )
}
