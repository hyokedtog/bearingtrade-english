'use client'

import { useState, useCallback } from 'react'
import { Volume2, Lock, CheckCircle, Anchor, BookOpen, X, ChevronRight } from 'lucide-react'

// ═══════════════════════════════════════════════════════════
//  TTS 工具函数（1.0x 正常商务语速）
// ═══════════════════════════════════════════════════════════
function speak(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined') return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.rate = 1.0
  u.lang = 'en-US'
  if (onEnd) u.onend = onEnd
  window.speechSynthesis.speak(u)
}

// ═══════════════════════════════════════════════════════════
//  港口数据结构
// ═══════════════════════════════════════════════════════════
interface Port {
  id: number
  name: string
  titleEn: string
  description: string
  topics: string[]
  locked: boolean
  completed: boolean
  color: string
}

const PORTS: Port[] = [
  {
    id: 1,
    name: '规格基础港',
    titleEn: 'Port of Specifications',
    description: '掌握轴承核心规格参数的英文表达',
    topics: ['Bore Diameter (ID)', 'Outer Diameter (OD)', 'Width', 'Dynamic Load Rating (Cr)'],
    locked: false,
    completed: true,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    name: '技术精修港',
    titleEn: 'Port of Technical Precision',
    description: '深入理解游隙、精度等级等技术术语',
    topics: ['Internal Clearance C3', 'Precision Grade P6', 'Tolerance', 'Seal Types 2RS/ZZ'],
    locked: false,
    completed: false,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 3,
    name: '实战成交港',
    titleEn: 'Port of Real Combat',
    description: '真实询盘阅读与回复训练',
    topics: ['Inquiry Analysis', 'Long-form Reading', 'Response Writing', 'Price Negotiation'],
    locked: true,
    completed: false,
    color: 'from-amber-500 to-orange-600',
  },
]

// ═══════════════════════════════════════════════════════════
//  示例阅读材料（占位，等待用户提供真实素材）
// ═══════════════════════════════════════════════════════════
const SAMPLE_READING = {
  title: 'Bearing Inquiry from Germany',
  content: `Dear Sir/Madam,

We are a leading manufacturer of industrial machinery based in Hamburg, Germany. We are currently sourcing deep groove ball bearings for our new production line.

Requirements:
- Type: Deep Groove Ball Bearing
- Model: 6204-2RS
- Quantity: 5,000 pcs
- Quality Grade: P6 (ABEC-3)
- Clearance: C3
- Brand: SKF or equivalent quality

Please provide your best FOB price, lead time, and MOQ. We require a Certificate of Conformance with each shipment.

Looking forward to your quotation.

Best regards,
Hans Mueller
Procurement Manager
Industrial Solutions GmbH`,
  translation: `尊敬的先生/女士，

我们是总部位于德国汉堡的领先工业机械制造商。目前正在为新生产线采购深沟球轴承。

需求规格：
- 类型：深沟球轴承
- 型号：6204-2RS
- 数量：5,000件
- 质量等级：P6 (ABEC-3)
- 游隙：C3
- 品牌：SKF或同等质量

请提供最优FOB价格、交货期和最小订购量。我们要求每批货物附带合格证。

期待您的报价。

此致
汉斯·穆勒
采购经理
工业解决方案有限公司`,
}

