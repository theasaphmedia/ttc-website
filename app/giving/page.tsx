import type { Metadata } from 'next'
import { GivingHero } from '@/components/giving/GivingHero'
import { GivingForm } from '@/components/giving/GivingForm'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Give — The Transformation Camp',
  description: 'Honor God with your substance. Every seed sown is a life transformed.',
}

export default function GivingPage() {
  return (
    <>
      <GivingHero />

      {/* Giving form */}
      <section id="give-form" className="section-pad bg-white">
        <div className="container-ttc max-w-2xl mx-auto">
          <AnimatedSection variant="fadeUp" className="text-center mb-10">
            <span className="section-label">Give Online</span>
            <h2 className="section-title">
              Every Seed <span className="text-gradient-blue">Transforms a Life</span>
            </h2>
            <p className="mt-4 text-base" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Your giving fuels the mandate — 1 million believers transformed in 3 years.
            </p>
          </AnimatedSection>
          <GivingForm />
        </div>
      </section>
    </>
  )
}
