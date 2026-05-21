'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Music2, Compass, BookOpen, Zap, Globe, Clapperboard, ClipboardList } from 'lucide-react'
import { useTilt } from '@/hooks/useTilt'
import type { MinistryGroup } from '@/types'

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

interface GroupCardProps {
  group: MinistryGroup
  index: number
}

export function GroupCard({ group, index }: GroupCardProps) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({
    maxTilt: 10,
    scale: 1.03,
    speed: 400,
    glare: true,
  })

  const Icon = GROUP_ICONS[group.slug] || Zap

  return (
    <div
      ref={ref}
      {...handlers}
      className="group relative flex flex-col p-7 rounded-3xl overflow-hidden cursor-pointer"
      style={{
        ...cardStyle,
        background: 'var(--off-white)',
        border: `1px solid ${isHovered ? group.color + '40' : 'var(--gray-200)'}`,
        boxShadow: isHovered
          ? `0 20px 60px ${group.color}20, 0 8px 24px rgba(0,0,0,0.08)`
          : '0 2px 8px rgba(0,0,0,0.04)',
        transition: [cardStyle.transition, 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
    >
      {/* Tilt glare */}
      <div style={glareStyle} />

      {/* Background color swell */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${group.color}10 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Index watermark */}
      <span
        className="absolute top-4 right-5 font-heading font-black text-5xl leading-none select-none pointer-events-none"
        aria-hidden="true"
        style={{
          color: group.color,
          opacity: isHovered ? 0.08 : 0.03,
          transform: isHovered ? 'translateY(-4px) scale(1.08)' : 'translateY(0) scale(1)',
          transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)',
          WebkitTextStroke: `1px ${group.color}`,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div
        className="relative z-10 mb-5 w-14 h-14 rounded-2xl flex items-center justify-center touch-icon-pop"
        style={{
          background: `${group.color}15`,
          transform: isHovered ? 'translateZ(20px) scale(1.1)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
          boxShadow: isHovered ? `0 4px 20px ${group.color}30` : 'none',
        }}
      >
        <Icon
          size={24}
          strokeWidth={1.7}
          style={{
            color: group.color,
            transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          }}
        />
      </div>

      {/* Name */}
      <h3
        className="relative z-10 font-heading font-extrabold text-lg leading-tight mb-1"
        style={{
          color: 'var(--dark)',
          transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        {group.name}
      </h3>

      {/* Subtitle */}
      {group.subtitle && (
        <p
          className="relative z-10 text-xs font-heading font-bold uppercase tracking-wide mb-3"
          style={{ color: group.color }}
        >
          {group.subtitle}
        </p>
      )}

      {/* Separator */}
      <div
        className="relative z-10 h-0.5 mb-4 touch-separator-pulse"
        style={{
          background: group.color,
          width: isHovered ? '4rem' : '2rem',
          transition: 'width 0.4s cubic-bezier(0.23,1,0.32,1)',
        }}
      />

      {/* Description */}
      <p
        className="relative z-10 text-sm leading-relaxed flex-1 mb-6"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}
      >
        {group.description}
      </p>

      {/* CTA */}
      <Link
        href={`/ministry-groups/${group.slug}`}
        className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold text-sm text-white self-start group/btn"
        style={{
          background: group.color,
          transform: isHovered ? 'translateZ(15px) translateY(-2px)' : 'translateZ(0)',
          boxShadow: isHovered ? `0 8px 24px ${group.color}50` : 'none',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        {group.intent === 'learn' ? 'Enroll to Learn' : 'Join This Group'}
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover/btn:translate-x-1 touch-arrow-bounce"
        />
      </Link>
    </div>
  )
}
