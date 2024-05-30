'use client'

import { signInWithEmail } from '@/actions/auth'
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
import { signInSchema } from '@/schemas/signIn'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

type Props = {
  hasConfirmationRedirected?: boolean
}

export default function SignInForm({
  hasConfirmationRedirected = false,
}: Props) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (hasConfirmationRedirected) {
      toast.success('アカウントの本登録が完了しました。', {
        position: 'top-right',
        duration: 5000,
      })
    }
  }, [hasConfirmationRedirected])

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    try {
      await signInWithEmail(data)
      toast.success('ログインしました', {
        position: 'top-right',
        duration: 5000,
      })
    } catch (e) {
      toast.error('ログインに失敗しました。', {
        position: 'top-right',
        duration: 5000,
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center space-y-8'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='game@example.com'
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='************'
                  {...field}
                  className='w-80'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-40'>
          ログイン
        </Button>
      </form>
    </Form>
  )
}
