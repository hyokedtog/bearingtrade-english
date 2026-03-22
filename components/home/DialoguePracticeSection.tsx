'use client'

import { useState, useCallback, useRef } from 'react'
import { Volume2, VolumeX, ChevronDown, ChevronUp, Lightbulb, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogueLine {
  id: number
  speaker: 'customer' | 'sales'
  text: string
  chinese: string
  vocab?: { term: string; definition: string }[]
}

const DIALOGUE: DialogueLine[] = [
  {
    id: 1,
    speaker: 'customer',
    text: "Hi, I'm looking for deep groove ball bearings, 6204 series. Can you send me the technical specifications?",
    chinese: '您好，我在寻找深沟球轴承，6204系列。能发给我技术规格书吗？',
    vocab: [
      { term: 'deep groove ball bearings', definition: '深沟球轴承 — 最常见的滚动轴承类型' },
      { term: 'technical specifications', definition: '技术规格书 / 技术参数表' },
    ],
  },
  {
    id: 2,
    speaker: 'sales',
    text: "Of course! The 6204 bearing has a bore diameter of 20mm, an outer diameter of 47mm, and a width of 14mm.",
    chinese: '当然！6204轴承内径20mm，外径47mm，宽度14mm。',
    vocab: [
      { term: 'bore diameter', definition: '内径 — 轴承内圈的内孔直径' },
      { term: 'outer diameter', definition: '外径 — 轴承外圈的外径' },
    ],
  },
  {
    id: 3,
    speaker: 'customer',
    text: "What's the dynamic load rating and maximum operating speed?",
    chinese: '动载荷额定值和最高工作转速是多少？',
    vocab: [
      { term: 'dynamic load rating (Cr)', definition: '动载荷额定值 — 轴承承受动载荷的能力指标，单位kN' },
      { term: 'operating speed', definition: '工作转速 — 轴承正常运行的转速，单位rpm' },
    ],
  },
  {
    id: 4,
    speaker: 'sales',
    text: "The dynamic load rating (Cr) is 12.8kN and static rating (Cor) is 6.65kN. Max speed with grease lubrication is 16,000 rpm.",
    chinese: '动载荷额定值（Cr）为12.8kN，静载荷额定值（Cor）为6.65kN。脂润滑最高转速16,000转/分。',
    vocab: [
      { term: 'Cr / Cor', definition: 'Cr=动载荷额定值，Cor=静载荷额定值，是选型的关键参数' },
      { term: 'grease lubrication', definition: '脂润滑 — 使用润滑脂的润滑方式' },
    ],
  },
  {
    id: 5,
    speaker: 'customer',
    text: "Do you offer the 2RS seal type? We need it for a dusty factory environment.",
    chinese: '你们有2RS密封型吗？我们的工厂环境粉尘较多。',
    vocab: [
      { term: '2RS seal', definition: '双面橡胶密封圈 — 两侧均有橡胶密封，防尘防水效果好' },
    ],
  },
  {
    id: 6,
    speaker: 'sales',
    text: "Yes! We stock the 6204-2RS with double rubber seals for excellent dust and moisture protection. It's pre-greased and maintenance-free.",
    chinese: '有！我们库存有6204-2RS，双橡胶密封圈，防尘防水效果优异，出厂预填脂，免维护。',
    vocab: [
      { term: 'pre-greased', definition: '预填脂 — 出厂时已填充润滑脂，无需额外加脂' },
      { term: 'maintenance-free', definition: '免维护 — 使用期间无需定期维护' },
    ],
  },
  {
    id: 7,
    speaker: 'customer',
    text: "What's the MOQ and lead time for an order of 500 pieces?",
    chinese: '500件的最小订购量和交货期是多少？',
    vocab: [
      { term: 'MOQ', definition: 'Minimum Order Quantity — 最小订购量' },
      { term: 'lead time', definition: '交货期 — 从下单到发货所需的时间' },
    ],
  },
  {
    id: 8,
    speaker: 'sales',
    text: "500 pieces meets our MOQ. Standard lead time is 15 days from order confirmation. We provide a certificate of conformance and material test report with every shipment.",
    chinese: '500件满足最小订购量。标准交货期为确认订单后15天。每批货随附合格证和材质检测报告。',
    vocab: [
      { term: 'certificate of conformance', definition: '合格证 / 符合性证明 — 证明产品符合规格的文件' },
      { term: 'material test report', definition: '材质检测报告 — 证明材料成分符合标准的报告' },
    ],
  },
]

function useTTS() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [speakingId, setSpeakingId] = useState<number | null>(null)

  const speak = useCallback((text: string, id: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()

    if (speakingId === id) {
      setSpeakingId(null)
      return
    }

    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.85
    utter.lang = 'en-US'
    utter.onstart = () => setSpeakingId(id)
    utter.onend = () => setSpeakingId(null)
    utter.onerror = () => setSpeakingId(null)
    utteranceRef.current = utter
    window.speechSynthesis.speak(utter)
  }, [speakingId])

  return { speak, speakingId }
}

