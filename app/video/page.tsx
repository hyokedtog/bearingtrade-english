'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Play,
  Clock,
  BookOpen,
  Lock,
  AlertCircle,
  Video,
  Film,
  MonitorPlay,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

// 视频模块预留数据结构
const videoModules = [
  {
    id: 'intro',
    title: '视频教学模块',
    description: '真人实景演示，直观学习商务礼仪和沟通技巧',
    status: 'coming_soon',
    icon: Video,
    color: 'blue',
    features: [
      '工厂参观实景视频',
      '展会交流场景演示',
      '商务宴请礼仪演示',
      '产品讲解技巧视频',
    ],
  },
  {
    id: 'pronunciation',
    title: '发音矫正模块',
    description: 'AI驱动的发音评估和纠正系统',
    status: 'coming_soon',
    icon: MonitorPlay,
    color: 'purple',
    features: [
      '轴承术语标准发音',
      '句子语调训练',
      'AI发音评分',
      '对比原声纠正',
    ],
  },
  {
    id: 'roleplay',
    title: '角色扮演模块',
    description: '沉浸式角色扮演，模拟真实商务场景',
    status: 'coming_soon',
    icon: Film,
    color: 'orange',
    features: [
      '客户询盘模拟',
      '价格谈判演练',
      '投诉处理场景',
      '合同签订演示',
    ],
  },
]

export default function VideoPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">视频模块开发中</span>
            </div>
            <h1 className="text-4xl font-bold mb-6">视频教学中心</h1>
            <p className="text-xl text-slate-300 mb-8">
              真人实景演示，沉浸式学习体验
              <br />
              让轴承外贸英语学习更直观、更高效
            </p>

            {/* Subscribe Form */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="输入邮箱，获取上线通知"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <Button type="submit" size="lg">
                  订阅通知
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  订阅成功！
                </Badge>
                <span>我们会在视频模块上线时通知您</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modules Preview */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
          即将推出的视频模块
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {videoModules.map((module) => (
            <Card key={module.id} className="relative overflow-hidden">
              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                  <Lock className="h-3 w-3 mr-1" />
                  即将上线
                </Badge>
              </div>

              <CardHeader>
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                  module.color === 'blue' ? 'bg-blue-100' :
                  module.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}
                >
                  <module.icon className={`h-7 w-7 ${
                    module.color === 'blue' ? 'text-blue-600' :
                    module.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`} />
                </div>
                <CardTitle className="text-xl mt-4">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {module.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full mt-6" disabled>
                  <Lock className="h-4 w-4 mr-2" />
                  即将开放
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                视频模块预览
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  我们正在录制专业的轴承外贸英语教学视频，由资深外贸专家和英语教师联合打造。
                </p>
                <p>
                  视频内容将涵盖真实的工厂环境、展会现场、商务会议等场景，让你身临其境学习英语。
                </p>
                <p>
                  每个视频都将配有中英文字幕、重点词汇标注、以及可跟读练习功能。
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  <span>预计上线: 2026 Q2</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <BookOpen className="h-4 w-4" />
                  <span>50+ 视频课程</span>
                </div>
              </div>
            </div>

            {/* Video Placeholder */}
            <div className="relative">
              <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 mx-auto mb-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white/60">视频预览即将推出</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-blue-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-purple-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            准备好开始你的学习之旅了吗？
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            虽然视频模块还在开发中，但我们的课程和对话练习模块已经准备就绪，马上开始学习吧！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/course" className="inline-flex items-center justify-center h-11 rounded-md px-8 text-sm font-medium bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors">浏览课程</Link>
            <Link href="/dialogue" className="inline-flex items-center justify-center h-11 rounded-md px-8 text-sm font-medium border border-white bg-transparent text-white hover:bg-white/10 transition-colors">对话练习</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
