'use client'

import React from 'react'
import { Search, Users, BookOpen, Globe, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useTilt } from '@/hooks/useTilt'

const STRATEGY_STEPS = [
  { icon: Search,   word: 'Find',  text: "We seek out those who haven't yet encountered Christ — going to where people are.",          color: '#153093' },
  { icon: Users,    word: 'Fold',  text: 'We welcome them into a genuine community of faith, belonging, and purpose.',                  color: '#22b573' },
  { icon: BookOpen, word: 'Feed',  text: 'We nourish believers with rich, practical, Spirit-empowered biblical teaching.',             color: '#f7931e' },
  { icon: Globe,    word: 'Field', text: 'We send equipped believers to transform their cities and spheres of influence.',             color: '#4ea8f9' },
]

const KEY_FACTS = [
  'An expression of Binah Church International',
  'Led by Pastor Daniel Odinaka (P.Dee)',
  'Mandate to transform 1 million Ministry Leaders',
  'Based in Nigeria — with vision to reach Canada, USA, UK/EU & beyond',
  'Bi-weekly campus meetings — online & onsite',
]

function StrategyCard({ step, index }: { step: typeof STRATEGY_STEPS[0]; index: number }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 10, scale: 1.03, speed: 350, glare: true })
  const Icon = step.icon
  return (
    <div
      ref={ref}
      {...handlers}
      className="relative flex flex-col items-center text-center p-6 rounded-2xl overflow-hidden cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? `${step.color}08` : 'var(--off-white)',
        border: `1px solid ${isHovered ? step.color + '30' : 'var(--gray-200)'}`,
        boxShadow: isHovered ? `0 16px 48px ${step.color}18` : 'none',
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 relative z-10"
        style={{
          background: `${step.color}18`,
          color: step.color,
          transform: isHovered ? 'translateZ(16px) scale(1.12)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
          boxShadow: isHovered ? `0 4px 16px ${step.color}30` : 'none',
        }}
      >
        <Icon size={20} />
      </div>
      <p
        className="font-heading font-black text-3xl mb-2 select-none relative z-10"
        style={{
          WebkitTextStroke: `2px ${step.color}`,
          color: isHovered ? step.color : 'transparent',
          transition: 'color 0.3s ease',
          letterSpacing: '-0.03em',
        }}
      >
        {step.word}
      </p>
      <p className="text-xs leading-relaxed relative z-10" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
        {step.text}
      </p>
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(to right, transparent, ${step.color}60, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  )
}

export function TTCStory() {
  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-ttc">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — narrative */}
          <AnimatedSection variant="slideLeft">
            <SectionHeading
              label="Our Story"
              title={<>The Transformation <span className="text-gradient-blue">Campus</span></>}
              align="left"
            />
            <div className="space-y-5 text-base md:text-lg leading-relaxed mt-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              <p>
                The Transformation Camp (TTC) is a{' '}
                <strong style={{ color: 'var(--text-body)' }}>love-centred, Word-compliant, Spirit-empowered</strong>{' '}
                ministry operating under Binah Church International — dedicated to transforming lives
                through powerful, practical, purpose-driven teaching.
              </p>
              <p>
                Founded and led by Pastor Daniel Odinaka (P.Dee), TTC is not just a meeting — it is
                a movement. A campus where God's children come to discover who they are in Christ,
                grow in consistent devotion, and live out their God-given assignment.
              </p>
              <p>
                Our mandate is clear: to transform{' '}
                <strong style={{ color: 'var(--egyptian-blue)' }}>1 million Ministry Leaders</strong>{' '}
                through physical campus and online meetings — currently rooted in Nigeria, with
                vision to expand to Canada, the US, the UK/EU, and beyond.
              </p>
            </div>

            {/* Key facts */}
            <div className="mt-8 space-y-3">
              {KEY_FACTS.map((fact, i) => (
                <AnimatedSection key={i} variant="slideLeft" delay={i * 60}>
                  <div
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:translate-x-2 hover:bg-blue-50/50 cursor-default"
                  >
                    <CheckCircle size={16} style={{ color: '#22b573', flexShrink: 0 }} />
                    <span className="text-sm font-heading font-medium" style={{ color: 'var(--text-body)' }}>{fact}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Right — Strategy steps with tilt */}
          <AnimatedSection variant="slideRight">
            <div className="mb-8">
              <span className="section-label">Our Strategy</span>
              <h3 className="font-heading font-extrabold text-2xl md:text-3xl mt-2" style={{ color: 'var(--dark)' }}>
                Find. Fold. Feed.{' '}
                <span className="text-gradient-blue">Field.</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STRATEGY_STEPS.map((step, i) => (
                <AnimatedSection key={step.word} variant="scaleUp" delay={i * 80}>
                  <StrategyCard step={step} index={i} />
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
