'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle,
  Play,
  Lightbulb,
  FileText,
  HelpCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { getCourseById } from '@/lib/data/courses'
import { getQuizByCourseId } from '@/lib/data/quiz'

const levelLabels: Record<string, string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.slug as string
  const course = getCourseById(courseId)
  const quiz = getQuizByCourseId(courseId)

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-slate-900">课程未找到</h1>
          <p className="text-slate-600 mt-2">该课程不存在或已被移除</p>
          <Link href="/course/">
            <Button className="mt-6">返回课程列表</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className={`${course.category === 'trade' ? 'bg-orange-600' : 'bg-emerald-600'} text-white`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/course/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4" />
            返回课程列表
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {course.category === 'trade' ? '外贸专业' : '日常生活'}
                </Badge>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {levelLabels[course.level]}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-white/90 max-w-2xl">{course.description}</p>
            </div>

            <div className="text-8xl">{course.image}</div>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>{course.lessons} 节课</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>包含测验</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  学习目标
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.learningPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${
                        course.category === 'trade' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Lesson List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-blue-500" />
                  课程大纲
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from({ length: course.lessons }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer group"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        course.category === 'trade' ? 'bg-orange-100' : 'bg-emerald-100'
                      }`}>
                        <Play className={`h-4 w-4 ${
                          course.category === 'trade' ? 'text-orange-600' : 'text-emerald-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">
                          {index + 1}. {course.title} - 第{index + 1}课
                        </h4>
                        <p className="text-sm text-slate-500">
                          {Math.floor(parseInt(course.duration) / course.lessons)} 分钟
                        </p>
                      </div>
                      <Button size="sm" variant="ghost">
                        开始学习
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Psychology Tip */}
            <div className="psychology-tip">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">
                    外贸谈判心理学小贴士
                  </h3>
                  <p className="text-amber-800">
                    {course.category === 'trade'
                      ? '在专业对话中，使用"mirroring"（镜像）技巧可以建立更好的信任关系。即适度模仿对方的语速、用词和表达方式，让对方感到被理解和认同。'
                      : '在社交场合，记住并使用对方的名字是建立良好关系的关键。人们最喜欢听到的声音就是自己的名字。在对话中自然地使用对方名字3-4次，会大大提升好感度。'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>学习进度</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar value={0} showLabel />
                <p className="text-sm text-slate-600 text-center">
                  尚未开始学习，点击开始你的第一课！
                </p>
                <Button className="w-full" size="lg">
                  开始学习
                </Button>
              </CardContent>
            </Card>

            {/* Quiz Card */}
            {quiz && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-purple-500" />
                    课程测验
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">题目数量</span>
                    <span className="font-medium">{quiz.totalQuestions} 题</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">时间限制</span>
                    <span className="font-medium">{quiz.timeLimit} 分钟</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">及格分数</span>
                    <span className="font-medium">{quiz.passingScore}%</span>
                  </div>
                  <Link href={`/quiz/?course=${course.id}`}>
                    <Button variant="outline" className="w-full">
                      开始测验
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Related Dialogue */}
            <Card>
              <CardHeader>
                <CardTitle>相关对话练习</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dialogue/">
                  <Button variant="ghost" className="w-full justify-between">
                    查看对话练习
                    <Play className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
