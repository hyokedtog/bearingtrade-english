'use client'

import Link from 'next/link'
import { ArrowRight, Play, Award, Users, BookOpen, TrendingUp } from 'lucide-react'

const stats = [
  { label: '专业课程', value: '50+', icon: BookOpen, color: 'text-blue-400' },
  { label: '实战场景', value: '200+', icon: Users, color: 'text-sky-400' },
  { label: '认证学员', value: '1,000+', icon: Award, color: 'text-indigo-400' },
  { label: '行业覆盖', value: '轴承全品类', icon: TrendingUp, color: 'text-cyan-400' },
]

export function HeroSection() {
  return (
    <section className="relative bg-[#0B1120] text-white overflow-hidden">
      {/* Precision grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,82,212,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,82,212,1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0052D4] rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="space-y-8 animate-fade-up">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
              <span className="text-xs font-semibold text-blue-300 tracking-widest uppercase">
                轴承外贸行业专属
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">
                掌握专业
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-[#60A5FA] to-[#0052D4]">
                  外贸英语
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl font-light text-slate-400 mt-2">
                成就轴承出口业务
              </p>
            </div>

            <p className="text-base text-slate-400 max-w-lg leading-relaxed">
              垂直于轴承外贸行业的英语学习平台，涵盖产品规格确认、
              工厂验货、价格谈判等专业场景，以及海外客户接待、展会餐饮等生活化对话。
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/course"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0052D4] hover:bg-[#003DA8] rounded-lg shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-0.5"
              >
                开始学习
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dialogue"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-300 border border-slate-600 hover:border-slate-400 hover:text-white rounded-lg transition-all hover:-translate-y-0.5"
              >
                <Play className="h-4 w-4" />
                试听对话
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Interactive Dialogue Preview ── */}
          <div className="hidden lg:block animate-fade-up delay-200">
            <div className="relative">
              {/* Card frame */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400/70" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                      <span className="w-3 h-3 rounded-full bg-green-400/70" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">bearing_inquiry.en</span>
                  </div>
                  <span className="bt-label">实时对话练习</span>
                </div>

                {/* Dialogue lines */}
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                      <span className="text-xs text-orange-400 font-bold">C</span>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-slate-200 max-w-[85%]">
                      I&apos;m looking for deep groove ball bearings,{' '}
                      <span className="font-mono text-orange-300">6204</span> series. Can you send me the technical specs?
                    </div>
                  </div>

                  <div className="flex gap-3 items-start justify-end">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl rounded-tr-sm px-4 py-2.5 text-sm text-slate-200 max-w-[85%]">
                      Of course! Bore{' '}
                      <span className="font-mono text-blue-300">20mm</span>, OD{' '}
                      <span className="font-mono text-blue-300">47mm</span>, width{' '}
                      <span className="font-mono text-blue-300">14mm</span>. Cr rating{' '}
                      <span className="font-mono text-blue-300">12.8kN</span>.
                    </div>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                      <span className="text-xs text-blue-400 font-bold">S</span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                      <span className="text-xs text-orange-400 font-bold">C</span>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-slate-200 max-w-[85%]">
                      Do you offer <span className="font-mono text-orange-300">2RS</span> seal type?
                      We need it for a dusty environment.
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-300 font-mono">6204-2RS</span>
                    <span className="px-2 py-1 text-xs rounded bg-slate-500/20 text-slate-400">询盘对话</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    0.85x 语速
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-[#00B37E] text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold">
                点击句子即可朗读
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7F9FC] to-transparent" />
    </section>
  )
}
