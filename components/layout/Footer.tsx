import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  courses: [
    { label: '轴承规格确认', href: '/course/specs' },
    { label: '工厂验货', href: '/course/audit' },
    { label: '价格谈判', href: '/course/negotiation' },
    { label: '物流发货', href: '/course/logistics' },
  ],
  life: [
    { label: '客户接待', href: '/course/reception' },
    { label: '展会餐饮', href: '/course/catering' },
    { label: '日常社交', href: '/course/social' },
    { label: '商务礼仪', href: '/course/etiquette' },
  ],
  about: [
    { label: '关于我们', href: '/about' },
    { label: '联系我们', href: '/contact' },
    { label: '使用条款', href: '/terms' },
    { label: '隐私政策', href: '/privacy' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">
                  BearingTrade
                </span>
                <span className="text-xs text-slate-400">English</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-4 max-w-xs">
              垂直于轴承外贸行业的专业英语学习平台，助力外贸人员提升专业英语能力。
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@bearingtrade.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+86 400-888-8888</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>浙江省温州市轴承工业区</span>
              </div>
            </div>
          </div>

          {/* Course Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">外贸专业</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.courses.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Life Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">日常生活</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.life.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">关于</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} BearingTrade English. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
