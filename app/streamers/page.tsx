import StreamerCard from '@/components/StreamerCard'
import { StreamersSearchForm } from '@/components/streamers-search-form'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getStreamers, searchStreamers } from '@/data/streamer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'すべてのストリーマー | Gamepity',
  description: 'ストリーマー一覧ページ',
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const streamers = searchParams.searchText
    ? await searchStreamers(searchParams.searchText[0])
    : await getStreamers()

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>トップ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>すべてのストリーマー</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>すべてのストリーマー</h2>
      <StreamersSearchForm />
      {streamers && streamers.length > 0 ? (
        <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
          {streamers.map((streamer) => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
        </div>
      ) : (
        <p>ストリーマーがみつかりません</p>
      )}
    </div>
  )
}