export function DialoguePracticeSection() {
  const { speak, speakingId } = useTTS()
  const [expandedVocab, setExpandedVocab] = useState<number | null>(null)

  const toggleVocab = (id: number) => {
    setExpandedVocab(expandedVocab === id ? null : id)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">外贸场景对话练习</p>
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">
            轴承询盘标准对话
            <br />
            <span className="text-slate-400 font-normal text-2xl">Bearing Inquiry — 6204 Series</span>
          </h2>
          <p className="mt-4 text-slate-500 flex items-center gap-2">
            <Play className="h-4 w-4 text-[#0052D4]" />
            点击任意句子，以 <span className="font-mono text-sm bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">0.85×</span> 语速朗读英文原文
          </p>
        </div>

        {/* Dialogue */}
        <div className="max-w-3xl space-y-3">
          {DIALOGUE.map((line, index) => {
            const isCustomer = line.speaker === 'customer'
            const isSpeaking = speakingId === line.id
            const hasVocab = line.vocab && line.vocab.length > 0
            const isVocabOpen = expandedVocab === line.id

            return (
              <div
                key={line.id}
                className={cn('flex gap-3 animate-fade-up', isCustomer ? 'flex-row' : 'flex-row-reverse')}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    'flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold self-start mt-1',
                    isCustomer
                      ? 'bg-orange-50 border-orange-200 text-orange-600'
                      : 'bg-[#EEF4FF] border-[#DBEAFE] text-[#0052D4]'
                  )}
                >
                  {isCustomer ? '客' : '销'}
                </div>

                {/* Bubble + vocab */}
                <div className={cn('flex flex-col gap-2', isCustomer ? 'items-start' : 'items-end', 'max-w-[78%]')}>
                  {/* Speaker label */}
                  <span className="text-[11px] text-slate-400 px-1">
                    {isCustomer ? 'Customer / 客户' : 'Sales Rep / 销售'}
                  </span>

                  {/* Main bubble — clickable */}
                  <button
                    onClick={() => speak(line.text, line.id)}
                    className={cn(
                      'text-left w-full group rounded-2xl px-5 py-3.5 border transition-all duration-150',
                      isCustomer
                        ? 'rounded-tl-sm bg-orange-50 border-orange-100 hover:border-orange-300'
                        : 'rounded-tr-sm bg-[#EEF4FF] border-[#DBEAFE] hover:border-[#0052D4]',
                      isSpeaking && 'speaking-ring'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-sm text-slate-800 font-medium leading-relaxed">
                          {line.text}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{line.chinese}</p>
                      </div>
                      <div
                        className={cn(
                          'flex-shrink-0 mt-0.5 transition-colors',
                          isSpeaking
                            ? 'text-[#0052D4]'
                            : 'text-slate-300 group-hover:text-slate-500'
                        )}
                      >
                        {isSpeaking ? (
                          <Volume2 className="h-4 w-4" />
                        ) : (
                          <VolumeX className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Vocab toggle */}
                  {hasVocab && (
                    <div className="w-full">
                      <button
                        onClick={() => toggleVocab(line.id)}
                        className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-[#0052D4] transition-colors px-1"
                      >
                        <Lightbulb className="h-3 w-3" />
                        <span>{line.vocab!.length} 个重点词汇</span>
                        {isVocabOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>

                      {isVocabOpen && (
                        <div className="mt-2 space-y-1.5 animate-fade-in">
                          {line.vocab!.map((v) => (
                            <div
                              key={v.term}
                              className="flex gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-lg"
                            >
                              <span className="text-xs font-semibold text-amber-700 font-mono whitespace-nowrap">
                                {v.term}
                              </span>
                              <span className="text-xs text-slate-500">{v.definition}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer hint */}
        <div className="mt-10 max-w-3xl flex items-center justify-between border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400">
            语速 <span className="font-mono text-sm bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">0.85×</span> · 语言 <span className="font-mono text-sm bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">en-US</span> · 需要浏览器支持 Web Speech API
          </p>
          <a
            href="/dialogue"
            className="text-sm font-medium text-[#0052D4] hover:underline underline-offset-4"
          >
            查看所有对话场景 →
          </a>
        </div>
      </div>
    </section>
  )
}
