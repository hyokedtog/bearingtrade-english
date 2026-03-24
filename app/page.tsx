'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ═══════════════════════════════════════════════════════════
//  海浪声合成（Ocean Waves）
// ═══════════════════════════════════════════════════════════
function playVoyageSound() {
  if (typeof window === 'undefined') return

  const AudioContext = window.AudioContext || (window as any).webkitAudioContext
  if (!AudioContext) return

  const ctx = new AudioContext()

  // 创建白噪声 buffer（4秒海浪声）
  const bufferSize = ctx.sampleRate * 4
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const output = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1
  }

  const noise = ctx.createBufferSource()
  noise.buffer = noiseBuffer

  // 低通滤波器 - 柔和的浪潮感
  const waveFilter = ctx.createBiquadFilter()
  waveFilter.type = 'lowpass'
  waveFilter.frequency.setValueAtTime(250, ctx.currentTime)
  waveFilter.Q.value = 0.5

  // 音量包络 - 模拟海浪起伏
  const waveGain = ctx.createGain()
  waveGain.gain.setValueAtTime(0, ctx.currentTime)
  waveGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.0)
  waveGain.gain.setValueAtTime(0.12, ctx.currentTime + 2.0)
  waveGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4)

  noise.connect(waveFilter)
  waveFilter.connect(waveGain)
  waveGain.connect(ctx.destination)

  noise.start(ctx.currentTime)
  noise.stop(ctx.currentTime + 4)
}

