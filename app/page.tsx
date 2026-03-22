'use client'

import { HeroSection } from '@/components/home/HeroSection'
import { ScenarioSection } from '@/components/home/ScenarioSection'
import { FeatureSection } from '@/components/home/FeatureSection'
import { CoursePreview } from '@/components/home/CoursePreview'

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <ScenarioSection />
      <CoursePreview />
      <FeatureSection />
    </div>
  )
}
