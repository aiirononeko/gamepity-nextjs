'use client'

import { signUpUserWithEmail } from '@/actions/auth'
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
import { Input } from '@/components/ui/input'
import { signUpUserSchema } from '@/schemas/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpUserSchema>>({
    resolver: zodResolver(signUpUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      hasAgreedWithTermsOfService: undefined,
      hasAgreedWithPrivacyPolicy: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof signUpUserSchema>) {
    await signUpUserWithEmail(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='ゲーミピティ男'
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
        <FormField
          control={form.control}
          name='hasAgreedWithTermsOfService'
          render={({ field }) => (
            <FormItem className='flex w-80 flex-row space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>
                  <a
                    href='https://brash-ferry-996.notion.site/9f18b38032884fe8915c7addad0e7f0e'
                    target='_blank'
                    className='cursor-pointer underline hover:text-gray-600'
                  >
                    利用規約
                  </a>
                  に同意する
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='hasAgreedWithPrivacyPolicy'
          render={({ field }) => (
            <FormItem className='flex w-80 flex-row space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>
                  <a
                    href='https://brash-ferry-996.notion.site/116df216216d478d9ab909e53d6475a9'
                    target='_blank'
                    className='cursor-pointer underline hover:text-gray-600'
                  >
                    プライバシーポリシー
                  </a>
                  に同意する
                </FormLabel>
              </div>
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
          登録
        </Button>
      </form>
    </Form>
  )
}
