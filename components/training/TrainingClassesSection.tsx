'use client'

import React, { useState } from 'react'
import { BookOpen, Users, Star, Award, ChevronDown } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { TrainingForm } from '@/components/forms/TrainingForm'
import type { FormType } from '@/types'

interface TrainingClass {
  id: string
  icon: React.ElementType
  color: string
  badge: string
  title: string
  subtitle: string
  audience: string
  description: string
  highlights: string[]
  formType: FormType
}

const CLASSES: TrainingClass[] = [
  {
    id: 'foundation',
    icon: BookOpen,
    color: '#22b573',
    badge: 'Step 1',
    title: 'Transformation Foundation Class',
    subtitle: 'For New Converts',
    audience: 'New converts & those new to faith',
    description:
      "Every great building starts with a strong foundation. The Transformation Foundation Class is your first step into a life of purposeful faith. Designed specifically for new converts, this class walks you through the essentials of the Christian life: who you are in Christ, how to pray, how to read the Word, and what it means to live as a believer in everyday life. No prior knowledge required — just a willing heart. By the end of this class, you will not just know that you are saved; you will understand what that means and how to walk in it every single day.",
    highlights: [
      'Understanding salvation and your identity in Christ',
      'How to pray and build a devotional life',
      'Reading and understanding the Bible',
      'Living as a believer in the real world',
      'Connecting to the TTC community',
    ],
    formType: 'transformation_foundation_class',
  },
  {
    id: 'discipleship',
    icon: Users,
    color: '#4ea8f9',
    badge: 'Step 2',
    title: 'Transformation Discipleship Class',
    subtitle: 'For New Workers',
    audience: 'Believers stepping into service & ministry',
    description:
      "Faith without works is incomplete — and you were saved to serve. The Transformation Discipleship Class is the bridge between conversion and ministry, designed for believers who are ready to move from the pew to active kingdom service. This class equips you with the character, the culture, and the core competencies of a TTC worker: what it means to serve in the house of God, how to handle responsibility, how to work in a team, and how to maintain your personal walk while carrying ministry responsibility. Whether you are joining a ministry group, serving in an outreach, or leading in your sphere, this class prepares you well.",
    highlights: [
      'The culture and values of TTC',
      'Character before calling — servant leadership',
      'Working effectively in ministry teams',
      'Handling responsibility and accountability',
      'Maintaining your personal walk in active service',
    ],
    formType: 'transformation_discipleship_class',
  },
  {
    id: 'ministry-school-l1',
    icon: Star,
    color: '#f7931e',
    badge: 'Level 1',
    title: 'Transformation Ministry School',
    subtitle: 'For Ministers & Pastors — Level 1',
    audience: 'Ministers, pastors & emerging leaders',
    description:
      "Ministry is not just a calling — it is a craft that must be developed. The Transformation Ministry School Level 1 is a structured, comprehensive training programme for ministers and pastors who want to go deeper in the theology, the practice, and the leadership of ministry. This level covers the foundational pillars of ministry: biblical interpretation, preaching and teaching, pastoral care, church administration, and the minister's personal life. You will be stretched, sharpened, and sent out more equipped than you came in. Whether you are an emerging minister or one with years of experience looking to sharpen your tools, this programme meets you where you are.",
    highlights: [
      'Biblical interpretation and hermeneutics',
      'Preaching and teaching effectively',
      'Pastoral care and counselling basics',
      'Church administration and leadership',
      'The personal life and integrity of a minister',
    ],
    formType: 'transformation_ministry_school_l1',
  },
  {
    id: 'ministry-school-l2',
    icon: Award,
    color: '#153093',
    badge: 'Level 2',
    title: 'Transformation Ministry School',
    subtitle: 'For Ministers & Pastors — Level 2',
    audience: 'Ministers & pastors with Level 1 or equivalent',
    description:
      "Level 2 is where ministry leaders go from solid to exceptional. Building on the foundation of Level 1, the Transformation Ministry School Level 2 goes deeper into advanced ministry leadership: apostolic and prophetic dimensions of ministry, planting and leading communities, strategic ministry development, and the global mandate of the local church. This level is for those who are not just doing ministry — they are building it. If God has placed a vision in your heart that is larger than your current capacity, this programme is where capacity is built. Come ready to be challenged, expanded, and commissioned for greater.",
    highlights: [
      'Advanced theology and doctrinal foundations',
      'Apostolic and prophetic dimensions of leadership',
      'Planting and leading ministry communities',
      'Strategic ministry development and vision',
      'The local church and the global mandate',
    ],
    formType: 'transformation_ministry_school_l2',
  },
]

