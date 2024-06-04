import StreamerCard from '@/components/StreamerCard'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getStreamers } from '@/data/streamer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'すべてのストリーマー | Gamepity',
  description: 'ストリーマー一覧ページ',
}

export default async function Page() {
  const streamers = await getStreamers()

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>すべてのストリーマー</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>すべてのストリーマー</h2>
      <div className='flex space-x-4'>
        <Input placeholder='ストリーマー名で検索' />
        <Button variant='outline'>検索</Button>
      </div>
      <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
        {streamers.map((streamer) => (
          <StreamerCard key={streamer.id} streamer={streamer} />
        ))}
      </div>
    </div>
  )
}
