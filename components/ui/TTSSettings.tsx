'use client'

import { useTextToSpeech } from '@/hooks/useTextToSpeech'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { Volume2, Gauge, Mic } from 'lucide-react'

/**
 * TTS 设置面板组件
 * 允许用户调整语速和选择语音
 */
export function TTSSettings() {
  const {
    voices,
    selectedVoice,
    currentRate,
    isSupported,
    setRate,
    setVoice,
    defaultRate,
  } = useTextToSpeech()

  if (!isSupported) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-slate-500 text-center">
            您的浏览器不支持语音合成功能
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Volume2 className="h-5 w-5 text-blue-600" />
          语音设置
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 语速调节 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Gauge className="h-4 w-4" />
              语速
            </label>
            <span className="text-sm text-slate-500">
              {currentRate.toFixed(2)}x
              {currentRate === defaultRate && (
                <span className="ml-1 text-xs text-green-600">(推荐)</span>
              )}
            </span>
          </div>

          <Slider
            value={currentRate}
            min={0.5}
            max={1.5}
            step={0.05}
            onChange={setRate}
            marks={[
              { value: 0.5, label: '慢' },
              { value: 0.85, label: '推荐' },
              { value: 1.5, label: '快' },
            ]}
          />

          <p className="text-xs text-slate-500">
            默认 0.85x 语速最适合学习英语发音
          </p>
        </div>

        {/* 语音选择 */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Mic className="h-4 w-4" />
            选择语音
          </label>

          <select
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find((v) => v.name === e.target.value)
              if (voice) setVoice(voice)
            }}
            className="w-full p-2.5 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
                {voice.default && ' - 默认'}
              </option>
            ))}
          </select>

          {voices.length === 0 && (
            <p className="text-xs text-amber-600">
              正在加载可用语音列表...
            </p>
          )}
        </div>

        {/* 测试朗读 */}
        <TestSpeechButton rate={currentRate} />
      </CardContent>
    </Card>
  )
}

/**
 * 测试朗读按钮
 */
function TestSpeechButton({ rate }: { rate: number }) {
  const { speakQuick, isSpeaking, cancel } = useTextToSpeech()

  const testText = "Welcome to BearingTrade English. Let's learn bearing industry English together."

  const handleClick = () => {
    if (isSpeaking) {
      cancel()
    } else {
      speakQuick(testText, rate)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
    >
      <Volume2 className="h-4 w-4" />
      {isSpeaking ? '停止测试' : '测试语音'}
    </button>
  )
}

/**
 * Slider 组件
 */
interface SliderProps {
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  marks?: { value: number; label: string }[]
}

function Slider({ value, min, max, step, onChange, marks }: SliderProps) {
  return (
    <div className="space-y-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />

      {marks && (
        <div className="flex justify-between text-xs text-slate-500">
          {marks.map((mark) => (
            <span
              key={mark.value}
              className={value === mark.value ? 'text-blue-600 font-medium' : ''}
            >
              {mark.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default TTSSettings
