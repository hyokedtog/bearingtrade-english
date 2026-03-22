'use client'

import { HeroSection } from '@/components/home/HeroSection'
import { DialoguePracticeSection } from '@/components/home/DialoguePracticeSection'
import { VocabDrillSection } from '@/components/home/VocabDrillSection'
import { ReadingQuizSection } from '@/components/home/ReadingQuizSection'
import { ScenarioSection } from '@/components/home/ScenarioSection'
import { FeatureSection } from '@/components/home/FeatureSection'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DialoguePracticeSection />
      <VocabDrillSection />
      <ReadingQuizSection />
      <ScenarioSection />
      <FeatureSection />
    </div>
  )
}
