# BearingTrade English - 新功能整合指南

## 新增功能概览

### 1. 用户进度记忆 (useLocalStorage Hook)
基于 Browser LocalStorage 的持久化存储方案

**文件位置:**
- `hooks/useLocalStorage.ts` - 核心 Hook
- `components/user/ProgressDashboard.tsx` - 进度仪表盘组件

**功能特性:**
- ✅ 词汇学习进度追踪（间隔重复算法）
- ✅ 测验成绩记录与统计
- ✅ 课程完成度追踪
- ✅ 学习连续天数统计
- ✅ 学习时长统计
- ✅ 数据导出/导入功能

### 2. 语音合成增强 (useTextToSpeech Hook)
基于 Web Speech API 的 TTS 功能

**文件位置:**
- `hooks/useTextToSpeech.ts` - 核心 Hook
- `components/ui/SpeakableText.tsx` - 可朗读文本组件
- `components/ui/TTSSettings.tsx` - TTS 设置面板

**功能特性:**
- ✅ 轴承术语智能发音（如 6204 → "six two zero four"）
- ✅ 默认 0.85x 语速（适合学习）
- ✅ 可调节语速 (0.5x - 1.5x)
- ✅ 多种语音选择
- ✅ 对话角色语调区分
- ✅ 朗读状态管理

---

## 目录结构更新

```
bearingtrade-english/
├── app/
│   └── ... (原有文件)
├── components/
│   ├── ui/
│   │   ├── ... (原有组件)
│   │   ├── Slider.tsx           # 新增: 滑块组件 (如需)
│   │   ├── SpeakableText.tsx    # 新增: 可朗读文本组件
│   │   └── TTSSettings.tsx      # 新增: TTS 设置面板
│   └── user/
│       └── ProgressDashboard.tsx # 新增: 用户进度仪表盘
├── hooks/
│   ├── useLocalStorage.ts       # 新增: 持久化存储 Hook
│   └── useTextToSpeech.ts       # 新增: 语音合成 Hook
└── lib/
    └── ... (原有文件)
```

---

## 整合步骤

### 步骤 1: 复制新文件

将以下文件复制到你的项目对应位置:

```bash
# 1. 创建必要的目录
mkdir -p components/user
mkdir -p hooks

# 2. 复制 Hook 文件
cp hooks/useLocalStorage.ts /your-project/hooks/
cp hooks/useTextToSpeech.ts /your-project/hooks/

# 3. 复制 UI 组件
cp components/ui/SpeakableText.tsx /your-project/components/ui/
cp components/ui/TTSSettings.tsx /your-project/components/ui/

# 4. 复制用户组件
cp components/user/ProgressDashboard.tsx /your-project/components/user/
```

### 步骤 2: 更新现有组件

#### 2.1 更新课程详情页 (`app/course/[slug]/page.tsx`)

**添加导入:**
```typescript
import { useUserProgress } from '@/hooks/useLocalStorage'
import { VocabularyCard } from '@/components/ui/SpeakableText'
```

**在组件中使用进度追踪:**
```typescript
export default function CourseDetailPage() {
  const { updateCourseProgress, getCourseCompletionPercentage } = useUserProgress()

  // 获取课程完成百分比
  const completionPercentage = getCourseCompletionPercentage(courseId)

  // 更新课程进度 (当用户完成一节课时调用)
  const handleLessonComplete = (lessonIndex: number) => {
    updateCourseProgress(courseId, lessonIndex, course.lessons)
  }

  // ... 其余代码
}
```

#### 2.2 更新测验页 (`app/quiz/page.tsx`)

**添加导入:**
```typescript
import { useUserProgress } from '@/hooks/useLocalStorage'
```

**保存测验结果:**
```typescript
export default function QuizPage() {
  const { saveQuizResult } = useUserProgress()

  // 在测验结束时保存结果
  const handleQuizComplete = (answers, timeSpent) => {
    const score = calculateScore()
    saveQuizResult({
      quizId: quiz.id,
      courseId: quiz.courseId,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      timeSpent, // 秒
      answers,
    })
  }

  // ... 其余代码
}
```

#### 2.3 更新对话页 (`app/dialogue/page.tsx`)

**添加导入:**
```typescript
import { DialogueSpeakButton } from '@/components/ui/SpeakableText'
```

**在对话气泡中添加朗读按钮:**
```typescript
// 在对话行组件中
<div className="dialogue-bubble">
  <p>{line.text}</p>
  <DialogueSpeakButton
    text={line.text}
    speaker={line.speaker}
  />
</div>
```

#### 2.4 更新词汇展示

**使用 VocabularyCard 组件:**
```typescript
import { VocabularyCard } from '@/components/ui/SpeakableText'
import { useUserProgress } from '@/hooks/useLocalStorage'

// 在组件中
const { markVocabularyLearned, isVocabularyLearned } = useUserProgress()

// 渲染词汇卡片
<VocabularyCard
  word="Deep Groove Ball Bearing"
  phonetic="/diːp ɡruːv bɔːl ˈbeərɪŋ/"
  meaning="深沟球轴承"
  isLearned={isVocabularyLearned('Deep Groove Ball Bearing')}
  onMarkLearned={() => markVocabularyLearned('Deep Groove Ball Bearing')}
/>
```

