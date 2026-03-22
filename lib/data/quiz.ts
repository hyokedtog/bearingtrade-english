export interface QuizQuestion {
  id: number
  type: 'multiple_choice' | 'fill_blank' | 'listening' | 'scenario'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  hint?: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  courseId: string
  timeLimit: number // in minutes
  totalQuestions: number
  passingScore: number // percentage
  questions: QuizQuestion[]
}

export const quizzes: Quiz[] = [
  {
    id: 'quiz-bearing-basics',
    title: '轴承基础术语测试',
    description: '测试你对轴承基本术语和结构的掌握程度',
    courseId: 'bearing-basics',
    timeLimit: 15,
    totalQuestions: 5,
    passingScore: 80,
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: '"Deep groove ball bearing" 对应的中文是什么？',
        options: [
          '圆锥滚子轴承',
          '深沟球轴承',
          '圆柱滚子轴承',
          '角接触球轴承',
        ],
        correctAnswer: 1,
        explanation: 'Deep groove ball bearing 是深沟球轴承的标准英文名称，是最常见的轴承类型之一。',
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: '轴承的 "inner ring" 指的是哪个部件？',
        options: [
          '外圈',
          '内圈',
          '滚动体',
          '保持架',
        ],
        correctAnswer: 1,
        explanation: 'Inner ring 是内圈，outer ring 是外圈。Inner 表示内部的，outer 表示外部的。',
      },
      {
        id: 3,
        type: 'fill_blank',
        question: '轴承型号 6204 中的 "04" 表示内径为 _____ mm。',
        correctAnswer: '20',
        explanation: '轴承型号的后两位数字乘以 5 就是内径尺寸。04 × 5 = 20mm。',
        hint: '后两位数字 × 5 = 内径（mm）',
      },
      {
        id: 4,
        type: 'multiple_choice',
        question: '"Cage" 在轴承中指的是什么？',
        options: [
          '密封圈',
          '保持架',
          '防尘盖',
          '润滑脂',
        ],
        correctAnswer: 1,
        explanation: 'Cage 是保持架，用于分隔滚动体，防止它们相互接触。',
      },
      {
        id: 5,
        type: 'scenario',
        question: '客户邮件中提到 "What\'s the ID and OD of bearing 6205?"，你应该如何回复？',
        options: [
          'ID is 25mm, OD is 52mm',
          'ID is 20mm, OD is 47mm',
          'ID is 30mm, OD is 62mm',
          'ID is 25mm, OD is 47mm',
        ],
        correctAnswer: 0,
        explanation: '6205轴承的内径(ID)是25mm(05×5)，外径(OD)是52mm。ID是Inner Diameter的缩写，OD是Outer Diameter的缩写。',
      },
    ],
  },
  {
    id: 'quiz-inquiry-response',
    title: '询盘回复技巧测试',
    description: '测试你对询盘回复流程和谈判心理学的理解',
    courseId: 'inquiry-response',
    timeLimit: 20,
    totalQuestions: 5,
    passingScore: 80,
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: '在回复客户询盘时，以下哪个是开放式问题（Open-ended Question）？',
        options: [
          'Do you need 500 pieces?',
          'What is your target price?',
          'Can you accept our payment terms?',
          'Is this for immediate delivery?',
        ],
        correctAnswer: 1,
        explanation: '开放式问题不能用简单的Yes/No回答。"What is your target price?" 需要详细回答，因此是开放式问题。',
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: '"Lead time" 在外贸中是什么意思？',
        options: [
          '交货期',
          '运输时间',
          '付款期限',
          '报价有效期',
        ],
        correctAnswer: 0,
        explanation: 'Lead time 是交货期或前置时间，指从下单到交货所需的时间。',
      },
      {
        id: 3,
        type: 'multiple_choice',
        question: '当客户说 "Your price is too high" 时，以下哪种回应最恰当？',
        options: [
          'Sorry, our price is fixed',
          'I understand. Could you share your target price so I can see how we can help?',
          'But our quality is the best',
          'You get what you pay for',
        ],
        correctAnswer: 1,
        explanation: '用开放式问题了解客户的目标价格，既表现了合作意愿，又能获取重要谈判信息。',
      },
      {
        id: 4,
        type: 'fill_blank',
        question: 'FOB 是 _____ 的缩写，意思是 "离岸价"。',
        correctAnswer: 'Free On Board',
        explanation: 'FOB = Free On Board，表示货物越过船舷后，风险和费用就转移给买方。',
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: '锚定效应（Anchoring Effect）在价格谈判中如何应用？',
        options: [
          '先报一个较高价格，再给出折扣',
          '直接报最低价以赢得订单',
          '不报价格，让客户先出价',
          '每次报价都比竞争对手低',
        ],
        correctAnswer: 0,
        explanation: '锚定效应是指先提出的价格会成为心理参考点。先报较高价格，再给折扣，会让客户感觉获得了优惠。',
      },
    ],
  },
  {
    id: 'quiz-business-dinner',
    title: '商务餐饮礼仪测试',
    description: '测试你对商务宴请场景英语的掌握',
    courseId: 'business-dinner',
    timeLimit: 15,
    totalQuestions: 5,
    passingScore: 80,
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: '想询问客户是否有饮食禁忌，应该怎么说？',
        options: [
          'What food do you hate?',
          'Do you have any dietary restrictions?',
          'Why can\'t you eat some food?',
          'Are you a picky eater?',
        ],
        correctAnswer: 1,
        explanation: '"Dietary restrictions" 是询问饮食禁忌的礼貌且专业的表达方式。',
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: '"I\'d like to propose a toast" 是什么意思？',
        options: [
          '我想点烤面包',
          '我想提个建议',
          '我想敬一杯酒',
          '我想换个话题',
        ],
        correctAnswer: 2,
        explanation: 'Propose a toast 是敬酒的意思，是商务宴请中的常用表达。',
      },
      {
        id: 3,
        type: 'fill_blank',
        question: '"这份菜单上的推荐菜" 用英语说是 "The _____ dishes on this menu"。',
        correctAnswer: 'recommended',
        explanation: 'Recommended 是 recommend 的过去分词形式，作形容词表示"推荐的"。',
      },
      {
        id: 4,
        type: 'multiple_choice',
        question: '客户说 "I\'m a vegetarian"，意思是：',
        options: [
          '我是素食者',
          '我喜欢蔬菜',
          '我对蔬菜过敏',
          '我只吃肉',
        ],
        correctAnswer: 0,
        explanation: 'Vegetarian 是素食者，不吃肉类。Vegan 是严格的素食者，不吃任何动物制品。',
      },
      {
        id: 5,
        type: 'scenario',
        question: '敬酒时，你想表达 "为了我们的合作和友谊"，应该怎么说？',
        options: [
          'For our business and friend',
          'To our cooperation and friendship',
          'Cheers for we work together',
          'Drink for our relationship',
        ],
        correctAnswer: 1,
        explanation: '敬酒时用 "To..." 开头表示"为了..."，是最标准、最得体的表达方式。',
      },
    ],
  },
]

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.id === id)
}

export function getQuizByCourseId(courseId: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.courseId === courseId)
}
