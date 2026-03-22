import { Lightbulb, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PsychologyTipProps {
  tip: string
  variant?: 'inline' | 'banner' | 'card'
  className?: string
  onClose?: () => void
}

export function PsychologyTip({
  tip,
  variant = 'inline',
  className,
  onClose,
}: PsychologyTipProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (variant === 'banner') {
    return (
      <div className={cn(
        'bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-200 py-4',
        className
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900 mb-1">
                外贸谈判心理学小贴士
              </h4>
              <p className="text-amber-800 text-sm">{tip}</p>
            </div>
            {onClose && (
              <button
                onClick={handleClose}
                className="text-amber-600 hover:text-amber-800"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={cn(
        'bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200',
        className
      )}>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
            <Lightbulb className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">
              外贸谈判心理学小贴士
            </h4>
            <p className="text-amber-800 text-sm leading-relaxed">{tip}</p>
          </div>
        </div>
      </div>
    )
  }

  // Inline variant (default)
  return (
    <div className={cn(
      'flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100',
      className
    )}>
      <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-amber-800">{tip}</p>
    </div>
  )
}

// 营销心理学提示语料库
export const psychologyTips = {
  // 锚定效应相关
  anchoring: [
    '锚定效应：在谈判中，先提出的价格会成为对方心理的"锚点"。先报正常价格，再给批量优惠，会让客户感觉获得了更好的交易。',
    '报价技巧：不要一开始就报最低价。留有余地，给客户提供"谈判胜利"的感觉，这样更容易达成交易。',
  ],

  // 互惠原理
  reciprocity: [
    '互惠原理：在商务宴请中，热情周到的招待会让客户产生回报的心理。这种互惠心理有助于建立长期的商务关系。',
    '先给予再索取：在谈判中，先提供一些小帮助或优惠，客户会更有可能在你需要时做出让步。',
  ],

  // 社会认同
  socialProof: [
    '社会认同原理：提及知名客户或行业认证（如ISO），会增强客户的信任感。人们倾向于跟随他人的选择。',
    '展示成功案例：在沟通中提及其他满意客户的情况，会增加新客户对你的信任。',
  ],

  // 稀缺性
  scarcity: [
    '稀缺性原理：适当强调产能紧张或原料价格上涨，会让客户更珍惜当前的报价机会。',
    '限时策略：给报价设置合理的有效期，可以增加客户的决策紧迫感。',
  ],

  // 镜像技巧
  mirroring: [
    '镜像技巧：适度模仿客户的语速、用词和表达方式，会让对方感到被理解和认同，从而建立更好的信任关系。',
    '语言同步：在邮件沟通中，注意观察客户常用的表达方式，并在回复中适度使用。',
  ],

  // 名字的力量
  namePower: [
    '记住名字：在社交场合，记住并使用对方的名字是建立良好关系的关键。人们最喜欢听到的就是自己的名字。',
    '自然使用名字：在对话中自然地使用对方名字3-4次，会大大提升好感度和信任感。',
  ],

  // 开放式问题
  openEnded: [
    '开放式问题：使用开放式问题引导客户透露更多信息。例如"Could you share more about..."而不是简单的Yes/No问题。',
    '倾听技巧：提出开放式问题后，认真倾听客户的回答，不要急于推销产品。',
  ],

  // 让步策略
  concession: [
    '让步策略：在谈判中，不要一次性做出所有让步。分阶段、有条件地让步，让每一次让步都显得更有价值。',
    '交换原则：每次让步都要求对方给予相应的回报，这样才不会显得你的让步是理所当然的。',
  ],
}

// 获取随机提示
export function getRandomTip(category?: keyof typeof psychologyTips): string {
  const tips = category
    ? psychologyTips[category]
    : Object.values(psychologyTips).flat()
  return tips[Math.floor(Math.random() * tips.length)]
}