function TrainingCard({ cls, index }: { cls: TrainingClass; index: number }) {
  const [open, setOpen] = useState(false)
  const Icon = cls.icon
  const isEven = index % 2 === 0

  return (
    <AnimatedSection variant={isEven ? 'slideLeft' : 'slideRight'}>
      <div
        className="rounded-3xl overflow-hidden"
        style={{ border: '1px solid var(--gray-200)', background: 'white' }}
      >
        {/* Card header */}
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Icon + badge */}
            <div className="shrink-0">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                style={{ background: `${cls.color}15` }}
              >
                <Icon size={28} style={{ color: cls.color }} />
              </div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-heading font-bold"
                style={{ background: `${cls.color}15`, color: cls.color }}
              >
                {cls.badge}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p
                className="text-xs font-heading font-bold uppercase tracking-widest mb-1"
                style={{ color: cls.color }}
              >
                {cls.subtitle}
              </p>
              <h3
                className="font-heading font-black text-2xl md:text-3xl mb-2"
                style={{ color: 'var(--dark)', letterSpacing: '-0.02em' }}
              >
                {cls.title}
              </h3>
              <p
                className="text-xs font-heading font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                {cls.audience}
              </p>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--text-body)', fontFamily: 'var(--font-open-sans)' }}
              >
                {cls.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2 mb-6">
                {cls.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: cls.color }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: 'var(--text-body)', fontFamily: 'var(--font-open-sans)' }}
                    >
                      {h}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Register toggle */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: cls.color, boxShadow: `0 4px 20px ${cls.color}40` }}
              >
                {open ? 'Close Form' : 'Register Now'}
                <ChevronDown
                  size={14}
                  className="transition-transform duration-300"
                  style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Inline registration form */}
        {open && (
          <div
            className="px-8 md:px-10 pb-8 md:pb-10 pt-0 border-t"
            style={{ borderColor: `${cls.color}20`, background: `${cls.color}05` }}
          >
            <h4
              className="font-heading font-bold text-base mb-5 pt-6"
              style={{ color: 'var(--dark)' }}
            >
              Register for {cls.title}
            </h4>
            <TrainingForm
              formType={cls.formType}
              title={cls.title}
            />
          </div>
        )}
      </div>
    </AnimatedSection>
  )
}

export function TrainingClassesSection() {
  return (
    <section id="classes" className="section-pad" style={{ background: 'var(--off-white)' }}>
      <div className="container-ttc">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-14">
            <span className="section-label">Training Programmes</span>
            <h2 className="section-title mt-3">
              Built for Every{' '}
              <span className="text-gradient-blue">Stage of Growth</span>
            </h2>
            <p
              className="mt-4 text-base leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}
            >
              From new convert to minister — TTC has a class designed for where you are and where you are
              going. Click any class below to register.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {CLASSES.map((cls, i) => (
            <TrainingCard key={cls.id} cls={cls} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection variant="fadeUp">
          <div
            className="mt-14 p-8 md:p-10 rounded-3xl text-center"
            style={{ background: '#153093' }}
          >
            <h3
              className="font-heading font-black text-2xl md:text-3xl text-white mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              Not sure which class is right for you?
            </h3>
            <p
              className="text-base mb-6 max-w-xl mx-auto"
              style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}
            >
              Reach out to us and we will help you find the right starting point for your journey.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-heading font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#f7931e', color: 'white', boxShadow: '0 4px 20px rgba(247,147,30,0.4)' }}
            >
              Talk to Us →
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
