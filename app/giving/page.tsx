import type { Metadata } from 'next'
import { GivingHero } from '@/components/giving/GivingHero'
import { GivingForm } from '@/components/giving/GivingForm'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { BookOpen, Copy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Give — The Transformation Camp',
  description: 'Honor God with your substance. Every seed sown is a life transformed.',
}

const REASONS = [
  {
    number: '01',
    reason: 'As an act of worship',
    scripture: 'Gen 22:5',
    color: '#f7931e',
  },
  {
    number: '02',
    reason: 'As a demonstration of love to God',
    scripture: 'John 3:16',
    color: '#153093',
  },
  {
    number: '03',
    reason: 'Recognizing God as our source',
    scripture: 'Gen 14:18–20',
    color: '#22b573',
  },
  {
    number: '04',
    reason: 'Partnership with the church to spread the gospel and plant churches',
    scripture: 'Luke 8:1–3',
    color: '#4ea8f9',
  },
  {
    number: '05',
    reason: 'To care for the less privileged, widows, and sponsor free vocational training',
    scripture: 'Deu 10:18',
    color: '#f7931e',
  },
  {
    number: '06',
    reason: "In obedience to God's Word",
    scripture: 'Luke 6:38 · 2 Cor 9:7',
    color: '#153093',
  },
]

const NGN_ACCOUNTS = [
  {
    category: 'Offering',
    name: 'BCI-THE TRANSFORMATION CAMP',
    number: '1308400905',
    bank: 'Providus Bank',
    color: '#f7931e',
  },
  {
    category: 'Tithe',
    name: 'BINAH CHURCH INTERNATIONAL',
    number: '1308382737',
    bank: 'Providus Bank',
    color: '#153093',
  },
  {
    category: 'Welfare & Special',
    name: 'BCI-WELFARE AND SPECIAL CAUSE',
    number: '1308400936',
    bank: 'Providus Bank',
    color: '#22b573',
  },
  {
    category: 'Building Project',
    name: 'BCI-PROJECT',
    number: '1308400929',
    bank: 'Providus Bank',
    color: '#4ea8f9',
  },
]

export default function GivingPage() {
  return (
    <>
      <GivingHero />

      {/* Why We Give */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container-ttc">
          <AnimatedSection variant="fadeUp" className="text-center mb-14">
            <span className="section-label">The Heart Behind Giving</span>
            <h2 className="section-title">
              Why We <span className="text-gradient-blue">Give</span>
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Giving is not an obligation — it is a privilege rooted in Scripture and motivated by love.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REASONS.map((r, i) => (
              <AnimatedSection key={r.number} variant="fadeUp" delay={i * 60}>
                <div
                  className="p-6 rounded-3xl h-full flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                  style={{ background: 'white', border: '1px solid var(--gray-200)' }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-heading font-black text-3xl leading-none"
                      style={{ color: r.color, opacity: 0.18 }}
                    >
                      {r.number}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-heading font-bold"
                      style={{ background: `${r.color}15`, color: r.color }}
                    >
                      <BookOpen size={11} />
                      {r.scripture}
                    </span>
                  </div>
                  <p
                    className="font-heading font-bold text-base leading-snug flex-1"
                    style={{ color: 'var(--dark)' }}
                  >
                    {r.reason}
                  </p>
                  <div
                    className="h-0.5 w-10 rounded-full"
                    style={{ background: r.color }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Giving form */}
      <section id="give-form" className="section-pad bg-white">
        <div className="container-ttc max-w-2xl mx-auto">
          <AnimatedSection variant="fadeUp" className="text-center mb-10">
            <span className="section-label">Give Online</span>
            <h2 className="section-title">
              Every Seed <span className="text-gradient-blue">Transforms a Life</span>
            </h2>
            <p className="mt-4 text-base" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Your giving fuels the mandate — raising 1 million Ministry Leaders.
            </p>
          </AnimatedSection>
          <GivingForm />
        </div>
      </section>

      {/* Bank Transfer Details */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container-ttc max-w-3xl mx-auto">
          <AnimatedSection variant="fadeUp" className="text-center mb-12">
            <span className="section-label">Bank Transfer</span>
            <h2 className="section-title">
              Give via <span className="text-gradient-blue">Bank Transfer</span>
            </h2>
            <p className="mt-4 text-base" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Transfer directly to the account that matches your giving category.
            </p>
          </AnimatedSection>

          {/* NGN Accounts */}
          <div className="mb-10">
            <p className="font-heading font-bold text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-muted)' }}>
              Naira Accounts (NGN) — Providus Bank
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {NGN_ACCOUNTS.map((acc, i) => (
                <AnimatedSection key={acc.category} variant="fadeUp" delay={i * 60}>
                  <div
                    className="p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: 'white', border: `1px solid var(--gray-200)`, borderLeft: `4px solid ${acc.color}` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-heading font-bold px-3 py-1 rounded-full"
                        style={{ background: `${acc.color}15`, color: acc.color }}
                      >
                        {acc.category}
                      </span>
                      <span className="text-xs font-heading" style={{ color: 'var(--text-muted)' }}>Providus Bank</span>
                    </div>
                    <p className="font-heading font-bold text-sm mb-1" style={{ color: 'var(--dark)' }}>
                      {acc.name}
                    </p>
                    <p className="font-heading font-black text-2xl tracking-wider" style={{ color: acc.color }}>
                      {acc.number}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* USD Account */}
          <AnimatedSection variant="fadeUp">
            <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid var(--gray-200)', borderLeft: '4px solid #22b573' }}>
              <p className="font-heading font-bold text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                USD Account (International Giving)
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>Account Name</p>
                  <p className="font-heading font-bold text-sm" style={{ color: 'var(--dark)' }}>BINAH CHURCH INTERNATIONAL</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>Account Number</p>
                  <p className="font-heading font-black text-xl tracking-wider" style={{ color: '#22b573' }}>1308382744</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>SWIFT Code</p>
                  <p className="font-heading font-black text-xl tracking-wider" style={{ color: '#22b573' }}>UMPLNGLA</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <p className="text-center text-sm mt-8" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
            Please send your transfer receipt to{' '}
            <a href="mailto:hello@ttconline.org" className="font-semibold hover:underline" style={{ color: 'var(--egyptian-blue)' }}>
              hello@ttconline.org
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
