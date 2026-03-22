# BearingTrade English

垂直于轴承外贸行业的专业英语学习平台。

## 项目概述

BearingTrade English 是一个专为轴承外贸从业者打造的英语学习网站，涵盖以下核心场景：

### 外贸专业场景
- 轴承规格确认（Specs Confirmation）
- 工厂验货（Factory Audit）
- 价格谈判（Price Negotiation）
- 物流发货（Logistics & Shipping）

### 日常生活场景
- 海外客户接待（Customer Reception）
- 日常社交（Social Small Talk）
- 展会餐饮（Trade Show & Catering）
- 礼品赠送（Gift Giving）

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: 自定义组件
- **部署**: Vercel

## 核心功能

1. **课程学习**
   - 结构化课程体系
   - 学习进度追踪
   - 知识点总结

2. **互动对话**
   - 真实场景对话录音
   - 词汇标注与解释
   - 跟读练习

3. **测验系统**
   - 多种题型支持
   - 即时反馈
   - 成绩统计

4. **营销心理学融入**
   - 谈判技巧小贴士
   - 心理学原理解析

5. **视频教学** (预留接口)
   - 真人实景演示
   - 发音矫正
   - 角色扮演

## 项目结构

```
bearingtrade-english/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式
│   ├── course/             # 课程模块
│   ├── dialogue/           # 对话练习模块
│   ├── quiz/               # 测验模块
│   └── video/              # 视频模块（预留）
├── components/             # 组件
│   ├── ui/                 # 基础UI组件
│   ├── layout/             # 布局组件
│   ├── home/               # 首页组件
│   └── marketing/          # 营销组件
├── lib/                    # 工具库
│   ├── utils.ts            # 通用工具
│   └── data/               # 数据文件
│       ├── courses.ts      # 课程数据
│       ├── dialogues.ts    # 对话数据
│       └── quiz.ts         # 测验数据
├── public/                 # 静态资源
└── ...                     # 配置文件
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建

```bash
npm run build
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置构建命令：`npm run build`
4. 部署

## 设计规范

### 颜色系统

- **主色**: Blue-600 (#2563eb)
- **外贸专业场景**: Orange-500 (#f97316)
- **日常生活场景**: Emerald-500 (#10b981)
- **心理学提示**: Amber-500 (#f59e0b)

### 字体

- **主字体**: Inter
- **备用**: system-ui, sans-serif

## 营销心理学融入

每个课程和对话中都融入了外贸谈判心理学小贴士，包括：

- 锚定效应（Anchoring Effect）
- 互惠原理（Reciprocity）
- 社会认同（Social Proof）
- 稀缺性原理（Scarcity）
- 镜像技巧（Mirroring）

## 许可证

MIT
