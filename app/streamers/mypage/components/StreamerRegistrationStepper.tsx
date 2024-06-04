'use client'

import { Step, Stepper, type StepItem } from '@/components/stepper'
import { Button } from '@/components/ui/button'
import { ExternalLink, PartyPopperIcon } from 'lucide-react'
import Link from 'next/link'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.gamepity.com'

type Props = {
  currentStep: number
  stripeAccountLinkUrl: string
}

export default function StreamerRegistrationStepper({
  currentStep,
  stripeAccountLinkUrl,
}: Props) {
  const steps = [
    {
      label: 'ストリーマープロフィールを完成させましょう',
      description: `プロフィールに必要な情報を入力してください。
アイコン、名前、プロフィール、Discord サーバー URLを設定していただくとトップページに表示されます。`,
    },
    {
      label: 'Stripe にビジネス情報を登録しましょう',
      description: `Stripeに売上の受け取り口座やビジネスの情報を登録しましょう。`,
      externalLink:
        'https://brash-ferry-996.notion.site/Stripe-c7906fe2b9744ea3a4840993f46d4bfd?pvs=4',
      link: stripeAccountLinkUrl,
    },
    {
      label: 'プランを作成しましょう',
      description: `販売するプランを作成しましょう。`,
      link: `${baseUrl}/plans/new`,
    },
    {
      label: '予約可能日時を登録しましょう',
      description: `予約可能な日にちを登録しましょう。`,
      link: `${baseUrl}/available-date-times`,
    },
  ] satisfies StepItem[]

  const hasCompletedAllSteps = currentStep === 4

  return (
    <div className='flex w-full flex-col gap-8'>
      <Stepper initialStep={currentStep} steps={steps} orientation='vertical'>
        {steps.map(({ label, description, externalLink, link }) => {
          return (
            <Step key={label} label={label}>
              <div className='h-full whitespace-pre-wrap text-wrap p-2 pt-4 text-primary'>
                <p>{description}</p>
                <div className='flex flex-col space-y-2'>
                  {externalLink && (
                    <Button variant='link' asChild className='mt-4'>
                      <Link
                        href={externalLink}
                        target='_blank'
                        className='decoration-accent'
                      >
                        手順はこちら
                        <ExternalLink className='ml-1 size-4' />
                      </Link>
                    </Button>
                  )}
                  {link && (
                    <Button variant='outline' asChild>
                      <Link href={link} target='_blank'>
                        登録はこちら
                        <ExternalLink className='ml-1 size-4' />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Step>
          )
        })}
      </Stepper>
      {hasCompletedAllSteps && (
        <div className='flex space-x-2'>
          <PartyPopperIcon />
          <p>すべての準備が完了しました！おつかれさまでした！</p>
        </div>
      )}
    </div>
  )
}
