'use client'

import { updateProfile } from '@/actions/user'
import ImageSelector from '@/app/streamers/mypage/components/ImageSelector'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { userSchema } from '@/schemas/user'
import type { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

type Props = {
  user: User
}

export default function ProfileForm({ user }: Props) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      iconUrl: user.icon_url ?? undefined,
      userId: user.id,
    },
  })

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    await updateProfile(data)
    toast.success('プロフィールを更新しました', {
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
          name='iconUrl'
          render={({ field }) => (
            <FormItem>
              <Label>アイコン</Label>
              <FormControl>
                <ImageSelector
                  width='320px'
                  resultWidth={352}
                  aspectRatio={352 / 220}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='name'
          render={({ field }) => (
            <FormItem>
              <Label>名前</Label>
              <FormControl>
                <Input {...field} className='w-80' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className='w-40'
        >
          {form.formState.isSubmitting && (
            <Loader2 className='mr-2 size-4 animate-spin' />
          )}
          更新
        </Button>
      </form>
    </Form>
  )
}
