'use client'

import { signOut } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function SignOutForm() {
  const form = useForm()
  const onSubmit = async () => {
    await signOut()
    toast.success('ログアウトしました', {
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
        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className='w-40'
          variant='outline'
        >
          {form.formState.isSubmitting && (
            <Loader2 className='mr-2 size-4 animate-spin' />
          )}
          ログアウト
        </Button>
      </form>
    </Form>
  )
}
