'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * LocalStorage Hook - 用于持久化用户学习进度
 * 符合 Web Interface Guidelines 的客户端存储最佳实践
 */

export interface VocabularyProgress {
  word: string
  learned: boolean
  learnedAt: string // ISO date string
  reviewCount: number
  lastReviewedAt?: string
}

export interface QuizResult {
  quizId: string
  courseId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  completedAt: string
  timeSpent: number // in seconds
  answers: (string | number | null)[]
}

export interface CourseProgress {
  courseId: string
  startedAt: string
  lastAccessedAt: string
  completedLessons: number[]
  totalLessons: number
  isCompleted: boolean
}

export interface UserProgress {
  vocabulary: Record<string, VocabularyProgress>
  quizResults: QuizResult[]
  courseProgress: Record<string, CourseProgress>
  studyStreak: {
    current: number
    lastStudyDate: string
    longest: number
  }
  totalStudyTime: number // in minutes
}

const STORAGE_KEY = 'bearingtrade_english_progress'

const defaultProgress: UserProgress = {
  vocabulary: {},
  quizResults: [],
  courseProgress: {},
  studyStreak: {
    current: 0,
    lastStudyDate: '',
    longest: 0,
  },
  totalStudyTime: 0,
}

/**
 * 通用 LocalStorage Hook
 * @param key - LocalStorage 键名
 * @param initialValue - 初始值
 * @returns [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // 获取初始值（处理 SSR）
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }, [initialValue, key])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  // 更新 LocalStorage 并触发存储事件（用于跨标签页同步）
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
          // 触发自定义事件，用于跨组件同步
          window.dispatchEvent(new CustomEvent('localStorageChange', { detail: { key, value: valueToStore } }))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // 移除 LocalStorage 项
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [initialValue, key])

  // 监听其他标签页的更改
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue))
      }
    }

    const handleCustomEvent = (event: CustomEvent) => {
      if (event.detail?.key === key) {
        setStoredValue(event.detail.value)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('localStorageChange', handleCustomEvent as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageChange', handleCustomEvent as EventListener)
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}

/**
 * 用户学习进度 Hook - 专为 BearingTrade English 设计
 * 整合词汇、测验、课程进度和学习统计
 */
