'use client'

import { createPlan } from '@/actions/plan'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { planSchema } from '@/schemas/plan'
import type { Game } from '@/types/game'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
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

  const currentAmount = form.watch('amount')

  const streamerSales = () => {
    // MEMO: プラットフォーム手数料が変わったらロジック修正する
    return Number(currentAmount) - Number(currentAmount) * 0
  }

  const gameOptions = games.map((game) => {
    return {
      label: game.name,
      value: game.id.toString(),
    }
  })

  async function onSubmit(data: z.infer<typeof planSchema>) {
    await createPlan(data)
    toast.success('プランを作成しました', {
      position: 'top-right',
      duration: 2000,
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
              <FormDescription className='w-80'>
                プランの料金は100円以上で設定してください
              </FormDescription>
              {Number(currentAmount) >= 100 && (
                <FormDescription className='w-80'>
                  ストリーマー様の売り上げは、プラットフォーム手数料 0%
                  を差し引いた {streamerSales()}円 となります
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='gameId'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>ゲームタイトル</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-80 justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? gameOptions.find(
                            (option) => option.value === field.value,
                          )?.label
                        : '選択してください'}
                      <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent side='top' className='w-80 p-0'>
                  <Command>
                    <CommandInput placeholder='タイトル名で検索' />
                    <CommandEmpty className='py-2 text-center text-xs'>
                      タイトルが見つかりません
                    </CommandEmpty>
                    <CommandGroup className='h-80 overflow-auto'>
                      {gameOptions.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            form.setValue('gameId', option.value)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              option.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
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
