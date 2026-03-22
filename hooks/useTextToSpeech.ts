'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

/**
 * Text-to-Speech Hook - 基于 Web Speech API
 * 专为 BearingTrade English 的轴承外贸英语学习优化
 *
 * 功能特性：
 * - 支持轴承专业术语朗读
 * - 可调节语速（默认 0.85x）
 * - 支持语音选择
 * - 朗读状态管理
 * - 高亮当前朗读的词汇
 */

// 默认配置
const DEFAULT_CONFIG = {
  rate: 0.85, // 默认语速 0.85x（适合学习）
  pitch: 1.0,
  volume: 1.0,
  lang: 'en-US',
}

// 英语语音优先级列表（优先选择优质语音）
const PREFERRED_VOICES = [
  'Google US English',
  'Microsoft David - English (United States)',
  'Microsoft Mark - English (United States)',
  'Samantha',
  'Alex',
  'Daniel',
  'Google UK English Female',
  'Google UK English Male',
]

export interface TTSOptions {
  text: string
  rate?: number
  pitch?: number
  volume?: number
  voice?: SpeechSynthesisVoice
  onStart?: () => void
  onEnd?: () => void
  onPause?: () => void
  onResume?: () => void
  onBoundary?: (event: SpeechSynthesisEvent) => void
}

export interface TTSState {
  isSpeaking: boolean
  isPaused: boolean
  isSupported: boolean
  currentText: string
  currentRate: number
  voices: SpeechSynthesisVoice[]
  selectedVoice: SpeechSynthesisVoice | null
  error: string | null
}

