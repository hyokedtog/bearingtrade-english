'use client'

import { useUserProgress } from '@/hooks/useLocalStorage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  Trophy,
  BookOpen,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Download,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState, useCallback } from 'react'

/**
 * 用户学习进度仪表盘组件
 * 展示用户的学习统计数据
 */
export function ProgressDashboard() {
  const {
    getStudyStats,
    exportData,
    importData,
    resetProgress,
    progress,
  } = useUserProgress()

  const stats = getStudyStats()
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // 导出数据
  const handleExport = useCallback(() => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bearingtrade_progress_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [exportData])

  // 导入数据
  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const success = importData(content)
        setImportStatus(success ? 'success' : 'error')
        setTimeout(() => setImportStatus('idle'), 3000)
      } catch {
        setImportStatus('error')
        setTimeout(() => setImportStatus('idle'), 3000)
      }
    }
    reader.readAsText(file)
  }, [importData])

  // 计算总体进度
  const overallProgress = Math.round(
    (stats.completedCourses * 25 +
     stats.passedQuizzes * 10 +
     Math.min(stats.totalVocabularyLearned, 100)
    ) / 3
  )

  return (
    <div className="space-y-6">
      {/* 总体进度 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            总体学习进度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar value={overallProgress} max={100} className="h-4" />
          <p className="text-sm text-slate-600 mt-2 text-center">
            {overallProgress}% 完成 - 继续保持！
          </p>
        </CardContent>
      </Card>

      {/* 统计卡片网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={Flame}
          label="连续学习"
          value={`${stats.currentStreak} 天`}
          subtext={`最长 ${stats.longestStreak} 天`}
          color="orange"
        />

        <StatCard
          icon={Clock}
          label="学习时长"
          value={`${stats.totalStudyTime} 分钟`}
          subtext={`约 ${Math.round(stats.totalStudyTime / 60)} 小时`}
          color="blue"
        />

        <StatCard
          icon={BookOpen}
          label="已学词汇"
          value={stats.totalVocabularyLearned.toString()}
          subtext="专业词汇"
          color="green"
        />

        <StatCard
          icon={Trophy}
          label="通过测验"
          value={stats.passedQuizzes.toString()}
          subtext="课程测验"
          color="purple"
        />

        <StatCard
          icon={TrendingUp}
          label="平均分数"
          value={`${stats.averageQuizScore}%`}
          subtext="所有测验"
          color="emerald"
        />

        <StatCard
          icon={Target}
          label="完成课程"
          value={stats.completedCourses.toString()}
          subtext="全部课程"
          color="rose"
        />
      </div>

      {/* 最近活动 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">最近学习活动</CardTitle>
        </CardHeader>
        <CardContent>
          {progress.quizResults.length === 0 &&
           Object.keys(progress.vocabulary).length === 0 ? (
            <p className="text-slate-500 text-center py-4">
              还没有学习记录，开始你的第一堂课吧！
            </p>
          ) : (
            <div className="space-y-3">
              {/* 最近的测验结果 */}
              {progress.quizResults
                .slice(-3)
                .reverse()
                .map((result, index) => (
                  <div
                    key={`${result.quizId}-${index}`}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-slate-900">完成测验</p>
                      <p className="text-sm text-slate-500">
                        {new Date(result.completedAt).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${
                        result.score >= 80 ? 'text-green-600' :
                        result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {result.score}%
                      </span>
                    </div>
                  </div>
                ))}

              {/* 最近学习的词汇 */}
              {Object.values(progress.vocabulary)
                .slice(-3)
                .reverse()
                .map((vocab) => (
                  <div
                    key={vocab.word}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{vocab.word}</p>
                      <p className="text-sm text-slate-500">
                        复习 {vocab.reviewCount} 次
                      </p>
                    </div>
                    <span className="text-green-600 text-sm">已掌握</span>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 数据管理 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">学习数据管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              导出数据
            </Button>

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button variant="outline" className="gap-2" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                  导入数据
                </span>
              </Button>
            </label>

            <Button
              variant="destructive"
              onClick={() => {
                if (confirm('确定要重置所有学习进度吗？此操作不可恢复。')) {
                  resetProgress()
                }
              }}
            >
              重置进度
            </Button>
          </div>

          {importStatus === 'success' && (
            <p className="text-green-600 text-sm mt-3">数据导入成功！</p>
          )}
          {importStatus === 'error' && (
            <p className="text-red-600 text-sm mt-3">数据导入失败，请检查文件格式。</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * 统计卡片组件
 */
interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string
  subtext: string
  color: 'blue' | 'green' | 'orange' | 'purple' | 'emerald' | 'rose'
}

function StatCard({ icon: Icon, label, value, subtext, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
  }

  return (
    <div className="p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{subtext}</p>
        </div>
      </div>
    </div>
  )
}

export default ProgressDashboard
