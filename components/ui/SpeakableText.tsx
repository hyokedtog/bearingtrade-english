'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'

interface SpeakableTextProps {
  text: string
  children: React.ReactNode
  className?: string
  iconClassName?: string
  showIcon?: boolean
  iconPosition?: 'left' | 'right'
  speakAsTerm?: boolean // 是否作为轴承术语朗读
  rate?: number
}

/**
 * 可朗读文本组件
 * 点击即可朗读文本，再次点击停止
 *
 * 使用示例:
 * <SpeakableText text="Deep Groove Ball Bearing">
 *   Deep Groove Ball Bearing
 * </SpeakableText>
 */
export function SpeakableText({
  text,
  children,
  className,
  iconClassName,
  showIcon = true,
  iconPosition = 'right',
  speakAsTerm = false,
  rate,
}: SpeakableTextProps) {
  const { isSpeaking, currentText, speakQuick, speakBearingTerm, cancel } = useTextToSpeech()

  const isCurrentSpeaking = isSpeaking && currentText === text

  const handleClick = () => {
    if (isCurrentSpeaking) {
      cancel()
    } else {
      if (speakAsTerm) {
        speakBearingTerm(text)
      } else {
        speakQuick(text, rate)
      }
    }
  }

  return (
    <span
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1 cursor-pointer',
        'hover:text-blue-600 transition-colors',
        isCurrentSpeaking && 'text-blue-600',
        className
      )}
      title="点击朗读"
      role="button"
      aria-label={`朗读: ${text}`}
    >
      {iconPosition === 'left' && showIcon && (
        <span className={cn('inline-flex', iconClassName)}>
          {isCurrentSpeaking ? (
            <VolumeX className="h-4 w-4 animate-pulse" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </span>
      )}

      {children}

      {iconPosition === 'right' && showIcon && (
        <span className={cn('inline-flex text-slate-400 hover:text-blue-600', iconClassName)}>
          {isCurrentSpeaking ? (
            <VolumeX className="h-4 w-4 animate-pulse" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </span>
      )}
    </span>
  )
}

/**
 * 词汇卡片朗读组件
 * 专门用于词汇学习卡片
 */
interface VocabularyCardProps {
  word: string
  phonetic?: string
  meaning: string
  onMarkLearned?: () => void
  isLearned?: boolean
}

export function VocabularyCard({
  word,
  phonetic,
  meaning,
  onMarkLearned,
  isLearned,
}: VocabularyCardProps) {
  const { speakBearingTerm, isSpeaking, currentText } = useTextToSpeech()
  const isCurrentSpeaking = isSpeaking && currentText === word

  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-all cursor-pointer',
        'hover:shadow-md hover:border-blue-300',
        isLearned ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex-1"
          onClick={() => speakBearingTerm(word)}
        >
          <div className="flex items-center gap-2">
            <h4 className={cn(
              'text-lg font-semibold',
              isCurrentSpeaking && 'text-blue-600'
            )}>
              {word}
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation()
                speakBearingTerm(word)
              }}
              className="p-1 rounded-full hover:bg-slate-100"
              title="朗读"
            >
              {isCurrentSpeaking ? (
                <VolumeX className="h-4 w-4 text-blue-600 animate-pulse" />
              ) : (
                <Volume2 className="h-4 w-4 text-slate-400" />
              )}
            </button>
          </div>

          {phonetic && (
            <p className="text-sm text-slate-500 font-mono mt-1">{phonetic}</p>
          )}

          <p className="text-slate-700 mt-2">{meaning}</p>
        </div>

        {onMarkLearned && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMarkLearned()
            }}
            className={cn(
              'ml-4 px-3 py-1 rounded-full text-sm font-medium transition-colors',
              isLearned
                ? 'bg-green-100 text-green-700'
                : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700'
            )}
          >
            {isLearned ? '已掌握' : '标记学习'}
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * 对话朗读组件
 * 用于对话气泡中的朗读功能
 */
interface DialogueSpeakButtonProps {
  text: string
  speaker: 'customer' | 'sales'
  className?: string
}

export function DialogueSpeakButton({
  text,
  speaker,
  className,
}: DialogueSpeakButtonProps) {
  const { speakDialogue, isSpeaking, currentText, cancel } = useTextToSpeech()
  const isCurrentSpeaking = isSpeaking && currentText === text

  const handleClick = () => {
    if (isCurrentSpeaking) {
      cancel()
    } else {
      speakDialogue(text, speaker)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'p-2 rounded-full transition-colors',
        'hover:bg-white/50',
        isCurrentSpeaking && 'bg-white/50',
        className
      )}
      title={isCurrentSpeaking ? '停止朗读' : '朗读这句话'}
    >
      {isCurrentSpeaking ? (
        <VolumeX className="h-4 w-4 animate-pulse" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </button>
  )
}

export default SpeakableText
