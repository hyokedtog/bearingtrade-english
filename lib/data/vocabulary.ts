/**
 * BearingTrade English — 词汇表数据结构
 *
 * 使用方式：
 *   import { VOCABULARY_DATA, getWordsByCategory, getDailyWords } from '@/lib/data/vocabulary'
 *
 * 添加新词汇：直接在 VOCABULARY_DATA 数组中追加新的 VocabWord 对象即可。
 */

export type VocabCategory =
  | 'dimension'   // 尺寸参数 — bore, OD, width
  | 'load'        // 载荷参数 — Cr, Cor, axial load
  | 'quality'     // 品质精度 — tolerance, clearance, grade
  | 'material'    // 材料工艺 — chrome steel, ceramic, heat treatment
  | 'trade'       // 贸易术语 — MOQ, lead time, FOB, L/C
  | 'logistics'   // 物流包装 — carton, pallet, airfreight
  | 'negotiation' // 谈判用语 — discount, bulk order, sample
  | 'application' // 应用场景 — spindle, gearbox, motor

export interface VocabWord {
  id: string
  term: string               // 英文术语（完整写法）
  abbreviation?: string      // 缩写，如 "OD", "Cr", "MOQ"
  phonetic: string           // 国际音标
  partOfSpeech: string       // 词性：n. / v. / adj. / abbr.
  chinese: string            // 中文译名
  definition: string         // 英文定义
  definitionChinese: string  // 中文定义
  example: string            // 典型英文例句
  exampleChinese: string     // 对应中文翻译
  category: VocabCategory
  tags?: string[]            // 额外标签，如 ["6204", "P5", "C3"]
  difficulty: 1 | 2 | 3      // 1=基础 / 2=进阶 / 3=专家
  relatedTerms?: string[]    // 关联词 ID，方便扩展
}

// ─── 词汇数据库 ────────────────────────────────────────────────────────────────

