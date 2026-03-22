export interface DialogueLine {
  id: number
  speaker: 'customer' | 'sales'
  text: string
  chinese: string
  audioUrl?: string
  vocabulary?: VocabularyItem[]
  notes?: string
}

export interface VocabularyItem {
  word: string
  phonetic: string
  meaning: string
  example?: string
}

export interface Dialogue {
  id: string
  title: string
  description: string
  category: 'trade' | 'life'
  scene: string
  difficulty: 'easy' | 'medium' | 'hard'
  duration: string
  lines: DialogueLine[]
  psychologyTip?: string
}

export const dialogues: Dialogue[] = [
  {
    id: 'inquiry-6204',
    title: '6204轴承询盘',
    description: '客户询问6204深沟球轴承的规格和报价',
    category: 'trade',
    scene: 'Email Inquiry',
    difficulty: 'easy',
    duration: '3:30',
    lines: [
      {
        id: 1,
        speaker: 'customer',
        text: "Hi, I came across your company profile and I'm interested in your deep groove ball bearings. Do you have 6204 series in stock?",
        chinese: '你好，我看到了贵公司的简介，对你们的深沟球轴承很感兴趣。你们有6204系列的库存吗？',
        vocabulary: [
          { word: 'came across', phonetic: '/kʌm əˈkrɒs/', meaning: '偶然发现' },
          { word: 'profile', phonetic: '/ˈprəʊfaɪl/', meaning: '简介，概况' },
          { word: 'in stock', phonetic: '/ɪn stɒk/', meaning: '有库存' },
        ],
      },
      {
        id: 2,
        speaker: 'sales',
        text: "Hello! Thank you for your interest. Yes, we have 6204 bearings readily available. May I know more about your application and expected quantity?",
        chinese: '您好！感谢您的关注。是的，我们有6204轴承的现货。我可以了解一下您的应用场景和预期采购量吗？',
        vocabulary: [
          { word: 'readily available', phonetic: '/ˈredɪli əˈveɪləbl/', meaning: '随时可用，现货' },
          { word: 'application', phonetic: '/ˌæplɪˈkeɪʃn/', meaning: '应用' },
          { word: 'expected quantity', phonetic: '/ɪkˈspektɪd ˈkwɒntəti/', meaning: '预期数量' },
        ],
        notes: '使用开放式问题引导客户透露更多信息',
      },
      {
        id: 3,
        speaker: 'customer',
        text: "We're looking for 500 pieces for electric motors. What's the lead time if we place an order today?",
        chinese: '我们需要500套用于电动机。如果今天下单，交货期是多久？',
        vocabulary: [
          { word: 'electric motors', phonetic: '/ɪˈlektrɪk ˈməʊtəz/', meaning: '电动机' },
          { word: 'lead time', phonetic: '/liːd taɪm/', meaning: '交货期，前置时间' },
          { word: 'place an order', phonetic: '/pleɪs ən ˈɔːdə/', meaning: '下订单' },
        ],
      },
      {
        id: 4,
        speaker: 'sales',
        text: "For 500 pieces, we can ship within 7 working days. Our 6204 bearings are ideal for electric motors with C3 clearance and steel cages. Would you like me to send the detailed specification sheet?",
        chinese: '500套的话，我们可以在7个工作日内发货。我们的6204轴承非常适合电动机，采用C3游隙和钢保持架。需要我发送详细的规格表吗？',
        vocabulary: [
          { word: 'working days', phonetic: '/ˈwɜːkɪŋ deɪz/', meaning: '工作日' },
          { word: 'clearance', phonetic: '/ˈklɪərəns/', meaning: '游隙' },
          { word: 'steel cages', phonetic: '/stiːl ˈkeɪdʒɪz/', meaning: '钢保持架' },
          { word: 'specification sheet', phonetic: '/ˌspesɪfɪˈkeɪʃn ʃiːt/', meaning: '规格表' },
        ],
        notes: '主动提供详细信息，展现专业性',
      },
      {
        id: 5,
        speaker: 'customer',
        text: "Yes, please. Also, could you quote your best FOB Shanghai price? We're comparing offers from several suppliers.",
        chinese: '好的，请发给我。另外，能报一下你们最优惠的上海港离岸价吗？我们正在比较几家供应商的报价。',
        vocabulary: [
          { word: 'quote', phonetic: '/kwəʊt/', meaning: '报价' },
          { word: 'FOB', phonetic: '/ef əʊ ˈbiː/', meaning: '离岸价（Free On Board）' },
          { word: 'comparing offers', phonetic: '/kəmˈpeərɪŋ ˈɒfəz/', meaning: '比较报价' },
          { word: 'suppliers', phonetic: '/səˈplaɪəz/', meaning: '供应商' },
        ],
      },
      {
        id: 6,
        speaker: 'sales',
        text: "I understand you're evaluating options. Our FOB Shanghai price for 500 pieces is $1.85 per unit. For quantities over 1000, we can offer $1.65. Given your motor application, I'd also recommend considering our sealed version for better durability.",
        chinese: '理解您正在评估选择。500套的上海港离岸价是每件1.85美元。如果数量超过1000套，我们可以给到1.65美元。考虑到您的电机应用，我还推荐您考虑我们的密封版本，耐用性更好。',
        vocabulary: [
          { word: 'evaluating', phonetic: '/ɪˈvæljueɪtɪŋ/', meaning: '评估' },
          { word: 'per unit', phonetic: '/pə ˈjuːnɪt/', meaning: '每单位，每件' },
          { word: 'sealed version', phonetic: '/siːld ˈvɜːʃn/', meaning: '密封版本' },
          { word: 'durability', phonetic: '/ˌdjʊərəˈbɪləti/', meaning: '耐用性' },
        ],
        notes: '使用锚定效应：先报较高价格，再给批量折扣',
      },
    ],
    psychologyTip: '锚定效应（Anchoring Effect）：在谈判中，先提出的价格会成为对方心理的"锚点"。先报正常价格，再给出批量优惠，会让客户感觉占了便宜。',
  },
  {
    id: 'factory-tour-demo',
    title: '工厂参观介绍',
    description: '带领客户参观生产车间，介绍生产流程',
    category: 'trade',
    scene: 'Factory Floor',
    difficulty: 'medium',
    duration: '4:15',
    lines: [
      {
        id: 1,
        speaker: 'sales',
        text: "Welcome to our manufacturing facility! This is our grinding workshop where we process the bearing rings. All machines are CNC controlled for precision.",
        chinese: '欢迎参观我们的生产基地！这是我们的磨削车间，在这里加工轴承套圈。所有设备都是数控的，确保精度。',
        vocabulary: [
          { word: 'manufacturing facility', phonetic: '/ˌmænjuˈfæktʃərɪŋ fəˈsɪləti/', meaning: '生产设施' },
          { word: 'grinding workshop', phonetic: '/ˈɡraɪndɪŋ ˈwɜːkʃɒp/', meaning: '磨削车间' },
          { word: 'CNC controlled', phonetic: '/siː en siː kənˈtrəʊld/', meaning: '数控的' },
          { word: 'precision', phonetic: '/prɪˈsɪʒn/', meaning: '精度' },
        ],
      },
      {
        id: 2,
        speaker: 'customer',
        text: "Impressive! What's the tolerance level you can achieve on the raceway?",
        chinese: '很 impressive！你们在滚道加工上能达到什么公差等级？',
        vocabulary: [
          { word: 'tolerance level', phonetic: '/ˈtɒlərəns ˈlevl/', meaning: '公差等级' },
          { word: 'raceway', phonetic: '/ˈreɪsweɪ/', meaning: '滚道' },
        ],
      },
      {
        id: 3,
        speaker: 'sales',
        text: "We can achieve P5 grade consistently, and P4 for high-precision requirements. Let me show you our quality control lab where we do the final inspection.",
        chinese: '我们通常能达到P5级，高精度要求可以做到P4级。让我带您去看看我们的质量控制实验室，我们在那里进行最终检验。',
        vocabulary: [
          { word: 'consistently', phonetic: '/kənˈsɪstəntli/', meaning: '稳定地，一贯地' },
          { word: 'quality control', phonetic: '/ˈkwɒləti kənˈtrəʊl/', meaning: '质量控制' },
          { word: 'final inspection', phonetic: '/ˈfaɪnl ɪnˈspekʃn/', meaning: '最终检验' },
        ],
      },
    ],
    psychologyTip: '社会认同原理（Social Proof）：在介绍工厂时，提及知名客户或认证（如ISO、客户名单）会增强客户的信任感。人们倾向于跟随他人的选择。',
  },
  {
    id: 'restaurant-dining',
    title: '商务餐厅点餐',
    description: '带客户到特色餐厅用餐，介绍中国美食',
    category: 'life',
    scene: 'Chinese Restaurant',
    difficulty: 'easy',
    duration: '3:45',
    lines: [
      {
        id: 1,
        speaker: 'sales',
        text: "This restaurant is famous for local Wenzhou cuisine. I hope you enjoy the authentic flavors. Do you have any dietary restrictions I should know about?",
        chinese: '这家餐厅以地道的温州菜闻名。希望您喜欢这正宗的味道。您有什么饮食禁忌我需要了解的吗？',
        vocabulary: [
          { word: 'cuisine', phonetic: '/kwɪˈziːn/', meaning: '菜肴，烹饪' },
          { word: 'authentic', phonetic: '/ɔːˈθentɪk/', meaning: '正宗的' },
          { word: 'dietary restrictions', phonetic: '/ˈdaɪətəri rɪˈstrɪkʃnz/', meaning: '饮食禁忌' },
        ],
        notes: '提前询问饮食禁忌，体现细心和专业',
      },
      {
        id: 2,
        speaker: 'customer',
        text: "I eat pretty much everything, though I'm not too good with very spicy food. What's recommended here?",
        chinese: '我基本上什么都吃，不过太辣的有点接受不了。这里有什么推荐菜吗？',
        vocabulary: [
          { word: 'recommended', phonetic: '/ˌrekəˈmendɪd/', meaning: '推荐的' },
        ],
      },
      {
        id: 3,
        speaker: 'sales',
        text: "I'd suggest the steamed sea bass with ginger and scallions. It's a local specialty, flavorful but not spicy. The Dongpo pork is also excellent if you'd like to try a traditional dish.",
        chinese: '我推荐葱姜蒸鲈鱼，这是本地特色菜，味道鲜美但不辣。东坡肉也很不错，如果您想尝尝传统名菜的话。',
        vocabulary: [
          { word: 'steamed sea bass', phonetic: '/stiːmd siː beɪs/', meaning: '蒸鲈鱼' },
          { word: 'scallions', phonetic: '/ˈskæliənz/', meaning: '葱' },
          { word: 'specialty', phonetic: '/ˈspeʃəlti/', meaning: '特色菜' },
          { word: 'flavorful', phonetic: '/ˈfleɪvəfl/', meaning: '味道浓郁的' },
        ],
      },
      {
        id: 4,
        speaker: 'customer',
        text: "Both sound great! Let's have the sea bass and the Dongpo pork. And maybe some vegetables?",
        chinese: '听起来都很不错！我们要鲈鱼和东坡肉吧。再来点蔬菜？',
        vocabulary: [
          { word: 'vegetables', phonetic: '/ˈvedʒtəblz/', meaning: '蔬菜' },
        ],
      },
      {
        id: 5,
        speaker: 'sales',
        text: "Perfect choice! I'll add stir-fried seasonal greens. Would you prefer tea or perhaps try some local rice wine with the meal?",
        chinese: '选得好！我再加个炒时蔬。您想喝茶，还是尝尝本地黄酒配餐？',
        vocabulary: [
          { word: 'stir-fried', phonetic: '/stɜː fraɪd/', meaning: '炒制的' },
          { word: 'seasonal greens', phonetic: '/ˈsiːzənl ɡriːnz/', meaning: '时令蔬菜' },
          { word: 'rice wine', phonetic: '/raɪs waɪn/', meaning: '黄酒，米酒' },
        ],
      },
    ],
    psychologyTip: '互惠原理（Reciprocity）：在商务宴请中，热情周到的招待会让客户产生回报的心理。这种互惠心理有助于建立良好的商务关系。',
  },
]

export function getDialogueById(id: string): Dialogue | undefined {
  return dialogues.find(dialogue => dialogue.id === id)
}

export function getDialoguesByCategory(category: 'trade' | 'life'): Dialogue[] {
  return dialogues.filter(dialogue => dialogue.category === category)
}
