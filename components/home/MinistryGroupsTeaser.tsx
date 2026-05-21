'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Music2, Compass, BookOpen, Zap, Globe, Clapperboard, ClipboardList } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useTilt } from '@/hooks/useTilt'

import type { LucideIcon } from 'lucide-react'

const GROUP_ICONS: Record<string, LucideIcon> = {
  'music-group': Music2,
  'locomotive-group': Compass,
  'transformative-word-group': BookOpen,
  'tremendous-power-group': Zap,
  'community-impact-group': Globe,
  'media-operations-group': Clapperboard,
  'administrative-support-group': ClipboardList,
}

const GROUPS = [
  { slug: 'music-group',                name: 'Music Group',             abbr: undefined,  tagline: 'Anointed sounds that usher in presence',                  color: '#153093', bg: '#eef2ff' },
  { slug: 'locomotive-group',           name: 'Locomotive Group',        abbr: 'MJK',      tagline: 'Making Jesus Known through follow-up',                   color: '#22b573', bg: '#ecfdf5' },
  { slug: 'transformative-word-group',  name: 'Transformative Word',     abbr: 'TWG',      tagline: 'Rooting believers in the Word',                           color: '#f7931e', bg: '#fff7ed' },
  { slug: 'tremendous-power-group',     name: 'Tremendous Power',        abbr: 'TPG',      tagline: 'Spirit-empowered ministry and intercession',             color: '#153093', bg: '#eef2ff' },
  { slug: 'community-impact-group',     name: 'Community Impact',        abbr: 'GIP',      tagline: 'Transforming communities, cities, nations',              color: '#22b573', bg: '#ecfdf5' },
  { slug: 'media-operations-group',     name: 'Media Operations',        abbr: undefined,  tagline: 'Engineering · Design · Social · AV · Photography',       color: '#4ea8f9', bg: '#eff6ff' },
  { slug: 'administrative-support-group', name: 'Administrative Support', abbr: undefined, tagline: 'Admin, protocol, and operations excellence',              color: '#6b7280', bg: '#f9fafb' },
]