// ═══════════════════════════════════════════════════════════
//  朗读按钮
// ═══════════════════════════════════════════════════════════
function SpeakButton({ text, label = '朗读', className = '' }: { text: string; label?: string; className?: string }) {
  const [playing, setPlaying] = useState(false)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setPlaying(true)
    speak(text, () => setPlaying(false))
  }, [text])

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
        transition-all duration-200
        ${playing
          ? 'bg-cyan-500/30 text-cyan-300'
          : 'bg-slate-700/50 text-slate-300 hover:bg-cyan-600/30 hover:text-cyan-300'
        }
        ${className}
      `}
    >
      <Volume2 className={`w-3.5 h-3.5 ${playing ? 'animate-pulse' : ''}`} />
      {playing ? '朗读中...' : label}
    </button>
  )
}

// ═══════════════════════════════════════════════════════════
//  学习卡片弹窗
// ═══════════════════════════════════════════════════════════
function LearningCard({ port, onClose }: { port: Port; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'vocab' | 'reading'>('vocab')

  if (!port) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* 头部 */}
        <div className={`p-6 bg-gradient-to-r ${port.color}`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/20 hover:bg-black/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <Anchor className="w-6 h-6 text-white" />
            <span className="text-white/80 text-sm tracking-wider">PORT {port.id}</span>
          </div>

          <h2 className="text-2xl font-bold text-white">{port.name}</h2>
          <p className="text-white/80 text-sm">{port.titleEn}</p>
        </div>

        {/* 标签切换 */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'vocab'
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-800/50'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            核心词汇
          </button>
          {port.id === 3 && (
            <button
              onClick={() => setActiveTab('reading')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'reading'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-800/50'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                长文阅读
              </span>
            </button>
          )}
        </div>

        {/* 内容区 */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'vocab' ? (
            <div className="space-y-4">
              <p className="text-slate-400 text-sm mb-4">{port.description}</p>

              <div className="space-y-3">
                {port.topics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-cyan-500/30 transition-colors"
                  >
                    <div>
                      <div className="text-white font-medium">{topic}</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {i === 0 && '轴承核心规格'}
                        {i === 1 && '尺寸参数'}
                        {i === 2 && '结构参数'}
                        {i === 3 && '载荷能力'}
                      </div>
                    </div>
                    <SpeakButton text={topic.split('(')[0].trim()} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* 长文阅读器 */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">{SAMPLE_READING.title}</h3>
                <SpeakButton text={SAMPLE_READING.content} label="朗读全文" />
              </div>

              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                  {SAMPLE_READING.content}
                </pre>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h4 className="text-cyan-400 text-xs font-medium mb-2 tracking-wider">参考译文</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {SAMPLE_READING.translation}
                </p>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-amber-300 text-sm">
                  <span className="font-medium">💡 学习提示：</span>
                  这是一份典型的德国客户询盘，注意学习专业术语如 Certificate of Conformance (合格证)、lead time (交货期) 等。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 底部操作 */}
        <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-between items-center">
          <span className="text-slate-500 text-xs">
            {port.completed ? '✓ 已完成' : port.locked ? '🔒 需先完成前一港口' : '⏳ 进行中'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            继续航行
          </button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  港口节点组件
// ═══════════════════════════════════════════════════════════
function PortNode({
  port,
  isLast,
  onClick,
}: {
  port: Port
  isLast: boolean
  onClick: () => void
}) {
  return (
    <div className="relative flex items-start gap-6">
      {/* 左侧时间线 */}
      <div className="flex flex-col items-center">
        {/* 节点圆圈 */}
        <button
          onClick={onClick}
          disabled={port.locked}
          className={`
            relative z-10 w-16 h-16 rounded-full flex items-center justify-center
            transition-all duration-300
            ${port.locked
              ? 'bg-slate-800 border-2 border-slate-600 cursor-not-allowed'
              : port.completed
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-emerald-400 shadow-lg shadow-emerald-500/30 hover:scale-110 cursor-pointer'
                : 'bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 hover:scale-110 cursor-pointer'
            }
          `}
        >
          {port.locked ? (
            <Lock className="w-6 h-6 text-slate-500" />
          ) : port.completed ? (
            <CheckCircle className="w-7 h-7 text-white" />
          ) : (
            <Anchor className="w-7 h-7 text-white" />
          )}

          {/* 脉冲动画 - 当前港口 */}
          {!port.locked && !port.completed && (
            <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400/30" />
          )}
        </button>

        {/* 连接线 */}
        {!isLast && (
          <div
            className={`w-0.5 h-24 mt-2 ${
              port.completed ? 'bg-gradient-to-b from-emerald-500 to-emerald-500/30' : 'bg-slate-700'
            }`}
          />
        )}
      </div>

      {/* 右侧内容卡片 */}
      <div
        onClick={onClick}
        className={`
          flex-1 p-5 rounded-xl border transition-all duration-300
          ${port.locked
            ? 'bg-slate-800/50 border-slate-700 opacity-60 cursor-not-allowed'
            : 'bg-slate-800 border-slate-700 hover:border-cyan-500/50 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10'
          }
        `}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className={`text-xs font-medium tracking-wider ${
              port.locked ? 'text-slate-500' : 'text-cyan-400'
            }`}>
              PORT {port.id}
            </span>
            <h3 className={`text-lg font-bold mt-0.5 ${port.locked ? 'text-slate-500' : 'text-white'}`}>
              {port.name}
            </h3>
            <p className="text-slate-500 text-xs">{port.titleEn}</p>
          </div>

          {!port.locked && (
            <ChevronRight className={`w-5 h-5 ${port.completed ? 'text-emerald-400' : 'text-cyan-400'}`} />
          )}
        </div>

        <p className={`text-sm mb-3 ${port.locked ? 'text-slate-600' : 'text-slate-400'}`}>
          {port.description}
        </p>

        {/* 主题标签 */}
        <div className="flex flex-wrap gap-2">
          {port.topics.slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded text-xs ${
                port.locked
                  ? 'bg-slate-800 text-slate-600'
                  : 'bg-slate-700/50 text-slate-400'
              }`}
            >
              {topic.split('(')[0].trim()}
            </span>
          ))}
          {port.topics.length > 3 && (
            <span className={`px-2 py-1 rounded text-xs ${port.locked ? 'text-slate-600' : 'text-slate-500'}`}>
              +{port.topics.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  背景组件
// ═══════════════════════════════════════════════════════════
function VoyageBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 深蓝渐变背景 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #040e1f 0%, #061428 50%, #08152a 100%)',
        }}
      />

      {/* 航海图网格 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 200, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 200, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 航线装饰 - 虚线 */}
      <svg
        className="absolute left-[2.25rem] top-24 w-1 h-[calc(100%-12rem)] opacity-20"
        preserveAspectRatio="none"
      >
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100%"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 8"
          className="text-cyan-400"
        />
      </svg>

      {/* 光晕 */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent 70%)' }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  主页面
// ═══════════════════════════════════════════════════════════
export default function CoursesPage() {
  const [selectedPort, setSelectedPort] = useState<Port | null>(null)

  return (
    <div className="min-h-screen relative">
      <VoyageBackground />

      {/* 顶部导航 */}
      <header className="relative z-10 border-b border-white/5 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Anchor className="w-7 h-7 text-cyan-400" />
            <div>
              <h1 className="text-white font-bold">远洋航线图</h1>
              <p className="text-slate-500 text-xs">Voyage Route Map</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-400">进度</span>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-emerald-500 to-teal-500" />
            </div>
            <span className="text-cyan-400 font-medium">1/3</span>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* 航线说明 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs tracking-wider">航行路线</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">你的出海学习航线</h2>
          <p className="text-slate-400 text-sm">
            按顺序完成三大港口，掌握轴承外贸全流程英语
          </p>
        </div>

        {/* 港口节点列表 */}
        <div className="space-y-0">
          {PORTS.map((port, index) => (
            <PortNode
              key={port.id}
              port={port}
              isLast={index === PORTS.length - 1}
              onClick={() => !port.locked && setSelectedPort(port)}
            />
          ))}
        </div>

        {/* 终点标志 */}
        <div className="flex items-center gap-6 mt-8 opacity-50">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center">
            <span className="text-2xl">🏆</span>
          </div>
          <div>
            <div className="text-slate-500 text-xs tracking-wider">DESTINATION</div>
            <div className="text-slate-400 font-medium">外贸专家认证</div>
          </div>
        </div>
      </main>

      {/* 学习卡片弹窗 */}
      {selectedPort && (
        <LearningCard port={selectedPort} onClose={() => setSelectedPort(null)} />
      )}
    </div>
  )
}
