import '@/app/globals.css'

import type { Metadata } from 'next'

import Footer from '@/app/footer'
import Header from '@/app/header'

export const metadata: Metadata = {
  title: 'Gamepity',
  description:
    'ストリーマーと一緒にゲームが遊べる、ゲーマー向けマッチングプラットフォーム',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className='min-h-dvh'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
