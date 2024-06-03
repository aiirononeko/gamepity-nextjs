import PlanCard from '@/app/streamers/[id]/components/PlanCard'
import SnsIcon from '@/app/streamers/[id]/components/SnsIcon'
import Rating from '@/components/Rating'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getPlans } from '@/data/plan'
import { getStreamer } from '@/data/streamer'
import Image from 'next/image'
import Link from 'next/link'
import ReviewCard from './components/ReviewCard'

export default async function Page({ params }: { params: { id: string } }) {
  const streamer = await getStreamer(params.id)
  const plans = await getPlans(streamer.id)

  // @ts-expect-error: Supabaseの型解決がうまくいかないのでignore
  const { reviews } = streamer

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>ストリーマー詳細</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>{streamer.name}のページ</h2>
      <div className='space-y-6 md:flex md:w-full md:flex-row md:space-x-8 md:space-y-0'>
        {streamer.icon_url ? (
          <div className='relative h-[220px] w-[352px]'>
            <Image
              alt={`${streamer.name}のアイコン`}
              src={streamer.icon_url}
              fill={true}
            />
          </div>
        ) : (
          <div className='h-[220px] w-[352px]'></div>
        )}
        <div className='w-[352px] space-y-6 md:w-2/3'>
          <div className='md:flex md:space-x-4'>
            <p className='text-2xl font-bold md:text-3xl'>{streamer.name}</p>
            <Rating
              star={streamer.avg_rating ?? 0}
              size={16}
              readOnly={true}
              withLabel={true}
            />
          </div>
          <p className='whitespace-pre-wrap md:line-clamp-6'>
            {streamer.profile}
          </p>
        </div>
      </div>
      <div className='flex flex-row items-center space-x-6'>
        {streamer.youtube_url && (
          <SnsIcon
            sns_url={streamer.youtube_url}
            image_src='/sns/youtube_logo.png'
          />
        )}
        {streamer.twitch_url && (
          <SnsIcon
            sns_url={streamer.twitch_url}
            image_src='/sns/twitch_logo.png'
          />
        )}
        {streamer.x_url && (
          <Link href={streamer.x_url}>
            <svg
              width='30'
              height='30'
              viewBox='0 0 1200 1227'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'
                fill='white'
              />
            </svg>
          </Link>
        )}
      </div>
      <h2 className='text-xl font-bold'>プラン</h2>
      {plans && plans.length > 0 ? (
        <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
          {plans.map((plan) => (
            // @ts-expect-error: Supabaseの型解決がうまくいかないのでignore
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <p>まだプランがありません</p>
      )}
      <h2 className='text-xl font-bold'>レビュー</h2>
      {reviews && reviews.length > 0 ? (
        <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
          {/* @ts-expect-error: Supabaseの型解決がうまくいかないのでignore */}
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p>まだ評価されていないストリーマーです</p>
      )}
    </div>
  )
}