function TeaserCard({ group, index }: { group: typeof GROUPS[0], index: number }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({
    maxTilt: 8,
    scale: 1.03,
    speed: 350,
    glare: true,
  })

  const Icon = GROUP_ICONS[group.slug] || Zap

  return (
    <AnimatedSection variant="fadeUp" delay={index * 60}>
      <Link
        href={`/ministry-groups/${group.slug}`}
        className="group flex flex-col p-6 rounded-2xl h-full block"
        style={{
          ...cardStyle,
          background: isHovered ? 'white' : group.bg,
          border: `1px solid ${isHovered ? group.color + '40' : group.color + '20'}`,
          boxShadow: isHovered
            ? `0 16px 48px ${group.color}18, 0 4px 12px rgba(0,0,0,0.06)`
            : '0 1px 4px rgba(0,0,0,0.04)',
          transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
          position: 'relative',
          overflow: 'hidden',
        }}
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        {...(handlers as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {/* Glare */}
        <div style={glareStyle} />

        {/* Icon container */}
        <div
          className="mb-4 w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
          style={{
            background: `${group.color}18`,
            transform: isHovered ? 'translateZ(15px) scale(1.1)' : 'translateZ(0) scale(1)',
            transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
            boxShadow: isHovered ? `0 4px 16px ${group.color}30` : 'none',
          }}
        >
          <Icon
            size={24}
            strokeWidth={1.7}
            style={{
              color: group.color,
              transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
              transform: isHovered ? 'scale(1.15)' : 'scale(1)',
            }}
          />
        </div>

        <div className="flex items-center gap-2 mb-1 relative z-10">
          <h3 className="font-heading font-bold text-base leading-tight" style={{ color: 'var(--dark)' }}>
            {group.name}
          </h3>
          {group.abbr && (
            <span
              className="text-xs font-heading font-bold px-1.5 py-0.5 rounded"
              style={{ background: `${group.color}20`, color: group.color }}
            >
              {group.abbr}
            </span>
          )}
        </div>

        <p
          className="text-xs leading-relaxed flex-1 mb-4 relative z-10"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}
        >
          {group.tagline}
        </p>

        {/* Expanding separator */}
        <div
          className="h-px mb-3 relative z-10"
          style={{
            background: group.color,
            width: isHovered ? '100%' : '2rem',
            opacity: isHovered ? 0.3 : 0.6,
            transition: 'width 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease',
          }}
        />

        <span
          className="inline-flex items-center gap-1 text-xs font-heading font-bold relative z-10"
          style={{
            color: group.color,
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          Join Group
          <ArrowRight size={12} />
        </span>
      </Link>
    </AnimatedSection>
  )
}

export function MinistryGroupsTeaser() {
  return (
    <section className="section-pad" style={{ background: 'var(--off-white)' }}>
      <div className="container-ttc">
        <AnimatedSection variant="fadeUp" className="max-w-2xl mx-auto text-center mb-14">
          <SectionHeading
            label="Ministry Groups"
            title={
              <>
                Find Your Place.{' '}
                <span className="text-gradient-blue">Serve Your Purpose.</span>
              </>
            }
            subtitle="Every member of TTC belongs to a group — your family, your assignment, your growth community. Discover where you fit."
            align="center"
          />
        </AnimatedSection>

        {/* ── Mobile: horizontal swipe ── */}
        <div className="md:hidden -mx-4 px-4">
          <div
            className="flex gap-3 pb-4"
            style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`.mg-swipe::-webkit-scrollbar{display:none}`}</style>
            {GROUPS.map((group, i) => (
              <div
                key={group.slug}
                style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 'calc(80vw - 1rem)' }}
              >
                <TeaserCard group={group} index={i} />
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] font-heading font-bold tracking-widest uppercase mt-1 mb-6" style={{ color: 'var(--text-muted)' }}>
            ← Swipe to explore →
          </p>
        </div>

        {/* ── Desktop: grid ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {GROUPS.map((group, i) => (
            <TeaserCard key={group.slug} group={group} index={i} />
          ))}

          {/* CTA card — desktop only */}
          <AnimatedSection variant="fadeUp" delay={GROUPS.length * 60}>
            <div
              className="flex flex-col items-center justify-center p-6 rounded-2xl text-center h-full min-h-[180px] relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #153093 0%, #0f2270 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(78,168,249,0.15) 0%, transparent 70%)' }}
              />
              <div className="mb-3 relative z-10 flex items-center justify-center w-12 h-12 rounded-2xl" style={{ background: 'rgba(247,147,30,0.2)' }}>
                <Zap size={24} strokeWidth={1.7} style={{ color: '#f7931e' }} />
              </div>
              <p className="font-heading font-bold text-white text-sm mb-4 leading-tight relative z-10">
                Not sure where you fit?
              </p>
              <Link
                href="/ministry-groups"
                className="px-4 py-2.5 rounded-full font-heading font-bold text-xs text-white relative z-10 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: '#f7931e', boxShadow: '0 4px 16px rgba(247,147,30,0.4)' }}
              >
                Explore All Groups
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* CTA card — mobile only, always below swipe */}
        <div className="md:hidden mt-4">
          <div
            className="flex flex-col items-center justify-center p-6 rounded-2xl text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #153093 0%, #0f2270 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="mb-3 relative z-10 flex items-center justify-center w-12 h-12 rounded-2xl" style={{ background: 'rgba(247,147,30,0.2)' }}>
              <Zap size={24} strokeWidth={1.7} style={{ color: '#f7931e' }} />
            </div>
            <p className="font-heading font-bold text-white text-sm mb-4 leading-tight relative z-10">
              Not sure where you fit?
            </p>
            <Link
              href="/ministry-groups"
              className="px-4 py-2.5 rounded-full font-heading font-bold text-xs text-white relative z-10 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: '#f7931e', boxShadow: '0 4px 16px rgba(247,147,30,0.4)' }}
            >
              Explore All Groups
            </Link>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/ministry-groups"
            className="btn-outline group transition-all duration-300 hover:-translate-y-0.5"
          >
            View All Ministry Groups
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
