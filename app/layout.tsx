import type { Metadata } from 'next'
import './globals.css'

// 使用系统字体栈，避免 Google Fonts 在中国被墙的问题
// System font stack for China compatibility (no Google Fonts)

export const metadata: Metadata = {
  title: 'BearingTrade 远洋出海实战平台 — 轴承外贸英语学习',
  description: '专为轴承外贸人打造的英语实战平台，从询盘到成交，助力企业出海远航。',
  keywords: '轴承, 外贸英语, 轴承出海, bearing, 6204, trade English, 远洋实战',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "PingFang SC", "Microsoft YaHei", sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
