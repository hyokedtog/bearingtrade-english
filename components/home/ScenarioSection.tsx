'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Factory,
  Package,
  TrendingUp,
  Truck,
  Utensils,
  Users,
  UserCheck,
  Building2,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const tradeScenarios = [
  {
    id: 'specs',
    icon: Factory,
    title: '轴承规格确认',
    description: '掌握轴承型号、尺寸、材质等专业术语的英文表达',
    lessons: 8,
    color: 'orange',
  },
  {
    id: 'audit',
    icon: Building2,
    title: '工厂验货',
    description: '学习工厂审核流程、质检标准相关的专业英语',
    lessons: 6,
    color: 'orange',
  },
  {
    id: 'negotiation',
    icon: TrendingUp,
    title: '价格谈判',
    description: '熟练运用谈判技巧，掌握报价、议价的专业表达',
    lessons: 10,
    color: 'orange',
  },
  {
    id: 'logistics',
    icon: Truck,
    title: '物流发货',
    description: '了解海运、空运、报关等物流环节的专业用语',
    lessons: 7,
    color: 'orange',
  },
]

const lifeScenarios = [
  {
    id: 'reception',
    icon: UserCheck,
    title: '客户接待',
    description: '从机场接机到酒店入住的完整接待流程英语',
    lessons: 5,
    color: 'emerald',
  },
  {
    id: 'social',
    icon: Users,
    title: '日常社交',
    description: '商务寒暄、闲聊话题、文化差异等社交英语',
    lessons: 6,
    color: 'emerald',
  },
  {
    id: 'catering',
    icon: Utensils,
    title: '展会餐饮',
    description: '餐厅点餐、商务宴请、饮食文化相关表达',
    lessons: 4,
    color: 'emerald',
  },
  {
    id: 'gifts',
    icon: Package,
    title: '礼品赠送',
    description: '中国特色礼品介绍、赠送礼仪相关英语',
    lessons: 3,
    color: 'emerald',
  },
]

export function ScenarioSection() {
  const [activeTab, setActiveTab] = useState<'trade' | 'life'>('trade')

  const scenarios = activeTab === 'trade' ? tradeScenarios : lifeScenarios

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            两大核心场景，全面覆盖
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            无论是专业的外贸业务沟通，还是日常的客户接待交流，我们都为你准备了针对性的学习内容
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('trade')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === 'trade'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Factory className="h-4 w-4" />
                外贸专业场景
              </span>
            </button>
            <button
              onClick={() => setActiveTab('life')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === 'life'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                日常生活场景
              </span>
            </button>
          </div>
        </div>

        {/* Scenario Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((scenario) => (
            <Link key={scenario.id} href={`/course/${scenario.id}`}>
              <Card className={`h-full border-l-4 ${
                activeTab === 'trade' ? 'border-l-orange-500' : 'border-l-emerald-500'
              } hover:shadow-lg transition-shadow cursor-pointer group`}>
                <CardHeader>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    activeTab === 'trade' ? 'bg-orange-100' : 'bg-emerald-100'
                  }`}>
                    <scenario.icon className={`h-6 w-6 ${
                      activeTab === 'trade' ? 'text-orange-600' : 'text-emerald-600'
                    }`} />
                  </div>
                  <CardTitle className="text-lg mt-4">{scenario.title}</CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant={activeTab === 'trade' ? 'trade' : 'life'}>
                      {scenario.lessons} 节课
                    </Badge>
                    <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                      activeTab === 'trade' ? 'text-orange-500' : 'text-emerald-500'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/course">
            <Button variant="outline" size="lg" className="gap-2">
              查看全部课程
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
