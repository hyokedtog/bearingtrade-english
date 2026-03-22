import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BearingTrade English — 轴承外贸英语学习平台',
  description: '垂直于轴承外贸行业的专业英语学习平台，涵盖产品规格确认、工厂验货、价格谈判等专业场景。',
  keywords: '轴承, 外贸英语, 专业英语, bearing, 6204, industrial English',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={sora.variable}>
      <body className={`${sora.className} antialiased`}>
        <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
