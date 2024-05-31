import Image from 'next/image'
import Link from 'next/link'

type Props = {
  sns_url: string
  image_src: string
}

export default function SnsIcon({ sns_url, image_src }: Props) {
  return (
    <Link href={sns_url}>
      <Image alt={`${sns_url}のロゴ`} src={image_src} width={30} height={30} />
    </Link>
  )
}