export function useUserProgress() {
  const [progress, setProgress, resetProgress] = useLocalStorage<UserProgress>(STORAGE_KEY, defaultProgress)

  // ========== 词汇进度管理 ==========

  /**
   * 标记词汇为已学习
   */
  const markVocabularyLearned = useCallback((word: string) => {
    setProgress((prev) => ({
      ...prev,
      vocabulary: {
        ...prev.vocabulary,
        [word.toLowerCase()]: {
          word,
          learned: true,
          learnedAt: new Date().toISOString(),
          reviewCount: (prev.vocabulary[word.toLowerCase()]?.reviewCount || 0) + 1,
          lastReviewedAt: new Date().toISOString(),
        },
      },
    }))
    updateStudyStreak()
  }, [setProgress])

  /**
   * 检查词汇是否已学习
   */
  const isVocabularyLearned = useCallback(
    (word: string): boolean => {
      return progress.vocabulary[word.toLowerCase()]?.learned || false
    },
    [progress.vocabulary]
  )

  /**
   * 获取已学习的词汇数量
   */
  const getLearnedVocabularyCount = useCallback((): number => {
    return Object.values(progress.vocabulary).filter((v) => v.learned).length
  }, [progress.vocabulary])

  /**
   * 获取需要复习的词汇列表（间隔重复算法 - 简化版）
   */
  const getVocabularyToReview = useCallback((): VocabularyProgress[] => {
    const now = new Date()
    return Object.values(progress.vocabulary)
      .filter((v) => {
        if (!v.lastReviewedAt) return true
        const lastReview = new Date(v.lastReviewedAt)
        const daysSinceReview = (now.getTime() - lastReview.getTime()) / (1000 * 60 * 60 * 24)
        // 根据复习次数调整间隔：1次->1天, 2次->3天, 3次->7天, 4次+->14天
        const intervals = [1, 3, 7, 14]
        const interval = intervals[Math.min(v.reviewCount - 1, 3)] || 14
        return daysSinceReview >= interval
      })
      .sort((a, b) => (a.lastReviewedAt || 0) > (b.lastReviewedAt || 0) ? 1 : -1)
  }, [progress.vocabulary])

  // ========== 测验结果管理 ==========

  /**
   * 保存测验结果
   */
  const saveQuizResult = useCallback((result: Omit<QuizResult, 'completedAt'>) => {
    const newResult: QuizResult = {
      ...result,
      completedAt: new Date().toISOString(),
    }

    setProgress((prev) => ({
      ...prev,
      quizResults: [...prev.quizResults.filter((r) => r.quizId !== result.quizId), newResult],
    }))
    updateStudyStreak()
    addStudyTime(Math.ceil(result.timeSpent / 60))
  }, [setProgress])

  /**
   * 获取特定测验的最高分
   */
  const getBestQuizScore = useCallback(
    (quizId: string): QuizResult | undefined => {
      return progress.quizResults
        .filter((r) => r.quizId === quizId)
        .sort((a, b) => b.score - a.score)[0]
    },
    [progress.quizResults]
  )

  /**
   * 获取所有测验的平均分
   */
  const getAverageQuizScore = useCallback((): number => {
    if (progress.quizResults.length === 0) return 0
    const total = progress.quizResults.reduce((sum, r) => sum + r.score, 0)
    return Math.round(total / progress.quizResults.length)
  }, [progress.quizResults])

  /**
   * 获取已通过的课程数量
   */
  const getPassedQuizCount = useCallback((): number => {
    const passedQuizIds = new Set<string>()
    progress.quizResults.forEach((r) => {
      if (r.score >= 80) {
        passedQuizIds.add(r.quizId)
      }
    })
    return passedQuizIds.size
  }, [progress.quizResults])

  // ========== 课程进度管理 ==========

  /**
   * 更新课程进度
   */
  const updateCourseProgress = useCallback(
    (courseId: string, lessonIndex: number, totalLessons: number) => {
      setProgress((prev) => {
        const existing = prev.courseProgress[courseId]
        const updatedLessons = existing
          ? [...new Set([...existing.completedLessons, lessonIndex])]
          : [lessonIndex]

        return {
          ...prev,
          courseProgress: {
            ...prev.courseProgress,
            [courseId]: {
              courseId,
              startedAt: existing?.startedAt || new Date().toISOString(),
              lastAccessedAt: new Date().toISOString(),
              completedLessons: updatedLessons,
              totalLessons,
              isCompleted: updatedLessons.length === totalLessons,
            },
          },
        }
      })
      updateStudyStreak()
    },
    [setProgress]
  )

  /**
   * 获取课程完成百分比
   */
  const getCourseCompletionPercentage = useCallback(
    (courseId: string): number => {
      const courseProgress = progress.courseProgress[courseId]
      if (!courseProgress) return 0
      return Math.round((courseProgress.completedLessons.length / courseProgress.totalLessons) * 100)
    },
    [progress.courseProgress]
  )

  /**
   * 获取已完成课程数量
   */
  const getCompletedCourseCount = useCallback((): number => {
    return Object.values(progress.courseProgress).filter((c) => c.isCompleted).length
  }, [progress.courseProgress])

  // ========== 学习统计 ==========

  /**
   * 更新学习连续天数
   */
  const updateStudyStreak = useCallback(() => {
    setProgress((prev) => {
      const today = new Date().toISOString().split('T')[0]
      const lastStudy = prev.studyStreak.lastStudyDate

      if (lastStudy === today) {
        return prev // 今天已经学习过了
      }

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      const newStreak = lastStudy === yesterdayStr ? prev.studyStreak.current + 1 : 1

      return {
        ...prev,
        studyStreak: {
          current: newStreak,
          lastStudyDate: today,
          longest: Math.max(newStreak, prev.studyStreak.longest),
        },
      }
    })
  }, [setProgress])

  /**
   * 增加学习时间
   */
  const addStudyTime = useCallback((minutes: number) => {
    setProgress((prev) => ({
      ...prev,
      totalStudyTime: prev.totalStudyTime + minutes,
    }))
  }, [setProgress])

  /**
   * 获取学习统计数据
   */
  const getStudyStats = useCallback(() => {
    return {
      currentStreak: progress.studyStreak.current,
      longestStreak: progress.studyStreak.longest,
      totalStudyTime: progress.totalStudyTime,
      totalVocabularyLearned: getLearnedVocabularyCount(),
      completedCourses: getCompletedCourseCount(),
      passedQuizzes: getPassedQuizCount(),
      averageQuizScore: getAverageQuizScore(),
    }
  }, [
    progress.studyStreak,
    progress.totalStudyTime,
    getLearnedVocabularyCount,
    getCompletedCourseCount,
    getPassedQuizCount,
    getAverageQuizScore,
  ])

  /**
   * 导出学习数据（用于备份或跨设备同步）
   */
  const exportData = useCallback((): string => {
    return JSON.stringify(progress, null, 2)
  }, [progress])

  /**
   * 导入学习数据
   */
  const importData = useCallback((jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString) as UserProgress
      // 验证数据结构
      if (data.vocabulary && data.quizResults && data.courseProgress) {
        setProgress(data)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to import data:', error)
      return false
    }
  }, [setProgress])

  return {
    // 原始数据（谨慎使用）
    progress,

    // 词汇操作
    markVocabularyLearned,
    isVocabularyLearned,
    getLearnedVocabularyCount,
    getVocabularyToReview,

    // 测验操作
    saveQuizResult,
    getBestQuizScore,
    getAverageQuizScore,
    getPassedQuizCount,

    // 课程操作
    updateCourseProgress,
    getCourseCompletionPercentage,
    getCompletedCourseCount,

    // 统计
    getStudyStats,
    addStudyTime,

    // 数据管理
    exportData,
    importData,
    resetProgress,
  }
}

export default useLocalStorage
