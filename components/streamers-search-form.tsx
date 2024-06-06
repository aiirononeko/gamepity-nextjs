'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { searchStreamersSchema } from '@/schemas/streamer'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export const StreamersSearchForm = () => {
  const form = useForm<z.infer<typeof searchStreamersSchema>>({
    resolver: zodResolver(searchStreamersSchema),
  })
  const router = useRouter()
  const searchText = form.watch('name')

  const onSubmit = () => {
    const params = new URLSearchParams()
    params.append('searchText', searchText)
    router.push(`/streamers?${params}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-60 justify-center space-x-4 md:justify-start'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='ストリーマー名で検索'
                  {...field}
                  className='w-60'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className='w-40'
        >
          {form.formState.isSubmitting && <Loader2 />}
          検索
        </Button>
      </form>
    </Form>
  )
}
