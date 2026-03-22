/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置 - 适合中国服务器部署（无需Node.js运行时）
  output: 'export',
  distDir: 'dist',
  // 图片优化关闭（静态导出需要）
  images: {
    unoptimized: true,
  },
  // 中国访问优化：禁用可能导致问题的特性
  trailingSlash: true,
}

module.exports = nextConfig
