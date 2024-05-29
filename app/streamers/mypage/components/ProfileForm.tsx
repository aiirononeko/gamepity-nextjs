'use client'

import { updateProfile } from '@/actions/streamer'
import ImageSelector from '@/app/streamers/mypage/components/ImageSelector'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { streamerSchema } from '@/schemas/streamer'
import { Streamer } from '@/types/streamer'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  streamer: Streamer
}

export default function ProfileForm({ streamer }: Props) {
  const form = useForm<z.infer<typeof streamerSchema>>({
    resolver: zodResolver(streamerSchema),
    defaultValues: {
      streamerId: streamer.id,
      name: streamer.name,
      profile: streamer.profile ?? undefined,
      iconUrl: streamer.icon_url ?? undefined,
      discordUrl: streamer.discord_url ?? undefined,
      youtubeUrl: streamer.youtube_url ?? undefined,
      twitchUrl: streamer.twitch_url ?? undefined,
      xUrl: streamer.x_url ?? undefined,
    },
  })

  const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof streamerSchema>) => {
    await updateProfile(data)
    toast({
      description: 'プロフィールを更新しました',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          name='iconUrl'
          render={({ field }) => (
            <FormItem>
              <Label className='text-primary-foreground'>アイコン</Label>
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
              <Label className='text-primary-foreground'>名前</Label>
              <FormControl>
                <Input {...field} className='w-80 text-primary-foreground' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='profile'
          render={({ field }) => (
            <FormItem>
              <Label className='text-primary-foreground'>プロフィール</Label>
              <FormControl>
                <Textarea {...field} className='w-80 text-primary-foreground' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='discordUrl'
          render={({ field }) => (
            <FormItem>
              <Label className='text-primary-foreground'>Discordサーバー URL</Label>
              <FormControl>
                <Input {...field} className='w-80 text-primary-foreground' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='youtubeUrl'
          render={({ field }) => (
            <FormItem>
              <Label className='text-primary-foreground'>Youtube URL</Label>
              <FormControl>
                <Input {...field} className='w-80 text-primary-foreground' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='twitchUrl'
          render={({ field }) => (
            <FormItem>
              <Label className='text-primary-foreground'>Twich URL</Label>
              <FormControl>
                <Input {...field} className='w-80 text-primary-foreground' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='xUrl'
          render={({ field }) => (
            <FormItem>
              <Label className='text-primary-foreground'>X URL</Label>
              <FormControl>
                <Input {...field} className='w-80 text-primary-foreground' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant='outline'
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className='primary-gradient h-12 w-48 text-primary-foreground hover:text-primary-foreground'
        >
          {form.formState.isSubmitting && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          更新
        </Button>
      </form>
    </Form>
  )
}
