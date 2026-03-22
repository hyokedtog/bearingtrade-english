'use client'

import { useState, useCallback, useRef } from 'react'
import { CheckCircle, Volume2, RotateCcw, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface VocabWord {
  id: string
  term: string
  phonetic: string
  partOfSpeech: string
  chinese: string
  definition: string
  example: string
  exampleChinese: string
  category: 'dimension' | 'load' | 'trade' | 'quality' | 'material'
}

const VOCAB_WORDS: VocabWord[] = [
  {
    id: 'bore',
    term: 'Bore',
    phonetic: '/bɔːr/',
    partOfSpeech: 'n.',
    chinese: '内径',
    definition: 'The inner diameter of a bearing — the hole through which the shaft passes.',
    example: 'The 6204 bearing has a bore of 20mm.',
    exampleChinese: '6204轴承的内径为20mm。',
    category: 'dimension',
  },
  {
    id: 'od',
    term: 'OD (Outer Diameter)',
    phonetic: '/ˈaʊtər daɪˈæmɪtər/',
    partOfSpeech: 'n.',
    chinese: '外径',
    definition: 'The outside diameter of the bearing outer ring.',
    example: 'Our 6204 has an OD of 47mm, fitting standard housings.',
    exampleChinese: '我们的6204外径为47mm，适配标准轴承座。',
    category: 'dimension',
  },
  {
    id: 'clearance',
    term: 'Clearance',
    phonetic: '/ˈklɪərəns/',
    partOfSpeech: 'n.',
    chinese: '游隙',
    definition: 'The total distance through which one ring can be moved relative to the other in the radial or axial direction.',
    example: 'C3 clearance is recommended for high-temperature applications.',
    exampleChinese: 'C3游隙推荐用于高温工况。',
    category: 'quality',
  },
  {
    id: 'tolerance',
    term: 'Tolerance',
    phonetic: '/ˈtɒlərəns/',
    partOfSpeech: 'n.',
    chinese: '公差',
    definition: 'The allowable deviation from a nominal dimension, defining precision grade.',
    example: 'P5 grade tolerance is required for machine tool spindles.',
    exampleChinese: '机床主轴需要P5级公差。',
    category: 'quality',
  },
  {
    id: 'cr',
    term: 'Dynamic Load Rating (Cr)',
    phonetic: '/daɪˈnæmɪk loʊd ˈreɪtɪŋ/',
    partOfSpeech: 'n.',
    chinese: '动载荷额定值',
    definition: 'The constant radial load under which a bearing can theoretically endure one million revolutions.',
    example: 'The Cr for this bearing is 12.8kN.',
    exampleChinese: '该轴承的Cr为12.8kN。',
    category: 'load',
  },
  {
    id: 'cor',
    term: 'Static Load Rating (Cor)',
    phonetic: '/ˈstætɪk loʊd ˈreɪtɪŋ/',
    partOfSpeech: 'n.',
    chinese: '静载荷额定值',
    definition: 'Maximum static load a bearing can withstand without permanent deformation.',
    example: 'Cor is 6.65kN for the standard 6204 bearing.',
    exampleChinese: '标准6204的Cor为6.65kN。',
    category: 'load',
  },
  {
    id: 'moq',
    term: 'MOQ',
    phonetic: '/ˌmɪnɪməm ˈɔːdər ˈkwɒntɪti/',
    partOfSpeech: 'abbr.',
    chinese: '最小订购量',
    definition: 'Minimum Order Quantity — the smallest quantity a supplier will accept per order.',
    example: 'Our MOQ for standard bearings is 100 pieces.',
    exampleChinese: '标准轴承的最小订购量为100件。',
    category: 'trade',
  },
  {
    id: 'leadtime',
    term: 'Lead Time',
    phonetic: '/liːd taɪm/',
    partOfSpeech: 'n.',
    chinese: '交货期',
    definition: 'The time from order confirmation to shipment readiness.',
    example: 'Standard lead time is 15 business days from order confirmation.',
    exampleChinese: '标准交货期为确认订单后15个工作日。',
    category: 'trade',
  },
]

const CATEGORY_COLORS: Record<VocabWord['category'], { bg: string; text: string; label: string }> = {
  dimension: { bg: 'bg-blue-50', text: 'text-blue-600', label: '尺寸' },
  load:      { bg: 'bg-purple-50', text: 'text-purple-600', label: '载荷' },
  trade:     { bg: 'bg-amber-50', text: 'text-amber-600', label: '贸易' },
  quality:   { bg: 'bg-emerald-50', text: 'text-emerald-600', label: '品质' },
  material:  { bg: 'bg-rose-50', text: 'text-rose-600', label: '材料' },
}

function useTTS() {
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const speak = useCallback((text: string, id: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    if (speakingId === id) { setSpeakingId(null); return }
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.85
    utter.lang = 'en-US'
    utter.onstart = () => setSpeakingId(id)
    utter.onend = () => setSpeakingId(null)
    utter.onerror = () => setSpeakingId(null)
    window.speechSynthesis.speak(utter)
  }, [speakingId])
  return { speak, speakingId }
}

export function VocabDrillSection() {
  const { speak, speakingId } = useTTS()
  const [mastered, setMastered] = useState<Set<string>>(new Set())
  const [flipped, setFlipped] = useState<Set<string>>(new Set())

  const toggleMastered = (id: string) => {
    setMastered((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleFlip = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const resetAll = () => {
    setMastered(new Set())
    setFlipped(new Set())
  }

  const masteredCount = mastered.size
  const total = VOCAB_WORDS.length
  const progress = Math.round((masteredCount / total) * 100)

  return (
    <section className="py-20 bg-[#F7F9FC] bt-grid-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="bt-label mb-3">今日单词打卡</p>
            <h2 className="text-3xl font-bold text-slate-900">
              核心词汇 · 今日 {total} 词
            </h2>
            <p className="mt-2 text-slate-500 text-sm">
              点击卡片查看例句，点击
              <span className="mx-1 inline-flex items-center gap-1 text-[#00B37E] font-medium">
                <CheckCircle className="h-3.5 w-3.5" />已掌握
              </span>
              标记完成
            </p>
          </div>

          {/* Progress + Reset */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                {masteredCount}
                <span className="text-slate-400 text-base font-normal">/{total}</span>
              </div>
              <div className="text-xs text-slate-400">已掌握</div>
            </div>

            <div className="w-20 h-20 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E2E8F2" strokeWidth="2.5" />
                <circle
                  cx="18" cy="18" r="15.5"
                  fill="none"
                  stroke={progress === 100 ? '#00B37E' : '#0052D4'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 0.974} 97.4`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-700">{progress}%</span>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
              title="重置进度"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Vocab Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VOCAB_WORDS.map((word, index) => {
            const isMastered = mastered.has(word.id)
            const isFlipped = flipped.has(word.id)
            const isSpeaking = speakingId === word.id
            const cat = CATEGORY_COLORS[word.category]

            return (
              <div
                key={word.id}
                className={cn(
                  'bt-vocab-card group relative flex flex-col gap-3 select-none animate-fade-up',
                  isMastered && 'mastered opacity-70'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider', cat.bg, cat.text)}>
                    {cat.label}
                  </span>
                  {isMastered && <Zap className="h-3.5 w-3.5 text-[#00B37E]" />}
                </div>

                {/* Term */}
                <div
                  className="cursor-pointer"
                  onClick={() => toggleFlip(word.id)}
                >
                  <div className="font-bold text-slate-900 text-lg leading-tight">{word.term}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400 font-mono">{word.phonetic}</span>
                    <span className="text-xs text-slate-400 italic">{word.partOfSpeech}</span>
                  </div>
                  <div className="text-base font-semibold text-[#0052D4] mt-1">{word.chinese}</div>
                </div>

                {/* Definition / Example toggle */}
                <div className={cn(
                  'text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-2',
                  'transition-all duration-200'
                )}>
                  {isFlipped ? (
                    <>
                      <p className="font-medium text-slate-600 mb-1">例句：</p>
                      <p className="italic text-slate-700">&ldquo;{word.example}&rdquo;</p>
                      <p className="text-slate-400 mt-1">{word.exampleChinese}</p>
                    </>
                  ) : (
                    <p>{word.definition}</p>
                  )}
                  <button
                    onClick={() => toggleFlip(word.id)}
                    className="mt-1 text-[#0052D4] hover:underline text-[10px]"
                  >
                    {isFlipped ? '← 查看释义' : '查看例句 →'}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(word.term, word.id) }}
                    className={cn(
                      'p-1.5 rounded-lg border transition-colors',
                      isSpeaking
                        ? 'text-[#0052D4] border-[#0052D4] bg-[#EEF4FF]'
                        : 'text-slate-400 border-slate-200 hover:text-slate-700'
                    )}
                    title="朗读单词"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => toggleMastered(word.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200',
                      isMastered
                        ? 'bg-[#ECFDF5] text-[#065F46] border-[#00B37E]'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-[#00B37E] hover:text-[#00B37E]'
                    )}
                  >
                    <CheckCircle className="h-3 w-3" />
                    {isMastered ? '已掌握' : '标记掌握'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* All mastered celebration */}
        {masteredCount === total && (
          <div className="mt-8 p-4 bg-[#ECFDF5] border border-[#00B37E] rounded-xl text-center animate-fade-in">
            <p className="text-[#065F46] font-semibold">
              太棒了！今日 {total} 个核心词汇全部掌握！继续学习更多对话场景吧。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
