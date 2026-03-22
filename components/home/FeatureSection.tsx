import {
  Headphones,
  MessageCircle,
  Brain,
  BarChart3,
  Video,
  Trophy
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'

const features = [
  {
    icon: Headphones,
    title: '沉浸式听力训练',
    description: '真实外贸场景录音，从慢速到常速，循序渐进提升听力水平',
    color: 'blue',
  },
  {
    icon: MessageCircle,
    title: '互动对话模拟',
    description: 'AI驱动的对话练习，模拟真实客户交流，即时反馈发音和语法',
    color: 'indigo',
  },
  {
    icon: Brain,
    title: '营销心理学融入',
    description: '每节课穿插外贸谈判心理学小贴士，提升成交率',
    color: 'amber',
  },
  {
    icon: Video,
    title: '视频教学模块',
    description: '真人实景演示，直观学习商务礼仪和沟通技巧',
    color: 'rose',
  },
  {
    icon: BarChart3,
    title: '学习进度追踪',
    description: '详细的学习数据分析，了解自己的进步轨迹',
    color: 'emerald',
  },
  {
    icon: Trophy,
    title: '成就认证体系',
    description: '完成课程获得行业认可的英语能力证书',
    color: 'purple',
  },
]

export function FeatureSection() {
  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            为什么选择 BearingTrade English
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            专为轴承外贸从业者打造，将专业知识与语言学习完美结合
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                  feature.color === 'blue' ? 'bg-blue-100' :
                  feature.color === 'indigo' ? 'bg-indigo-100' :
                  feature.color === 'amber' ? 'bg-amber-100' :
                  feature.color === 'rose' ? 'bg-rose-100' :
                  feature.color === 'emerald' ? 'bg-emerald-100' :
                  'bg-purple-100'
                }`}>
                  <feature.icon className={`h-7 w-7 ${
                    feature.color === 'blue' ? 'text-blue-600' :
                    feature.color === 'indigo' ? 'text-indigo-600' :
                    feature.color === 'amber' ? 'text-amber-600' :
                    feature.color === 'rose' ? 'text-rose-600' :
                    feature.color === 'emerald' ? 'text-emerald-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-slate-300" />
              <span className="font-semibold">ABC Bearing Co.</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-slate-300" />
              <span className="font-semibold">XYZ Precision</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-slate-300" />
              <span className="font-semibold">Global Trade Inc.</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-slate-300" />
              <span className="font-semibold">Bearing Solutions</span>
            </div>
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">
            已有 50+ 家轴承企业选择 BearingTrade English 作为员工英语培训平台
          </p>
        </div>
      </div>
    </section>
  )
}
