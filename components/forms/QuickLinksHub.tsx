'use client'

import React, { useState } from 'react'
import { QuickLinkModal } from './QuickLinkModal'
import { useTilt } from '@/hooks/useTilt'
import type { FormType } from '@/types'

interface QuickLink {
  icon: string
  title: string
  description: string
  formType: FormType
  color: string
}

const LINKS: QuickLink[] = [
  { icon: '✝️',  title: 'Membership',            description: 'Become an official member of TTC',              formType: 'membership',            color: '#153093' },
  { icon: '🤝',  title: 'Counseling',             description: 'Request one-on-one pastoral counseling',         formType: 'counseling',            color: '#22b573' },
  { icon: '⭐',  title: 'Feedback Survey',         description: 'Share your experience with TTC',                formType: 'feedback',              color: '#f7931e' },
  { icon: '👋',  title: 'First Timer',             description: 'New here? Let us welcome you properly',          formType: 'first_timer',           color: '#4ea8f9' },
  { icon: '🔄',  title: 'Second Timer',            description: "Back again? We'd love to connect",               formType: 'second_timer',          color: '#153093' },
  { icon: '🙋',  title: 'Volunteer',               description: 'Offer your time and gifts to serve',             formType: 'volunteer',             color: '#22b573' },
  { icon: '📚',  title: 'Membership Class',        description: 'Sign up for our new members class',              formType: 'membership_class',      color: '#f7931e' },
  { icon: '👥',  title: 'Ministry Group Class',    description: 'Begin your ministry group journey',              formType: 'ministry_group_class',  color: '#4ea8f9' },
  { icon: '🌐',  title: 'Online Community',        description: 'Join TTC digital community groups',              formType: 'online_community',      color: '#153093' },
  { icon: '💍',  title: 'Pre-Marital Counseling',  description: 'Prepare well for your marriage',                 formType: 'premarital_counseling', color: '#22b573' },
  { icon: '💑',  title: 'Post-Marital Counseling', description: 'Strengthen and restore your marriage',           formType: 'postmarital_counseling',color: '#f7931e' },
  { icon: '🙏',  title: 'Prayer Request',          description: 'Submit a prayer request to our team',            formType: 'prayer_request',        color: '#4ea8f9' },
  { icon: '🎉',  title: 'Testimony',               description: 'Share what God has done for you',                formType: 'testimony',             color: '#153093' },
  { icon: '❤️',  title: 'Welfare',                 description: 'Request welfare support from TTC',               formType: 'welfare',               color: '#22b573' },
  { icon: '🏙️',  title: 'TIC — My City',           description: 'Bring TTC to your city or nation',              formType: 'tic_city',              color: '#f7931e' },
  { icon: '👧',  title: 'Transformation Kids',     description: 'Register your child with TTC Kids',              formType: 'transformation_kids',   color: '#4ea8f9' },
  { icon: '🎖️',  title: 'Elders Forum',            description: 'Join the TTC Elders Forum',                      formType: 'elders_forum',          color: '#153093' },
  { icon: '⭕',  title: 'Circle Group',            description: 'Join a small intentional fellowship circle',     formType: 'circle_group',          color: '#22b573' },
]

function QuickLinkCard({ link, onClick }: { link: QuickLink; onClick: () => void }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt<HTMLButtonElement>({ maxTilt: 9, scale: 1.02, speed: 350, glare: true })

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="text-left flex items-start gap-4 p-6 rounded-2xl w-full relative overflow-hidden"
      style={{
        ...(cardStyle as React.CSSProperties),
        background: isHovered ? 'white' : 'var(--off-white)',
        border: `1px solid ${isHovered ? link.color + '35' : 'var(--gray-200)'}`,
        boxShadow: isHovered ? `0 16px 48px ${link.color}14, 0 4px 12px rgba(0,0,0,0.06)` : 'none',
        transition: [(cardStyle as React.CSSProperties).transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
      {...handlers}
    >
      <div style={glareStyle} />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 relative z-10"
        style={{
          background: `${link.color}15`,
          transform: isHovered ? 'translateZ(16px) scale(1.1)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
          boxShadow: isHovered ? `0 4px 16px ${link.color}30` : 'none',
        }}
      >
        {link.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 relative z-10">
        <p
          className="font-heading font-bold text-base mb-1"
          style={{
            color: isHovered ? link.color : 'var(--dark)',
            transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
            transition: 'color 0.2s ease, transform 0.3s ease',
          }}
        >
          {link.title}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          {link.description}
        </p>
      </div>

      {/* Arrow — slides in on hover */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 relative z-10"
        style={{
          background: link.color,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(-8px) scale(0.8)',
          transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5"
        style={{
          background: link.color,
          width: isHovered ? '100%' : '0%',
          transition: 'width 0.4s cubic-bezier(0.23,1,0.32,1)',
          opacity: 0.5,
        }}
      />
    </button>
  )
}

export function QuickLinksHub() {
  const [open, setOpen] = useState<{ formType: FormType; title: string } | null>(null)

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LINKS.map((link) => (
          <QuickLinkCard
            key={link.formType}
            link={link}
            onClick={() => setOpen({ formType: link.formType, title: link.title })}
          />
        ))}
      </div>
      <QuickLinkModal
        formType={open?.formType ?? null}
        formTitle={open?.title ?? ''}
        onClose={() => setOpen(null)}
      />
    </>
  )
}
