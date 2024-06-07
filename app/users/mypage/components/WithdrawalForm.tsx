'use client'

import { withdrawal } from '@/actions/auth'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  userId: string
}

export default function WithdrawalForm({ userId }: Props) {
  const form = useForm()

  const onSubmit = async () => {
    await withdrawal(userId)
    toast.success('退会しました', {
      position: 'top-right',
      duration: 2000,
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='w-40'>
          退会
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col items-center space-y-8 md:items-start'
          >
            <AlertDialogHeader>
              <AlertDialogTitle className='text-primary-foreground'>
                本当に退会しますか？
              </AlertDialogTitle>
              <AlertDialogDescription>
                一度退会すると、ユーザー情報が削除されログインはできなくなりますがレビューデータ等は残ります。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction>
                <Button type='submit' variant='destructive' className='w-40'>
                  確認しました
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
