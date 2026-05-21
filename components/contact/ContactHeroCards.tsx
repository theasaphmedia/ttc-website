'use client'

import React, { useState } from 'react'
import { MapPin, Mail, Phone, Youtube } from 'lucide-react'

const CARDS = [
  { Icon: MapPin,  label: '38A Ikota Villa', sub: 'Ikota, Lagos, Nigeria',      color: '#4ea8f9' },
  { Icon: Mail,    label: 'Email Us',         sub: 'Contact info coming soon',   color: '#f7931e' },
  { Icon: Phone,   label: 'Phone',            sub: 'Details coming soon',        color: '#22b573' },
  { Icon: Youtube, label: 'Social Media',     sub: 'Follow @jointtc on YouTube', color: '#4ea8f9' },
]

function InfoCard({ Icon, label, sub, color }: typeof CARDS[0]) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 p-4 rounded-2xl cursor-default active:scale-[0.97]"
      style={{
        background: hovered ? `${color}22` : `${color}18`,
        border: `1px solid ${hovered ? color + '60' : color + '30'}`,
        transform: hovered ? 'translateX(6px)' : 'translateX(0)',
        boxShadow: hovered ? `0 8px 24px ${color}25` : 'none',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: hovered ? `${color}30` : `${color}20`,
          color,
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={18} />
      </div>
      <div>
        <p
          className="font-heading font-black text-white text-sm"
          style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
        >
          {label}
        </p>
        <p className="text-xs font-heading" style={{ color: 'rgba(255,255,255,0.55)' }}>{sub}</p>
      </div>
    </div>
  )
}

export function ContactHeroCards() {
  return (
    <div className="hidden lg:flex flex-col gap-4">
      {CARDS.map(card => <InfoCard key={card.label} {...card} />)}
    </div>
  )
}
