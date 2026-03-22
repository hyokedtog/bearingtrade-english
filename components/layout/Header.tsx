'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: '首页', href: '/' },
  { label: '课程', href: '/course' },
  { label: '对话练习', href: '/dialogue' },
  { label: '测验', href: '/quiz' },
  { label: '视频', href: '/video' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#0052D4] shadow-sm shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-slate-900 tracking-tight">
                BearingTrade
                <span className="text-[#0052D4] ml-1">English</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-widest uppercase mt-0.5">
                轴承外贸英语
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'text-[#0052D4] bg-[#EEF4FF]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#0052D4] rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>免费学习</span>
            </div>
            <Link
              href="/course"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0052D4] hover:bg-[#003DA8] rounded-lg shadow-sm shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:-translate-y-px"
            >
              开始学习
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 py-3 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'text-[#0052D4] bg-[#EEF4FF]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-2 px-0 mt-1 border-t border-slate-100">
                <Link
                  href="/course"
                  className="flex w-full items-center justify-center py-2.5 text-sm font-semibold text-white bg-[#0052D4] hover:bg-[#003DA8] rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  开始学习
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
