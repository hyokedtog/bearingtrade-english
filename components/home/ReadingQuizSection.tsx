'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, HelpCircle, RotateCcw, Trophy, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  explanationChinese: string
}

const ARTICLE = {
  title: 'Factory Inspection Report — Bearing Quality Verification',
  titleChinese: '工厂验货报告 — 轴承质量检验',
  paragraphs: [
    {
      en: 'During the factory inspection visit to our bearing manufacturer, the quality inspector examined three critical parameters: dimensional accuracy, surface finish, and noise level.',
      zh: '在对轴承生产商进行工厂验货时，质检员检查了三个关键参数：尺寸精度、表面粗糙度和噪音等级。',
    },
    {
      en: 'A coordinate measuring machine (CMM) was used to verify the bore diameter tolerance, which must fall within ±0.005mm for P5 grade bearings. Any deviation beyond this range results in immediate rejection.',
      zh: '使用三坐标测量机（CMM）验证内径公差，P5级轴承的公差范围必须在±0.005mm以内。超出此范围的轴承将立即判定为不合格品。',
    },
    {
      en: 'Surface roughness of the raceway was measured using a contact profilometer, with Ra values required not to exceed 0.2μm. Smooth raceways are essential for reducing friction and extending bearing service life.',
      zh: '使用接触式粗糙度仪测量滚道的表面粗糙度，Ra值要求不超过0.2μm。光滑的滚道对于降低摩擦和延长轴承使用寿命至关重要。',
    },
    {
      en: 'Finally, a vibration tester confirmed that all sampled bearings met ABEC-5 noise specifications. Only after passing all three inspections were the bearings approved for shipment.',
      zh: '最后，振动测试仪确认所有抽检轴承均符合ABEC-5噪音规范。只有通过全部三项检验的轴承才能获批发货。',
    },
  ],
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which instrument is used to verify bore diameter tolerance during factory inspection?',
    options: [
      'Contact profilometer',
      'Coordinate measuring machine (CMM)',
      'Vibration tester',
      'Digital vernier caliper',
    ],
    correct: 1,
    explanation: 'A CMM (Coordinate Measuring Machine) is used to precisely measure dimensional tolerances including bore diameter.',
    explanationChinese: '三坐标测量机（CMM）用于精确测量包括内径在内的尺寸公差。',
  },
  {
    id: 2,
    question: 'What is the bore diameter tolerance limit for P5 grade bearings?',
    options: [
      '±0.5mm',
      '±0.05mm',
      '±0.005mm',
      '±0.0005mm',
    ],
    correct: 2,
    explanation: 'P5 grade (ABEC-5) requires tight tolerances of ±0.005mm for bore diameter, ensuring high precision for demanding applications.',
    explanationChinese: 'P5级（ABEC-5）内径公差要求在±0.005mm以内，确保高精度应用的品质要求。',
  },
  {
    id: 3,
    question: 'Which noise/vibration standard must the bearings meet before shipment approval?',
    options: [
      'ISO 9001 certification',
      'DIN 625 standard',
      'ABEC-5 specification',
      'JIS B1516 standard',
    ],
    correct: 2,
    explanation: 'ABEC-5 (Annular Bearing Engineers Committee Grade 5) specifies the noise and vibration levels that bearings must meet for precision applications.',
    explanationChinese: 'ABEC-5是美国轴承工程师委员会5级标准，规定了精密应用中轴承的噪音和振动限值。',
  },
]

type AnswerState = Record<number, number | null>

