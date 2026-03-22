export interface Course {
  id: string
  title: string
  description: string
  category: 'trade' | 'life'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessons: number
  image: string
  tags: string[]
  learningPoints: string[]
}

export const courses: Course[] = [
  // 外贸专业场景
  {
    id: 'bearing-basics',
    title: '轴承基础术语入门',
    description: '从零开始学习轴承的基本结构、类型和常用术语的英文表达，为后续专业课程打下基础。',
    category: 'trade',
    level: 'beginner',
    duration: '45分钟',
    lessons: 6,
    image: '📐',
    tags: ['轴承知识', '基础术语', '产品介绍'],
    learningPoints: [
      '掌握轴承主要部件的英文名称',
      '了解常见轴承类型的英文表达',
      '学会描述轴承基本参数',
      '熟悉材质和工艺的英文词汇',
    ],
  },
  {
    id: 'inquiry-response',
    title: '高效询盘回复技巧',
    description: '学习如何快速、专业地回复客户的轴承询盘，提高成交转化率。',
    category: 'trade',
    level: 'intermediate',
    duration: '60分钟',
    lessons: 8,
    image: '✉️',
    tags: ['询盘处理', '邮件写作', '客户沟通'],
    learningPoints: [
      '掌握询盘回复的标准结构',
      '学会使用开放式问题引导客户需求',
      '了解不同国家客户的沟通风格差异',
      '掌握报价时的价格谈判话术',
    ],
  },
  {
    id: 'specs-confirmation',
    title: '轴承规格确认对话',
    description: '深入学习与客户确认轴承规格的专业对话，包括尺寸、公差、游隙等关键参数。',
    category: 'trade',
    level: 'intermediate',
    duration: '55分钟',
    lessons: 7,
    image: '📏',
    tags: ['规格确认', '技术参数', '专业对话'],
    learningPoints: [
      '准确描述轴承尺寸参数',
      '理解并表达公差等级',
      '掌握游隙选择的英文沟通',
      '学会确认密封和润滑要求',
    ],
  },
  {
    id: 'factory-audit',
    title: '工厂审核与验货',
    description: '学习陪同客户进行工厂审核和货物检验时的专业英语表达。',
    category: 'trade',
    level: 'advanced',
    duration: '70分钟',
    lessons: 9,
    image: '🏭',
    tags: ['工厂审核', '质量控制', '生产流程'],
    learningPoints: [
      '介绍生产设备和工艺流程',
      '解释质量控制体系',
      '陪同检验时的专业用语',
      '处理客户质疑的沟通技巧',
    ],
  },
  {
    id: 'price-negotiation',
    title: '价格谈判实战',
    description: '掌握外贸价格谈判的核心英语表达，学习心理学技巧在谈判中的应用。',
    category: 'trade',
    level: 'advanced',
    duration: '65分钟',
    lessons: 8,
    image: '💰',
    tags: ['价格谈判', '商务谈判', '心理学技巧'],
    learningPoints: [
      '掌握锚定效应在报价中的运用',
      '学会应对客户砍价的策略',
      '了解互惠原理在谈判中的应用',
      '掌握妥协与让步的表达方式',
    ],
  },
  {
    id: 'logistics-shipping',
    title: '物流与发货沟通',
    description: '学习海运、空运、报关等物流环节的英文专业用语和沟通技巧。',
    category: 'trade',
    level: 'intermediate',
    duration: '50分钟',
    lessons: 6,
    image: '🚢',
    tags: ['物流运输', '报关清关', '发货跟踪'],
    learningPoints: [
      '熟悉各种运输方式的英文表达',
      '掌握包装要求的沟通',
      '了解报关单据的相关术语',
      '学会处理物流异常情况的沟通',
    ],
  },
  // 日常生活场景
  {
    id: 'airport-pickup',
    title: '机场接机与接待',
    description: '从机场接客户到酒店入住的完整流程英语，展现专业接待能力。',
    category: 'life',
    level: 'beginner',
    duration: '40分钟',
    lessons: 5,
    image: '✈️',
    tags: ['机场接机', '酒店入住', '商务接待'],
    learningPoints: [
      '机场接机的寒暄用语',
      '协助办理酒店入住',
      '介绍当地交通和天气',
      '确认次日行程安排',
    ],
  },
  {
    id: 'business-dinner',
    title: '商务宴请英语',
    description: '餐厅预订、点菜、敬酒等商务餐饮场景的专业英语。',
    category: 'life',
    level: 'intermediate',
    duration: '45分钟',
    lessons: 6,
    image: '🍽️',
    tags: ['商务餐饮', '餐桌礼仪', '中国文化'],
    learningPoints: [
      '餐厅预订和特殊要求表达',
      '点菜时介绍中国特色菜肴',
      '敬酒时的得体用语',
      '讨论饮食文化和禁忌',
    ],
  },
  {
    id: 'social-small-talk',
    title: '社交寒暄与闲聊',
    description: '学习与客户建立良好关系的闲聊话题和技巧。',
    category: 'life',
    level: 'intermediate',
    duration: '40分钟',
    lessons: 5,
    image: '💬',
    tags: ['社交技巧', '闲聊话题', '关系建立'],
    learningPoints: [
      '掌握安全的话题选择',
      '学会积极倾听和回应',
      '了解文化差异和禁忌',
      '运用镜像技巧建立信任',
    ],
  },
  {
    id: 'trade-show',
    title: '展会现场交流',
    description: '轴承展会上的展位接待、产品介绍、名片交换等场景英语。',
    category: 'life',
    level: 'intermediate',
    duration: '50分钟',
    lessons: 7,
    image: '🎯',
    tags: ['展会英语', '展位接待', '名片交换'],
    learningPoints: [
      '展位前的主动搭讪',
      '快速吸引客户兴趣的话术',
      '展会期间的咖啡休息交流',
      '展会后的跟进邮件',
    ],
  },
  {
    id: 'gift-giving',
    title: '礼品赠送与接受',
    description: '中国特色礼品的选择、赠送和接受礼仪相关的英语表达。',
    category: 'life',
    level: 'beginner',
    duration: '30分钟',
    lessons: 4,
    image: '🎁',
    tags: ['礼品文化', '商务礼仪', '中国文化'],
    learningPoints: [
      '介绍中国特产和纪念品',
      '得体地赠送礼品',
      '礼貌地接受礼品',
      '表达感谢和回赠意愿',
    ],
  },
]

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id)
}

export function getCoursesByCategory(category: 'trade' | 'life'): Course[] {
  return courses.filter(course => course.category === category)
}

export function getCoursesByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Course[] {
  return courses.filter(course => course.level === level)
}
