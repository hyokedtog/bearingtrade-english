'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Factory,
  Users,
  Play,
  Pause,
  Volume2,
  BookOpen,
  ChevronRight,
  Lightbulb,
  MessageCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { dialogues, type Dialogue } from '@/lib/data/dialogues'

function DialogueCard({ dialogue }: { dialogue: Dialogue }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className={`${
        dialogue.category === 'trade' ? 'bg-orange-50' : 'bg-emerald-50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
              dialogue.category === 'trade' ? 'bg-orange-100' : 'bg-emerald-100'
            }`}>
              <MessageCircle className={`h-6 w-6 ${
                dialogue.category === 'trade' ? 'text-orange-600' : 'text-emerald-600'
              }`} />
            </div>
            <div>
              <CardTitle className="text-lg">{dialogue.title}</CardTitle>
              <p className="text-sm text-slate-500">{dialogue.description}</p>
            </div>
          </div>
          <Badge variant={dialogue.category === 'trade' ? 'trade' : 'life'}>
            {dialogue.category === 'trade' ? '外贸专业' : '日常生活'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Preview Dialogue */}
        <div className="space-y-3 mb-6">
          {dialogue.lines.slice(0, 3).map((line) => (
            <div
              key={line.id}
              className={`flex gap-3 ${line.speaker === 'customer' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                line.speaker === 'customer'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {line.speaker === 'customer' ? '客' : '销'}
              </div>
              <div className={`max-w-[70%] p-3 rounded-lg text-sm ${
                line.speaker === 'customer'
                  ? 'bg-orange-50 text-orange-900'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {line.text}
              </div>
            </div>
          ))}
        </div>

        {/* Info & Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Volume2 className="h-4 w-4" />
              音频练习
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {dialogue.lines.length} 句对话
            </span>
          </div>

          <Button
            size="sm"
            className={`gap-2 ${
              dialogue.category === 'trade'
                ? 'bg-orange-600 hover:bg-orange-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                暂停
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                开始练习
              </>
            )}
          </Button>
        </div>

        {/* Psychology Tip */}
        {dialogue.psychologyTip && (
          <div className="mt-4 psychology-tip">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">{dialogue.psychologyTip}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function DialoguePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'trade' | 'life'>('all')

  const filteredDialogues = dialogues.filter(
    (d) => activeTab === 'all' || d.category === activeTab
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900">对话练习</h1>
          <p className="text-slate-600 mt-2">
            通过真实场景对话练习，提升你的听说能力和应对技巧
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            {[
              { id: 'all', label: '全部对话', icon: MessageCircle },
              { id: 'trade', label: '外贸专业', icon: Factory },
              { id: 'life', label: '日常生活', icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'all' | 'trade' | 'life')}
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

      {/* Dialogue List */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredDialogues.map((dialogue) => (
            <DialogueCard key={dialogue.id} dialogue={dialogue} />
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600">
            <span>更多对话场景持续更新中</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
