'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle,
  XCircle,
  Clock,
  HelpCircle,
  ArrowLeft,
  Trophy,
  RotateCcw,
  ChevronRight,
  Lightbulb,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { quizzes, type QuizQuestion } from '@/lib/data/quiz'

function QuizQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  showResult,
}: {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  selectedAnswer: string | number | null
  onSelectAnswer: (answer: string | number) => void
  showResult: boolean
}) {
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium">
            {questionNumber}
          </span>
          <Badge variant="outline">
            {question.type === 'multiple_choice' && '单选题'}
            {question.type === 'fill_blank' && '填空题'}
            {question.type === 'listening' && '听力题'}
            {question.type === 'scenario' && '情景题'}
          </Badge>
        </div>
        <CardTitle className="text-lg font-medium">
          {question.question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Options */}
        {question.options && (
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectAnswer = question.correctAnswer === index

              let buttonClass = 'w-full text-left p-4 rounded-lg border transition-all '

              if (showResult) {
                if (isCorrectAnswer) {
                  buttonClass += 'bg-green-100 border-green-500 text-green-800'
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += 'bg-red-100 border-red-500 text-red-800'
                } else {
                  buttonClass += 'bg-slate-50 border-slate-200 text-slate-500'
                }
              } else {
                buttonClass += isSelected
                  ? 'bg-blue-50 border-blue-500 text-blue-800'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => !showResult && onSelectAnswer(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && isCorrectAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    )}
                    {showResult && isSelected && !isCorrectAnswer && (
                      <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Fill in the blank */}
        {question.type === 'fill_blank' && !showResult && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="请输入答案..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => onSelectAnswer(e.target.value)}
              value={(selectedAnswer as string) || ''}
            />
            {question.hint && (
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                提示: {question.hint}
              </p>
            )}
          </div>
        )}

        {showResult && question.type === 'fill_blank' && (
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={isCorrect ? 'text-green-800' : 'text-red-800'}>
                {isCorrect ? '回答正确！' : '回答错误'}
              </span>
            </div>
            {!isCorrect && (
              <p className="text-slate-700">
                正确答案: <span className="font-semibold">{question.correctAnswer}</span>
              </p>
            )}
          </div>
        )}

        {/* Explanation */}
        {showResult && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-1">解析</h4>
            <p className="text-blue-800 text-sm">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function QuizPageContent() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get('course')

  const quiz = courseId
    ? quizzes.find((q) => q.courseId === courseId) || quizzes[0]
    : quizzes[0]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(string | number | null)[]>(
    new Array(quiz.questions.length).fill(null)
  )
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60)

  const handleSelectAnswer = (answer: string | number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / quiz.questions.length) * 100)
  }

  const score = calculateScore()
  const passed = score >= quiz.passingScore

  // Results View
  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Card>
            <CardHeader className="text-center">
              <div className={`flex h-20 w-20 items-center justify-center rounded-full mx-auto mb-4 ${
                passed ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                <Trophy className={`h-10 w-10 ${passed ? 'text-green-600' : 'text-orange-600'}`} />
              </div>
              <CardTitle className="text-2xl">
                {passed ? '恭喜通过测验！' : '再努力一下！'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-slate-900 mb-2">{score}%</div>
                <p className="text-slate-600">
                  及格分数: {quiz.passingScore}%
                </p>
              </div>

              <ProgressBar value={score} max={100} className="h-4" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">
                    {answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length}
                  </div>
                  <div className="text-sm text-slate-600">答对</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">
                    {answers.filter((a, i) => a !== null && a !== quiz.questions[i].correctAnswer).length}
                  </div>
                  <div className="text-sm text-slate-600">答错</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">
                    {answers.filter((a) => a === null).length}
                  </div>
                  <div className="text-sm text-slate-600">未答</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => {
                    setCurrentQuestion(0)
                    setAnswers(new Array(quiz.questions.length).fill(null))
                    setShowResults(false)
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  重新测验
                </Button>
                <Link href="/course/" className="flex-1">
                  <Button className="w-full gap-2">
                    继续学习
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/course/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold text-slate-900">{quiz.title}</h1>
                <p className="text-sm text-slate-500">{quiz.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="h-4 w-4" />
                <span>剩余时间: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="text-sm font-medium">
                {currentQuestion + 1} / {quiz.questions.length}
              </div>
            </div>
          </div>

          <ProgressBar
            value={currentQuestion + 1}
            max={quiz.questions.length}
            showLabel={false}
            className="mt-4"
          />
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <QuizQuestionCard
          question={quiz.questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={quiz.questions.length}
          selectedAnswer={answers[currentQuestion]}
          onSelectAnswer={handleSelectAnswer}
          showResult={false}
        />

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            上一题
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion] === null}
              className="gap-2"
            >
              提交答案
              <CheckCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion] === null}
            >
              下一题
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-slate-600 mb-4">题目导航</p>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`h-10 w-10 rounded-lg font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[index] !== null
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-500">加载中...</p></div>}>
      <QuizPageContent />
    </Suspense>
  )
}
