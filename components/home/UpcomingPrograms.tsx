'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useTilt } from '@/hooks/useTilt'
import { getNextServiceDates, formatServiceDate, getCountdown } from '@/lib/schedule'

function ProgramCard({
  service,
  index,
}: {
  service: ReturnType<typeof getNextServiceDates>[0]
  index: number
}) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({
    maxTilt: 7,
    scale: 1.02,
    speed: 400,
    glare: true,
  })

  const countdown = getCountdown(service.date)
  const isImminent = ['Today', 'Tomorrow'].includes(countdown) || countdown.includes('days')
  const isFirst = index === 0
  const month = service.date.toLocaleDateString('en-NG', { month: 'short' }).toUpperCase()
  const day = service.date.getDate()

  return (
    <AnimatedSection variant="fadeUp" delay={index * 100}>
      <div
        ref={ref}
        {...handlers}
        className="relative flex flex-col rounded-3xl overflow-hidden h-full cursor-default"
        style={{
          ...cardStyle,
          border: `1px solid ${isHovered ? (isFirst ? 'rgba(255,255,255,0.25)' : '#153093' + '30') : 'var(--gray-200)'}`,
          boxShadow: isHovered
            ? isFirst
              ? '0 20px 60px rgba(21,48,147,0.35)'
              : '0 16px 48px rgba(21,48,147,0.12)'
            : '0 2px 8px rgba(0,0,0,0.04)',
          transition: [cardStyle.transition, 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
        }}
      >
        {/* Glare overlay */}
        <div style={glareStyle} />

        {/* Date badge header */}
        <div
          className="flex items-center gap-5 p-6"
          style={{
            background: isFirst ? 'var(--egyptian-blue)' : 'var(--off-white)',
            transition: 'background 0.3s ease',
          }}
        >
          {/* Calendar block */}
          <div
            className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl shrink-0"
            style={{
              background: isFirst ? 'rgba(255,255,255,0.15)' : 'white',
              border: isFirst ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--gray-200)',
              transform: isHovered ? 'translateZ(16px) scale(1.05)' : 'translateZ(0) scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
              boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
            }}
          >
            <span className="font-heading font-bold text-xs tracking-widest" style={{ color: isFirst ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
              {month}
            </span>
            <span className="font-heading font-black text-2xl leading-none" style={{ color: isFirst ? 'white' : 'var(--dark)' }}>
              {day}
            </span>
          </div>

          <div className="flex-1">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold mb-2"
              style={{
                background: isImminent ? 'rgba(247,147,30,0.15)' : isFirst ? 'rgba(255,255,255,0.15)' : 'var(--gray-100)',
                color: isImminent ? '#f7931e' : isFirst ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
              }}
            >
              {isImminent && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
              {countdown}
            </div>
            <p className="font-heading font-bold text-base" style={{ color: isFirst ? 'white' : 'var(--dark)' }}>
              {service.label}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3 p-6 bg-white flex-1">
          {[
            { icon: Calendar, text: formatServiceDate(service.date), color: 'var(--argentinian-blue)' },
            { icon: Clock,    text: '12:00 PM (WAT)',                color: 'var(--argentinian-blue)' },
            { icon: MapPin,   text: 'Location / Stream — coming soon', color: 'var(--argentinian-blue)' },
          ].map(({ icon: Icon, text, color }, j) => (
            <div
              key={j}
              className="flex items-center gap-3"
              style={{
                transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                transition: `transform 0.35s cubic-bezier(0.23,1,0.32,1) ${j * 40}ms`,
              }}
            >
              <Icon size={14} style={{ color }} />
              <span className="text-sm" style={{ color: j === 2 ? 'var(--text-muted)' : 'var(--text-body)', fontFamily: 'var(--font-open-sans)' }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export function UpcomingPrograms() {
  const upcoming = getNextServiceDates(3)

  return (
    <section className="section-pad bg-white">
      <div className="container-ttc">
        <AnimatedSection variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            label="Programs"
            title={<>Upcoming <span className="text-gradient-blue">Services</span></>}
            align="left"
          />
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 font-heading font-bold text-sm tracking-wide shrink-0 group transition-all duration-200 hover:gap-3"
            style={{ color: 'var(--egyptian-blue)' }}
          >
            Full Schedule
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {upcoming.map((service, i) => (
            <ProgramCard key={i} service={service} index={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/programs" className="btn-primary group transition-all duration-300 hover:-translate-y-0.5">
            View All Programs
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