// ═══════════════════════════════════════════════════════════
//  海浪扩散动画组件
// ═══════════════════════════════════════════════════════════
function WaveRipple({ active, onComplete }: { active: boolean; onComplete?: () => void }) {
  const [rings, setRings] = useState<number[]>([])

  useEffect(() => {
    if (!active) {
      setRings([])
      return
    }

    let id = 0
    const interval = setInterval(() => {
      id += 1
      setRings((prev) => [...prev.slice(-4), id])
    }, 200)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      onComplete?.()
    }, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [active, onComplete])

  if (!active && rings.length === 0) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {rings.map((ring, i) => (
        <div
          key={ring}
          className="absolute rounded-full border-2 border-cyan-400/60"
          style={{
            width: '100px',
            height: '100px',
            animation: `waveExpand 2s ease-out forwards`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes waveExpand {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(6); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  罗盘旋转动画组件
// ═══════════════════════════════════════════════════════════
function CompassSpin({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="w-64 h-64 opacity-30"
        style={{
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(6, 182, 212, 0.3) 30deg,
            transparent 60deg,
            transparent 120deg,
            rgba(6, 182, 212, 0.3) 150deg,
            transparent 180deg,
            transparent 240deg,
            rgba(6, 182, 212, 0.3) 270deg,
            transparent 300deg,
            transparent 360deg
          )`,
          borderRadius: '50%',
          animation: 'compassSpin 1.5s linear infinite',
        }}
      />
      <style jsx>{`
        @keyframes compassSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  船锚图标 SVG
// ═══════════════════════════════════════════════════════════
function AnchorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 锚链环 */}
      <circle cx="24" cy="6" r="3" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="9" x2="24" y2="16" stroke="currentColor" strokeWidth="2" />

      {/* 锚杆 */}
      <line x1="24" y1="14" x2="24" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

      {/* 锚臂横杆 */}
      <line x1="14" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* 左锚爪 */}
      <path
        d="M24 38 C18 38, 10 34, 8 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 26 L6 30 M8 26 L12 27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 右锚爪 */}
      <path
        d="M24 38 C30 38, 38 34, 40 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M40 26 L42 30 M40 26 L36 27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════
//  舵轮图标 SVG
// ═══════════════════════════════════════════════════════════
function HelmIcon({ className, spinning }: { className?: string; spinning?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={spinning ? { animation: 'helmSpin 1s linear infinite' } : undefined}
    >
      {/* 外圈 */}
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" />

      {/* 内圈 */}
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />

      {/* 中心 */}
      <circle cx="32" cy="32" r="6" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />

      {/* 8根辐条 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 32 32)`}>
          <line x1="32" y1="4" x2="32" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="4" r="3" fill="currentColor" />
        </g>
      ))}

      <style jsx>{`
        @keyframes helmSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════
//  启航按钮组件
// ═══════════════════════════════════════════════════════════
function VoyageButton() {
  const router = useRouter()
  const [isLaunching, setIsLaunching] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const handleLaunch = useCallback(() => {
    if (isLaunching) return
    setIsLaunching(true)
    playVoyageSound() // 播放游轮起航音效（船鸣 + 海浪）

    // 2.5秒后跳转
    setTimeout(() => {
      setRedirecting(true)
      router.push('/courses')
    }, 2500)
  }, [isLaunching])

  return (
    <div className="relative flex flex-col items-center">
      {/* 波浪动画背景 */}
      <WaveRipple active={isLaunching} />
      <CompassSpin active={isLaunching} />

      {/* 主按钮 */}
      <button
        onClick={handleLaunch}
        disabled={isLaunching}
        className={`
          relative group flex flex-col items-center justify-center
          w-48 h-48 md:w-56 md:h-56 rounded-full
          transition-all duration-500 ease-out
          ${isLaunching
            ? 'scale-110 bg-gradient-to-br from-cyan-600 to-blue-700 shadow-2xl shadow-cyan-500/50'
            : 'bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-xl shadow-blue-900/40 hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105'
          }
        `}
      >
        {/* 按钮内圈装饰 */}
        <div className="absolute inset-3 rounded-full border-2 border-white/20" />
        <div className="absolute inset-6 rounded-full border border-white/10" />

        {/* 舵轮图标 */}
        <HelmIcon
          className={`w-20 h-20 md:w-24 md:h-24 text-white transition-transform duration-1000 ${
            isLaunching ? 'animate-spin' : 'group-hover:rotate-45'
          }`}
          spinning={isLaunching}
        />

        {/* 按钮文字 */}
        <span className="mt-3 text-white font-bold text-lg md:text-xl tracking-widest">
          {isLaunching ? '启航中...' : '点击启航'}
        </span>

        {/* 底部装饰线 */}
        <div className="absolute bottom-8 w-16 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </button>

      {/* 按钮下方说明 */}
      <div className={`mt-8 text-center transition-opacity duration-500 ${isLaunching ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-cyan-300/80 text-sm tracking-wider">开启你的轴承外贸远航之旅</p>
        <p className="text-slate-500 text-xs mt-1">Navigate · Trade · Conquer Global Markets</p>
      </div>

      {/* 跳转提示 */}
      {redirecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-cyan-300 text-lg font-medium">正在进入航线图...</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  航海图背景纹理
// ═══════════════════════════════════════════════════════════
function NauticalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 基础深蓝渐变 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #040e1f 0%, #061428 30%, #08152a 70%, #0a1a35 100%)',
        }}
      />

      {/* 航海图网格纹理 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 200, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 200, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* 航海图罗盘玫瑰装饰 - 左上 */}
      <div className="absolute -left-20 -top-20 w-80 h-80 opacity-[0.04]">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="100"
              y1="10"
              x2="100"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* 航海图罗盘玫瑰装饰 - 右下 */}
      <div className="absolute -right-32 -bottom-32 w-96 h-96 opacity-[0.03] text-cyan-300">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="100"
              y1="10"
              x2="100"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* 波浪线条装饰 */}
      <svg
        className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.08]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
          className="text-cyan-400"
        />
        <path
          d="M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z"
          fill="currentColor"
          className="text-blue-400"
          opacity="0.5"
        />
      </svg>

      {/* 光晕效果 */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)' }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  顶部导航
// ═══════════════════════════════════════════════════════════
function TopNav() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/5">
      <div className="flex items-center gap-3">
        <AnchorIcon className="w-8 h-8 text-cyan-400" />
        <div>
          <h1 className="text-white font-bold text-lg tracking-wide">BearingTrade</h1>
          <p className="text-cyan-400/60 text-[10px] tracking-widest uppercase">远洋出海实战平台</p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <Link href="/courses" className="text-slate-400 hover:text-cyan-300 transition-colors">
          航线图
        </Link>
        <Link href="/dialogue" className="text-slate-400 hover:text-cyan-300 transition-colors">
          对话训练
        </Link>
        <Link href="/quiz" className="text-slate-400 hover:text-cyan-300 transition-colors">
          实战测试
        </Link>
      </div>
    </nav>
  )
}

// ═══════════════════════════════════════════════════════════
//  页脚组件
// ═══════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AnchorIcon className="w-6 h-6 text-cyan-400" />
              <span className="text-white font-bold">BearingTrade</span>
            </div>
            <p className="text-slate-500 text-sm">
              专为轴承外贸人打造的英语实战平台
              <br />
              从询盘到成交，助力企业出海远航
            </p>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-cyan-400 font-medium mb-3 text-sm tracking-wider">联系我们</h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400">
                <span className="text-slate-500">电话：</span>
                <a href="tel:15530341004" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                  15530341004
                </a>
              </p>
              <p className="text-slate-400">
                <span className="text-slate-500">地址：</span>
                <span className="text-slate-300">盘庄大灯北300米路东</span>
              </p>
            </div>
          </div>

          {/* 快捷链接 */}
          <div>
            <h3 className="text-cyan-400 font-medium mb-3 text-sm tracking-wider">快速导航</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/courses" className="text-slate-400 hover:text-cyan-300 transition-colors">
                航线图
              </Link>
              <Link href="/dialogue" className="text-slate-400 hover:text-cyan-300 transition-colors">
                对话训练
              </Link>
              <Link href="/quiz" className="text-slate-400 hover:text-cyan-300 transition-colors">
                实战测试
              </Link>
            </div>
          </div>
        </div>

        {/* 版权 */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-slate-600 text-xs">
          <p>© 2024 BearingTrade 远洋出海实战平台 · 助力中国轴承企业走向世界</p>
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════
//  主页面
// ═══════════════════════════════════════════════════════════
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 航海图背景 */}
      <NauticalBackground />

      {/* 顶部导航 */}
      <TopNav />

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-16">
        {/* 标语 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs tracking-widest uppercase">Global Trade Voyage</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            轴承企业
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              出海实战平台
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            从询盘到成交，掌握轴承外贸全场景英语
            <br />
            <span className="text-cyan-400/80">开启你的全球贸易远航</span>
          </p>
        </div>

        {/* 启航按钮 */}
        <VoyageButton />

        {/* 三大航线预览 */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-4xl w-full">
          {[
            {
              port: '港口 1',
              title: '规格基础',
              desc: 'Bore · OD · Width',
              color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
            },
            {
              port: '港口 2',
              title: '技术精修',
              desc: 'Clearance C3 · Precision P6',
              color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
            },
            {
              port: '港口 3',
              title: '实战成交',
              desc: '真实询盘 · 长文阅读',
              color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-5 rounded-xl border bg-gradient-to-br ${item.color} backdrop-blur-sm`}
            >
              <div className="text-xs text-slate-500 mb-1">{item.port}</div>
              <div className="text-white font-semibold mb-1">{item.title}</div>
              <div className="text-slate-400 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  )
}