export function useTextToSpeech() {
  const [state, setState] = useState<TTSState>({
    isSpeaking: false,
    isPaused: false,
    isSupported: false,
    currentText: '',
    currentRate: DEFAULT_CONFIG.rate,
    voices: [],
    selectedVoice: null,
    error: null,
  })

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const synthesisRef = useRef<typeof window.speechSynthesis | null>(null)

  // 检查浏览器支持并初始化
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setState((prev) => ({ ...prev, isSupported: false, error: '您的浏览器不支持语音合成功能' }))
      return
    }

    synthesisRef.current = window.speechSynthesis
    setState((prev) => ({ ...prev, isSupported: true }))

    // 加载可用语音
    const loadVoices = () => {
      const voices = synthesisRef.current?.getVoices() || []

      // 筛选英语语音
      const englishVoices = voices.filter((voice) =>
        voice.lang.startsWith('en') || voice.lang.startsWith('en-US') || voice.lang.startsWith('en-GB')
      )

      // 按优先级排序
      const sortedVoices = englishVoices.sort((a, b) => {
        const aIndex = PREFERRED_VOICES.indexOf(a.name)
        const bIndex = PREFERRED_VOICES.indexOf(b.name)

        if (aIndex === -1 && bIndex === -1) return 0
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })

      const defaultVoice = sortedVoices[0] || englishVoices[0] || voices[0]

      setState((prev) => ({
        ...prev,
        voices: sortedVoices.length > 0 ? sortedVoices : voices,
        selectedVoice: defaultVoice || null,
      }))
    }

    // 某些浏览器需要等待 voiceschanged 事件
    loadVoices()
    synthesisRef.current?.addEventListener('voiceschanged', loadVoices)

    return () => {
      synthesisRef.current?.removeEventListener('voiceschanged', loadVoices)
      cancel()
    }
  }, [])

  /**
   * 朗读文本
   */
  const speak = useCallback((options: TTSOptions) => {
    if (!synthesisRef.current || !state.isSupported) {
      console.warn('Speech synthesis not supported')
      return
    }

    // 取消之前的朗读
    cancel()

    const utterance = new SpeechSynthesisUtterance(options.text)
    utteranceRef.current = utterance

    // 应用配置
    utterance.rate = options.rate ?? state.currentRate ?? DEFAULT_CONFIG.rate
    utterance.pitch = options.pitch ?? DEFAULT_CONFIG.pitch
    utterance.volume = options.volume ?? DEFAULT_CONFIG.volume
    utterance.voice = options.voice || state.selectedVoice

    // 事件处理
    utterance.onstart = () => {
      setState((prev) => ({
        ...prev,
        isSpeaking: true,
        isPaused: false,
        currentText: options.text,
        error: null,
      }))
      options.onStart?.()
    }

    utterance.onend = () => {
      setState((prev) => ({
        ...prev,
        isSpeaking: false,
        isPaused: false,
        currentText: '',
      }))
      options.onEnd?.()
    }

    utterance.onpause = () => {
      setState((prev) => ({ ...prev, isPaused: true }))
      options.onPause?.()
    }

    utterance.onresume = () => {
      setState((prev) => ({ ...prev, isPaused: false }))
      options.onResume?.()
    }

    utterance.onboundary = (event) => {
      options.onBoundary?.(event)
    }

    utterance.onerror = (event) => {
      setState((prev) => ({
        ...prev,
        isSpeaking: false,
        isPaused: false,
        error: `语音合成错误: ${event.error}`,
      }))
    }

    synthesisRef.current.speak(utterance)
  }, [state.currentRate, state.selectedVoice, state.isSupported])

  /**
   * 暂停朗读
   */
  const pause = useCallback(() => {
    if (synthesisRef.current && state.isSpeaking) {
      synthesisRef.current.pause()
    }
  }, [state.isSpeaking])

  /**
   * 恢复朗读
   */
  const resume = useCallback(() => {
    if (synthesisRef.current && state.isPaused) {
      synthesisRef.current.resume()
    }
  }, [state.isPaused])

  /**
   * 取消朗读
   */
  const cancel = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setState((prev) => ({
        ...prev,
        isSpeaking: false,
        isPaused: false,
        currentText: '',
      }))
    }
  }, [])

  /**
   * 设置语速
   */
  const setRate = useCallback((rate: number) => {
    const clampedRate = Math.max(0.1, Math.min(2.0, rate))
    setState((prev) => ({ ...prev, currentRate: clampedRate }))
  }, [])

  /**
   * 设置语音
   */
  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setState((prev) => ({ ...prev, selectedVoice: voice }))
  }, [])

  /**
   * 快速朗读（使用默认设置）
   * 适用于词汇卡片的快速朗读
   */
  const speakQuick = useCallback((text: string, rate?: number) => {
    speak({
      text,
      rate: rate ?? state.currentRate,
    })
  }, [speak, state.currentRate])

  /**
   * 朗读轴承专业术语
   * 自动优化术语的发音（处理缩写、符号等）
   */
  const speakBearingTerm = useCallback((term: string) => {
    // 轴承术语发音优化映射
    const pronunciationMap: Record<string, string> = {
      '6204': 'six two zero four',
      '6205': 'six two zero five',
      '6304': 'six three zero four',
      'P5': 'P five',
      'P4': 'P four',
      'C3': 'C three',
      'C0': 'C zero',
      'ID': 'I D',
      'OD': 'O D',
      'Cr': 'C R',
      'Cor': 'C O R',
      'FOB': 'F O B',
      'CIF': 'C I F',
      'EXW': 'E X W',
      'L/C': 'letter of credit',
      'T/T': 'T T',
      'MOQ': 'M O Q',
      'OEM': 'O E M',
      'ODM': 'O D M',
    }

    let processedText = term

    // 替换缩写
    Object.entries(pronunciationMap).forEach(([abbreviation, pronunciation]) => {
      processedText = processedText.replace(new RegExp(`\\b${abbreviation}\\b`, 'gi'), pronunciation)
    })

    // 处理轴承型号（如 6204-2RS 转为 "six two zero four dash two R S"）
    processedText = processedText.replace(
      /(\d{4})-?(2RS|ZZ|2Z|RS|Z)/gi,
      (match, digits, suffix) => {
        const digitStr = digits.split('').join(' ')
        const suffixStr = suffix.toUpperCase().split('').join(' ')
        return `${digitStr} dash ${suffixStr}`
      }
    )

    speak({
      text: processedText,
      rate: 0.75, // 术语朗读稍慢
    })
  }, [speak])

  /**
   * 朗读对话句子
   * 使用自然的语调，适合对话练习
   */
  const speakDialogue = useCallback((text: string, speaker: 'customer' | 'sales') => {
    // 根据角色微调语调
    const pitch = speaker === 'customer' ? 1.05 : 0.95

    speak({
      text,
      rate: state.currentRate,
      pitch,
    })
  }, [speak, state.currentRate])

  /**
   * 预加载语音（解决某些浏览器首次朗读延迟问题）
   */
  const preloadVoices = useCallback(() => {
    if (synthesisRef.current) {
      // 播放一个无声的字符来初始化语音引擎
      const silentUtterance = new SpeechSynthesisUtterance(' ')
      silentUtterance.volume = 0
      synthesisRef.current.speak(silentUtterance)
      synthesisRef.current.cancel()
    }
  }, [])

  return {
    // 状态
    ...state,

    // 核心方法
    speak,
    speakQuick,
    speakBearingTerm,
    speakDialogue,
    pause,
    resume,
    cancel,

    // 配置
    setRate,
    setVoice,
    preloadVoices,

    // 常量
    defaultRate: DEFAULT_CONFIG.rate,
    minRate: 0.1,
    maxRate: 2.0,
  }
}

/**
 * 简单的朗读按钮 Hook
 * 提供即点即读的简单接口
 */
export function useSpeakButton() {
  const tts = useTextToSpeech()

  const SpeakButton = useCallback(({
    text,
    children,
    className,
    speakAsTerm = false,
  }: {
    text: string
    children: React.ReactNode
    className?: string
    speakAsTerm?: boolean
  }) => {
    const handleClick = () => {
      if (tts.isSpeaking && tts.currentText === text) {
        tts.cancel()
      } else {
        if (speakAsTerm) {
          tts.speakBearingTerm(text)
        } else {
          tts.speakQuick(text)
        }
      }
    }

    return (
      <button
        onClick={handleClick}
        className={className}
        title="点击朗读"
        aria-label={`朗读: ${text}`}
      >
        {children}
      </button>
    )
  }, [tts])

  return {
    ...tts,
    SpeakButton,
  }
}

export default useTextToSpeech