### 步骤 3: 添加用户仪表盘页面

**创建新文件:** `app/progress/page.tsx`

```typescript
import { ProgressDashboard } from '@/components/user/ProgressDashboard'
import { TTSSettings } from '@/components/ui/TTSSettings'

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">学习进度</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProgressDashboard />
          </div>
          <div>
            <TTSSettings />
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 步骤 4: 更新 Header 导航

**在 `components/layout/Header.tsx` 中添加进度页链接:**

```typescript
const navItems = [
  { label: '首页', href: '/' },
  { label: '课程', href: '/course' },
  { label: '对话练习', href: '/dialogue' },
  { label: '测验', href: '/quiz' },
  { label: '视频', href: '/video' },
  { label: '我的进度', href: '/progress' }, // 新增
]
```

---

## 使用示例

### 示例 1: 可朗读的专业术语

```typescript
import { SpeakableText } from '@/components/ui/SpeakableText'

// 在组件中
<p>
  产品类型: <SpeakableText text="Deep Groove Ball Bearing" speakAsTerm>
    Deep Groove Ball Bearing
  </SpeakableText>
</p>

// 型号朗读
<p>
  型号: <SpeakableText text="6204-2RS" speakAsTerm>
    6204-2RS
  </SpeakableText>
</p>
```

### 示例 2: 测验结果保存

```typescript
import { useUserProgress } from '@/hooks/useLocalStorage'

function QuizComponent() {
  const { saveQuizResult, getBestQuizScore } = useUserProgress()

  // 提交测验
  const submitQuiz = () => {
    saveQuizResult({
      quizId: 'quiz-bearing-basics',
      courseId: 'bearing-basics',
      score: 85,
      totalQuestions: 5,
      correctAnswers: 4,
      timeSpent: 420, // 7分钟
      answers: [1, 1, '20', 1, 0],
    })
  }

  // 获取最高分
  const bestScore = getBestQuizScore('quiz-bearing-basics')
}
```

### 示例 3: 学习统计展示

```typescript
import { useUserProgress } from '@/hooks/useLocalStorage'

function StatsComponent() {
  const { getStudyStats } = useUserProgress()
  const stats = getStudyStats()

  return (
    <div>
      <p>连续学习: {stats.currentStreak} 天</p>
      <p>已学词汇: {stats.totalVocabularyLearned}</p>
      <p>平均分数: {stats.averageQuizScore}%</p>
      <p>学习时长: {stats.totalStudyTime} 分钟</p>
    </div>
  )
}
```

---

## LocalStorage 数据结构

数据存储在 `localStorage` 的键 `bearingtrade_english_progress` 中:

```typescript
{
  vocabulary: {
    "deep groove ball bearing": {
      word: "Deep Groove Ball Bearing",
      learned: true,
      learnedAt: "2024-01-15T10:30:00.000Z",
      reviewCount: 3,
      lastReviewedAt: "2024-01-20T14:20:00.000Z"
    },
    // ...
  },
  quizResults: [
    {
      quizId: "quiz-bearing-basics",
      courseId: "bearing-basics",
      score: 85,
      totalQuestions: 5,
      correctAnswers: 4,
      completedAt: "2024-01-15T10:30:00.000Z",
      timeSpent: 420,
      answers: [1, 1, "20", 1, 0]
    }
  ],
  courseProgress: {
    "bearing-basics": {
      courseId: "bearing-basics",
      startedAt: "2024-01-15T10:30:00.000Z",
      lastAccessedAt: "2024-01-20T14:20:00.000Z",
      completedLessons: [0, 1, 2],
      totalLessons: 6,
      isCompleted: false
    }
  },
  studyStreak: {
    current: 5,
    lastStudyDate: "2024-01-20",
    longest: 12
  },
  totalStudyTime: 450 // 分钟
}
```

---

## 浏览器兼容性

### LocalStorage
- ✅ Chrome 4+
- ✅ Firefox 3.5+
- ✅ Safari 4+
- ✅ Edge 12+

### Web Speech API (TTS)
- ✅ Chrome 33+
- ✅ Edge 14+
- ✅ Safari 14.1+
- ⚠️ Firefox 部分支持（需要配置）
- ⚠️ 移动端支持有限

**建议:** 在生产环境中检测浏览器支持并显示降级提示。

---

## 后续优化建议

1. **同步功能**: 可以将 LocalStorage 数据导出为文件，或未来接入后端实现跨设备同步
2. **更多语音**: 考虑集成第三方 TTS 服务（如 Google Cloud TTS）以获得更好的发音质量
3. **语音识别**: 可以添加语音输入练习功能
4. **数据压缩**: 如果数据量增大，可以使用压缩算法减少 LocalStorage 占用
