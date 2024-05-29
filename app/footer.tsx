'use client'

import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className='container sticky top-full flex h-16 items-center gap-3 border-t'>
      <p className='text-sm text-muted-foreground'>
        &copy;2024 Gamepity. All rights reserved.
      </p>
      <span className='flex-1'></span>
      <Button asChild variant='link'>
        <a
          href='https://www.notion.so/9f18b38032884fe8915c7addad0e7f0e?pvs=4'
          target='_blank'
        >
          利用規約
        </a>
      </Button>
      <Button asChild variant='link'>
        <a
          href='https://www.notion.so/116df216216d478d9ab909e53d6475a9?pvs=4'
          target='_blank'
        >
          プライバシーポリシー
        </a>
      </Button>
      <Button asChild variant='link'>
        <a
          href='https://brash-ferry-996.notion.site/7e76538f95c642c7b3ce1292b5ba0ff6'
          target='_blank'
        >
          特定商取引法に基づく表記
        </a>
      </Button>
    </footer>
  )
}
