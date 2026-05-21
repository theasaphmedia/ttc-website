'use client'

import React, { useState } from 'react'
import { Radio, BookOpen, Flame, Globe } from 'lucide-react'

const HERO_CARDS = [
  { Icon: Radio,    label: 'Fresh Sermons',  sub: 'New messages weekly',  color: '#4ea8f9' },
  { Icon: BookOpen, label: 'Word-Based',     sub: 'Deep Bible teaching',  color: '#f7931e' },
  { Icon: Flame,    label: 'Spirit-Led',     sub: 'Anointed ministry',    color: '#22b573' },
  { Icon: Globe,    label: 'Watch Anywhere', sub: 'Online & on YouTube',  color: '#4ea8f9' },
]

function HeroCard({ Icon, label, sub, color }: typeof HERO_CARDS[0]) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-5 rounded-2xl flex flex-col gap-3 cursor-default select-none active:scale-95"
      style={{
        background: hovered ? `${color}18` : 'rgba(255,255,255,0.06)',
        border: `1px solid ${hovered ? color + '55' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: hovered ? `0 8px 32px ${color}25` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: hovered ? `${color}25` : 'rgba(255,255,255,0.08)',
          color: hovered ? color : 'rgba(255,255,255,0.75)',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="font-heading font-black text-white text-sm mb-0.5">{label}</p>
        <p
          className="text-xs font-heading"
          style={{
            color: hovered ? color : 'rgba(255,255,255,0.5)',
            transition: 'color 0.3s ease',
          }}
        >
          {sub}
        </p>
      </div>
    </div>
  )
}

export function SermonHeroCards() {
  return (
    <div className="hidden lg:grid grid-cols-2 gap-4">
      {HERO_CARDS.map(card => (
        <HeroCard key={card.label} {...card} />
      ))}
    </div>
  )
}
