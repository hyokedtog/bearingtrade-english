'use client'

import Link from 'next/link'
import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const stats = [
  { label: '专业课程', value: '50+', icon: BookOpen },
  { label: '实战场景', value: '200+', icon: Users },
  { label: '认证学员', value: '1000+', icon: Award },
]

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-medium text-blue-200">轴承外贸行业专属</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              掌握
              <span className="text-blue-400">专业外贸英语</span>
              <br />
              成就轴承出口业务
            </h1>

            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              垂直于轴承外贸行业的英语学习平台，涵盖产品规格确认、工厂验货、
              价格谈判等专业场景，以及海外客户接待、展会餐饮等生活化对话。
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/course">
                <Button size="lg" className="gap-2">
                  开始学习
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dialogue">
                <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10">
                  <Play className="h-5 w-5" />
                  试听对话
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                    <stat.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:block relative">
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              {/* Dialogue Preview Card */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
                    <span className="text-lg font-bold">客</span>
                  </div>
                  <div>
                    <div className="font-semibold">客户询盘场景</div>
                    <div className="text-sm text-slate-400">Bearing Inquiry</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-orange-500/20 rounded-lg p-4 rounded-tl-sm ml-8">
                    <p className="text-sm text-orange-200">
                      "Hi, I&apos;m looking for deep groove ball bearings, 6204 series. Can you provide specifications?"
                    </p>
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-4 rounded-tr-sm mr-8">
                    <p className="text-sm text-blue-200">
                      "Certainly! Our 6204 bearings have 20mm bore, 47mm OD, and 14mm width. Cr load rating is 12.8kN."
                    </p>
                  </div>
                  <div className="bg-orange-500/20 rounded-lg p-4 rounded-tl-sm ml-8">
                    <p className="text-sm text-orange-200">
                      "What about the seal type and cage material?"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-blue-500/20 text-xs text-blue-300">轴承规格</span>
                    <span className="px-2 py-1 rounded bg-orange-500/20 text-xs text-orange-300">询盘对话</span>
                  </div>
                  <Play className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="text-sm font-semibold">实时更新</div>
              <div className="text-xs opacity-90">行业最新用语</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  )
}