export const VOCABULARY_DATA: VocabWord[] = [

  // ── 尺寸参数 ──────────────────────────────────────────────────────────────
  {
    id: 'bore',
    term: 'Bore Diameter',
    abbreviation: 'ID',
    phonetic: '/bɔːr daɪˈæmɪtər/',
    partOfSpeech: 'n.',
    chinese: '内径',
    definition: 'The inner diameter of a bearing — the hole through which the shaft passes.',
    definitionChinese: '轴承内径，即轴穿过的孔的直径，是轴承与轴配合的关键尺寸。',
    example: 'The 6204 bearing has a bore diameter of 20mm.',
    exampleChinese: '6204轴承的内径为20mm。',
    category: 'dimension',
    tags: ['6204', '6205', 'shaft fit'],
    difficulty: 1,
    relatedTerms: ['od', 'width'],
  },
  {
    id: 'od',
    term: 'Outer Diameter',
    abbreviation: 'OD',
    phonetic: '/ˈaʊtər daɪˈæmɪtər/',
    partOfSpeech: 'n.',
    chinese: '外径',
    definition: 'The outside diameter of the bearing outer ring.',
    definitionChinese: '轴承外圈的外径，是轴承与轴承座配合的关键尺寸。',
    example: 'Our 6204 has an OD of 47mm, fitting standard housings.',
    exampleChinese: '我们的6204外径为47mm，适配标准轴承座。',
    category: 'dimension',
    tags: ['housing fit'],
    difficulty: 1,
    relatedTerms: ['bore', 'width'],
  },
  {
    id: 'width',
    term: 'Width',
    phonetic: '/wɪdθ/',
    partOfSpeech: 'n.',
    chinese: '宽度',
    definition: 'The axial dimension of the bearing — the distance between the two side faces.',
    definitionChinese: '轴承的轴向尺寸，即两个侧面之间的距离。',
    example: 'The 6204 bearing width is 14mm.',
    exampleChinese: '6204轴承宽度为14mm。',
    category: 'dimension',
    difficulty: 1,
    relatedTerms: ['bore', 'od'],
  },

  // ── 载荷参数 ──────────────────────────────────────────────────────────────
  {
    id: 'cr',
    term: 'Dynamic Load Rating',
    abbreviation: 'Cr',
    phonetic: '/daɪˈnæmɪk loʊd ˈreɪtɪŋ/',
    partOfSpeech: 'n.',
    chinese: '动载荷额定值',
    definition: 'The constant radial load under which a bearing can theoretically endure one million revolutions (L10 life).',
    definitionChinese: '轴承在此恒定径向载荷下，理论上可运转100万转（L10寿命），是选型的核心参数。',
    example: 'With Cr of 12.8kN, the 6204 is suitable for medium-duty applications.',
    exampleChinese: '6204的Cr为12.8kN，适合中等负载应用。',
    category: 'load',
    tags: ['L10', 'selection'],
    difficulty: 2,
    relatedTerms: ['cor'],
  },
  {
    id: 'cor',
    term: 'Static Load Rating',
    abbreviation: 'Cor',
    phonetic: '/ˈstætɪk loʊd ˈreɪtɪŋ/',
    partOfSpeech: 'n.',
    chinese: '静载荷额定值',
    definition: 'Maximum static load that causes a total permanent deformation of 0.0001 of the rolling element diameter.',
    definitionChinese: '使滚动体产生直径0.0001倍永久变形的最大静载荷，常用于低速或摆动工况选型。',
    example: 'The Cor for this bearing is 6.65kN — check this for slow-speed applications.',
    exampleChinese: '该轴承Cor为6.65kN，低速工况须核查此值。',
    category: 'load',
    difficulty: 2,
    relatedTerms: ['cr'],
  },

  // ── 品质精度 ──────────────────────────────────────────────────────────────
  {
    id: 'clearance',
    term: 'Internal Clearance',
    phonetic: '/ɪnˈtɜːnəl ˈklɪərəns/',
    partOfSpeech: 'n.',
    chinese: '内部游隙',
    definition: 'The total distance through which one bearing ring can be moved relative to the other, in the radial or axial direction.',
    definitionChinese: '一个轴承圈相对于另一个轴承圈，在径向或轴向可移动的总距离。',
    example: 'Select C3 clearance for high-temperature or interference-fit applications.',
    exampleChinese: '高温或过盈配合工况选择C3游隙。',
    category: 'quality',
    tags: ['C2', 'C3', 'CN', 'C4'],
    difficulty: 2,
    relatedTerms: ['tolerance'],
  },
  {
    id: 'tolerance',
    term: 'Dimensional Tolerance',
    phonetic: '/daɪˈmenʃənəl ˈtɒlərəns/',
    partOfSpeech: 'n.',
    chinese: '尺寸公差',
    definition: 'The allowable deviation from a nominal dimension, defining the precision grade of the bearing.',
    definitionChinese: '相对于公称尺寸的允许偏差量，决定轴承的精度等级。',
    example: 'P5 grade tolerance requires bore accuracy within ±0.005mm.',
    exampleChinese: 'P5级公差要求内径精度在±0.005mm以内。',
    category: 'quality',
    tags: ['P0', 'P5', 'P4', 'ABEC'],
    difficulty: 2,
    relatedTerms: ['clearance'],
  },

  // ── 贸易术语 ──────────────────────────────────────────────────────────────
  {
    id: 'moq',
    term: 'Minimum Order Quantity',
    abbreviation: 'MOQ',
    phonetic: '/ˌmɪnɪməm ˈɔːdər ˈkwɒntɪti/',
    partOfSpeech: 'abbr.',
    chinese: '最小订购量',
    definition: 'The smallest quantity a supplier is willing to accept for a single purchase order.',
    definitionChinese: '供应商愿意接受的单次采购订单的最低数量。',
    example: 'Our MOQ for standard bearings is 100 pieces per model.',
    exampleChinese: '我们标准轴承的最小订购量为每型号100件。',
    category: 'trade',
    difficulty: 1,
    relatedTerms: ['leadtime'],
  },
  {
    id: 'leadtime',
    term: 'Lead Time',
    phonetic: '/liːd taɪm/',
    partOfSpeech: 'n.',
    chinese: '交货期',
    definition: 'The total time from placing an order to the goods being ready for shipment.',
    definitionChinese: '从下单到货物备妥可发货的总时间。',
    example: 'Standard lead time is 15 business days from order confirmation.',
    exampleChinese: '标准交货期为确认订单后15个工作日。',
    category: 'trade',
    difficulty: 1,
    relatedTerms: ['moq'],
  },
  {
    id: 'fob',
    term: 'Free On Board',
    abbreviation: 'FOB',
    phonetic: '/friː ɒn bɔːrd/',
    partOfSpeech: 'abbr.',
    chinese: '离岸价（船上交货）',
    definition: 'Incoterm where seller delivers goods on board the vessel, and risk transfers to buyer at that point.',
    definitionChinese: '国际贸易术语，卖方将货物装上船后，风险转移给买方。',
    example: 'Price is USD 1.20/pc FOB Ningbo port.',
    exampleChinese: '价格为每件1.20美元，宁波港离岸价。',
    category: 'trade',
    tags: ['Incoterms', 'CIF', 'EXW'],
    difficulty: 2,
  },
  {
    id: 'coa',
    term: 'Certificate of Conformance',
    abbreviation: 'CoC / CoA',
    phonetic: '/sərˈtɪfɪkət əv ˈkɒnfərmɪŋ/',
    partOfSpeech: 'n.',
    chinese: '合格证 / 符合性证书',
    definition: 'A document certifying that the product meets specified requirements and quality standards.',
    definitionChinese: '证明产品符合规定要求和质量标准的文件。',
    example: 'We provide a certificate of conformance and material test report with every shipment.',
    exampleChinese: '每批货随附合格证和材质检测报告。',
    category: 'quality',
    tags: ['inspection', 'documentation'],
    difficulty: 2,
  },

  // ── 密封润滑 ──────────────────────────────────────────────────────────────
  {
    id: 'seal2rs',
    term: 'Double Rubber Seal',
    abbreviation: '2RS',
    phonetic: '/ˈdʌbəl ˈrʌbər siːl/',
    partOfSpeech: 'n.',
    chinese: '双面橡胶密封圈',
    definition: 'Non-metallic seals on both sides of the bearing, providing excellent dust and moisture protection. Pre-greased and maintenance-free.',
    definitionChinese: '轴承两侧均有非金属密封圈，防尘防水效果优异，出厂预填脂，免维护。',
    example: 'We recommend the 6204-2RS for dusty factory environments.',
    exampleChinese: '我们推荐粉尘环境使用6204-2RS。',
    category: 'quality',
    tags: ['2Z', 'ZZ', 'RS', 'seal type'],
    difficulty: 1,
    relatedTerms: ['clearance'],
  },

  // ──  更多词汇可在此继续添加 ─────────────────────────────────────────────
  // 按照上方格式填写，保持 id 唯一即可
]

// ─── 辅助函数 ──────────────────────────────────────────────────────────────────

/** 按分类筛选词汇 */
export function getWordsByCategory(category: VocabCategory): VocabWord[] {
  return VOCABULARY_DATA.filter((w) => w.category === category)
}

/** 按难度筛选词汇 */
export function getWordsByDifficulty(level: 1 | 2 | 3): VocabWord[] {
  return VOCABULARY_DATA.filter((w) => w.difficulty === level)
}

/** 今日打卡词汇（每天取 N 个，可按日期轮换） */
export function getDailyWords(count = 8): VocabWord[] {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  )
  const start = (dayOfYear * count) % VOCABULARY_DATA.length
  const words: VocabWord[] = []
  for (let i = 0; i < count; i++) {
    words.push(VOCABULARY_DATA[(start + i) % VOCABULARY_DATA.length])
  }
  return words
}

/** 按标签搜索词汇 */
export function searchByTag(tag: string): VocabWord[] {
  return VOCABULARY_DATA.filter((w) => w.tags?.includes(tag))
}

export default VOCABULARY_DATA