export function ReadingQuizSection() {
  const [answers, setAnswers] = useState<AnswerState>({})
  const [submitted, setSubmitted] = useState(false)
  const [showChinese, setShowChinese] = useState(false)

  const handleAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length < QUESTIONS.length) return
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const score = submitted
    ? QUESTIONS.filter((q) => answers[q.id] === q.correct).length
    : 0

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-12">
          <p className="bt-label mb-3">听力 / 阅读练习</p>
          <h2 className="text-3xl font-bold text-slate-900">
            工厂验货场景阅读
            <br />
            <span className="text-slate-400 font-normal text-2xl">Factory Inspection Reading Quiz</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ── Article ── */}
          <div className="bt-card p-6 lg:p-8 space-y-5 sticky top-24">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-snug">{ARTICLE.title}</h3>
                {showChinese && (
                  <p className="text-sm text-slate-500 mt-1">{ARTICLE.titleChinese}</p>
                )}
              </div>
              <button
                onClick={() => setShowChinese(!showChinese)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 border border-slate-200 rounded-lg hover:border-slate-300 hover:text-slate-700 transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5" />
                {showChinese ? '隐藏中文' : '显示中文'}
              </button>
            </div>

            <div className="space-y-4">
              {ARTICLE.paragraphs.map((para, i) => (
                <div key={i} className="border-l-2 border-slate-100 pl-4">
                  <p className="text-sm text-slate-700 leading-relaxed">{para.en}</p>
                  {showChinese && (
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{para.zh}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Key terms */}
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">关键术语</p>
              <div className="flex flex-wrap gap-2">
                {['CMM', 'P5 grade', '±0.005mm', 'Ra ≤ 0.2μm', 'ABEC-5', 'Raceway'].map((t) => (
                  <span key={t} className="bt-spec">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Quiz ── */}
          <div className="space-y-6">
            {/* Score banner */}
            {submitted && (
              <div className={cn(
                'flex items-center gap-3 p-4 rounded-xl border animate-fade-in',
                score === QUESTIONS.length
                  ? 'bg-[#ECFDF5] border-[#00B37E]'
                  : score >= 2
                  ? 'bg-[#EEF4FF] border-[#0052D4]'
                  : 'bg-red-50 border-red-200'
              )}>
                <Trophy className={cn(
                  'h-8 w-8 flex-shrink-0',
                  score === QUESTIONS.length ? 'text-[#00B37E]' : score >= 2 ? 'text-[#0052D4]' : 'text-red-400'
                )} />
                <div>
                  <div className="font-bold text-slate-900">
                    得分：{score} / {QUESTIONS.length}
                    {score === QUESTIONS.length && ' · 满分！'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {score === QUESTIONS.length
                      ? '你对轴承工厂验货流程理解得很透彻！'
                      : score >= 2
                      ? '不错！重新阅读未答对的题目再巩固一下。'
                      : '建议重新仔细阅读短文后再尝试。'}
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="ml-auto p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
                  title="重新答题"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Questions */}
            {QUESTIONS.map((q, qi) => {
              const selected = answers[q.id]
              const isCorrect = submitted && selected === q.correct
              const isWrong = submitted && selected !== undefined && selected !== q.correct

              return (
                <div key={q.id} className="bt-card p-6 space-y-4">
                  {/* Question */}
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#EEF4FF] text-[#0052D4] text-xs font-bold flex items-center justify-center">
                      {qi + 1}
                    </span>
                    <p className="font-semibold text-slate-800 text-sm leading-relaxed">{q.question}</p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 pl-10">
                    {q.options.map((opt, oi) => {
                      const isSelected = selected === oi
                      const isCorrectOption = oi === q.correct

                      return (
                        <button
                          key={oi}
                          onClick={() => handleAnswer(q.id, oi)}
                          disabled={submitted}
                          className={cn(
                            'bt-quiz-option text-sm',
                            isSelected && !submitted && 'border-[#0052D4] bg-[#EEF4FF]',
                            submitted && isCorrectOption && 'correct',
                            submitted && isSelected && !isCorrectOption && 'wrong',
                            submitted && 'cursor-default'
                          )}
                        >
                          {/* Option label */}
                          <span className={cn(
                            'flex-shrink-0 w-5 h-5 rounded border text-xs font-bold flex items-center justify-center',
                            isSelected && !submitted && 'bg-[#0052D4] border-[#0052D4] text-white',
                            submitted && isCorrectOption && 'bg-[#00B37E] border-[#00B37E] text-white',
                            submitted && isSelected && !isCorrectOption && 'bg-red-400 border-red-400 text-white',
                            !isSelected && 'border-slate-300 text-slate-400'
                          )}>
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span className="flex-1 text-left">{opt}</span>
                          {submitted && isCorrectOption && <CheckCircle className="h-4 w-4 text-[#00B37E] flex-shrink-0" />}
                          {submitted && isSelected && !isCorrectOption && <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />}
                        </button>
                      )
                    })}
                  </div>

                  {/* Explanation after submit */}
                  {submitted && (
                    <div className={cn(
                      'flex gap-2 p-3 rounded-lg pl-10 animate-fade-in',
                      isCorrect ? 'bg-[#ECFDF5]' : 'bg-red-50'
                    )}>
                      <HelpCircle className={cn('h-4 w-4 flex-shrink-0 mt-0.5', isCorrect ? 'text-[#00B37E]' : 'text-red-400')} />
                      <div className="text-xs space-y-1">
                        <p className="text-slate-700">{q.explanation}</p>
                        <p className="text-slate-400">{q.explanationChinese}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Submit button */}
            {!submitted && (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={cn(
                  'w-full py-3 rounded-xl text-sm font-semibold transition-all',
                  allAnswered
                    ? 'bg-[#0052D4] text-white hover:bg-[#003DA8] shadow-sm shadow-blue-500/30 hover:-translate-y-0.5'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                )}
              >
                {allAnswered
                  ? '提交答案 →'
                  : `还有 ${QUESTIONS.length - Object.keys(answers).length} 题未作答`}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
