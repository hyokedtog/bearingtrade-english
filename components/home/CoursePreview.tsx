'use client'

import Link from 'next/link'
import { Play, Clock, BookOpen, ChevronRight, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

const featuredCourses = [
  {
    id: 'bearing-basics',
    title: '轴承基础术语入门',
    description: '学习轴承的基本结构、类型和常用术语',
    duration: '45分钟',
    lessons: 6,
    progress: 0,
    level: '初级',
    image: '📐',
    category: 'trade',
  },
  {
    id: 'inquiry-response',
    title: '高效询盘回复技巧',
    description: '掌握快速响应客户询盘的英语模板和技巧',
    duration: '60分钟',
    lessons: 8,
    progress: 0,
    level: '中级',
    image: '✉️',
    category: 'trade',
  },
  {
    id: 'factory-tour',
    title: '带客户参观工厂',
    description: '工厂参观全流程英语，从接待到送别',
    duration: '50分钟',
    lessons: 7,
    progress: 0,
    level: '中级',
    image: '🏭',
    category: 'trade',
  },
  {
    id: 'business-dinner',
    title: '商务宴请英语',
    description: '餐厅预订、点菜、敬酒等场景英语',
    duration: '40分钟',
    lessons: 5,
    progress: 0,
    level: '初级',
    image: '🍽️',
    category: 'life',
  },
]

export function CoursePreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              热门课程
            </h2>
            <p className="text-lg text-slate-600">
              精选最受欢迎的课程，助你快速提升外贸英语能力
            </p>
          </div>
          <Link href="/course">
            <Button variant="ghost" className="gap-2 text-blue-600">
              查看全部
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <Link key={course.id} href={`/course/${course.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                {/* Thumbnail */}
                <div className={`h-40 flex items-center justify-center text-6xl ${
                  course.category === 'trade' ? 'bg-orange-50' : 'bg-emerald-50'
                }`}>
                  {course.image}
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={course.category === 'trade' ? 'trade' : 'life'}>
                      {course.category === 'trade' ? '外贸专业' : '日常生活'}
                    </Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course.lessons} 节
                    </span>
                  </div>

                  {course.progress > 0 && (
                    <ProgressBar value={course.progress} showLabel />
                  )}

                  <Button
                    variant="ghost"
                    className={`w-full gap-2 ${
                      course.category === 'trade'
                        ? 'text-orange-600 hover:bg-orange-50'
                        : 'text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <Play className="h-4 w-4" />
                    {course.progress > 0 ? '继续学习' : '开始学习'}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Psychology Tip Banner */}
        <div className="mt-16 psychology-tip">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
              <Lightbulb className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                外贸谈判心理学小贴士
              </h3>
              <p className="text-amber-800">
                在回复客户询盘时，适当使用开放式问题（Open-ended Questions）可以引导客户透露更多需求信息。
                例如，不要只问&quot;What quantity do you need?&quot;，而是问&quot;Could you share more about your project timeline and expected volume?&quot;
                这样既能获取更多信息，又能展现你的专业性。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
