'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Factory, Users, Search, Filter, BookOpen, Clock, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { courses } from '@/lib/data/courses'

const levelLabels: Record<string, string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
}

const levelColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'trade' | 'life'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCourses = courses.filter(course => {
    const matchesTab = activeTab === 'all' || course.category === activeTab
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">课程中心</h1>
              <p className="text-slate-600 mt-2">
                选择适合你的课程，开始外贸英语学习之旅
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="搜索课程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            {[
              { id: 'all', label: '全部课程', icon: Filter },
              { id: 'trade', label: '外贸专业', icon: Factory },
              { id: 'life', label: '日常生活', icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900">未找到相关课程</h3>
            <p className="text-slate-600 mt-2">请尝试其他搜索词或分类</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link key={course.id} href={`/course/${course.id}/`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className={`h-48 flex items-center justify-center text-8xl ${
                    course.category === 'trade' ? 'bg-orange-50' : 'bg-emerald-50'
                  }`}>
                    {course.image}
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={course.category === 'trade' ? 'trade' : 'life'}>
                        {course.category === 'trade' ? '外贸专业' : '日常生活'}
                      </Badge>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${levelColors[course.level]}`}>
                        {levelLabels[course.level]}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.lessons} 节课
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button variant="ghost" className="w-full gap-2 group-hover:text-blue-600">
                      查看详情
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
