import Image from 'next/image'
import Link from 'next/link'

type Props = {
  sns_url: string
  image_src: string
}

export default function SnsCard({ sns_url, image_src }: Props) {
  return (
    <Link href={sns_url}>
      <div>
        <Image
          alt={`${sns_url}のロゴ`}
          src={image_src}
          width={40}
          height={40}
        />
      </div>
    </Link>
  )
}
