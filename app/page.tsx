import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { WhoWeAre } from '@/components/home/WhoWeAre'
import { WelcomeVideo } from '@/components/home/WelcomeVideo'
import { MissionVision } from '@/components/home/MissionVision'
import { UpcomingPrograms } from '@/components/home/UpcomingPrograms'
import { MinistryGroupsTeaser } from '@/components/home/MinistryGroupsTeaser'
import { MusicSection } from '@/components/home/MusicSection'
import { CTABanner } from '@/components/home/CTABanner'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export const metadata: Metadata = {
  title: 'The Transformation Camp — The Place of Your Making',
  description:
    'Join The Transformation Camp (TTC) — a love-centred, Word-compliant, Spirit-empowered ministry transforming believers into purpose-driven sons and daughters of God.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhoWeAre />
      <WelcomeVideo />
      <MissionVision />
      <UpcomingPrograms />
      <MinistryGroupsTeaser />
      <MusicSection />
      <NewsletterSection />
      <CTABanner />
    </>
  )
}
