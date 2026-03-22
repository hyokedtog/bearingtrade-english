import { courses } from '@/lib/data/courses'
import CourseDetailClient from './CourseDetailClient'

// 为静态导出生成所有课程路径
export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.id,
  }))
}

export default function CourseDetailPage() {
  return <CourseDetailClient />
}
