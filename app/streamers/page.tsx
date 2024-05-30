import StreamerCard from '@/components/StreamerCard'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getStreamers } from '@/data/streamer'

export default async function Page() {
  const streamers = await getStreamers()

  return (
    <div className='md:mx-[320px] mt-12 space-y-6'>
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
      <div className='grid gap-12 md:grid-cols-3'>
        {streamers.map((streamer) => (
          <StreamerCard key={streamer.id} streamer={streamer} />
        ))}
      </div>
    </div>
  )
}
