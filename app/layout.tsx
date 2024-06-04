import Footer from '@/app/footer'
import '@/app/globals.css'
import Header from '@/app/header'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['cyrillic'],
})

export const metadata: Metadata = {
  title: 'Gamepity',
  description:
    'ストリーマーと一緒にゲームが遊べる、ゲーマー向けマッチングプラットフォーム',
  verification: {
    google: 'jOCusXSflUNvldiKGj5iCAzBnht-QNlZj5no5mB0t04',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <GoogleTagManager gtmId='GTM-TK6HQMNS' />
      <GoogleAnalytics gaId='G-EN8FNP2MLW' />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className,
        )}
      >
        <Header />
        {children}
        <Toaster richColors />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  )
}
