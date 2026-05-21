'use client'

import React, { useState } from 'react'
import { Music2, Compass, BookOpen, Zap, Globe, Clapperboard, ClipboardList, Users } from 'lucide-react'

const GROUPS = [
  { Icon: Music2,        name: 'Music',       color: '#f7931e' },
  { Icon: Compass,       name: 'Locomotive',  color: '#4ea8f9' },
  { Icon: BookOpen,      name: 'Word (TWG)',  color: '#4ea8f9' },
  { Icon: Zap,           name: 'Power (TPG)', color: '#f7931e' },
  { Icon: Globe,         name: 'Community',   color: '#22b573' },
  { Icon: Clapperboard,  name: 'Media',       color: '#153093' },
  { Icon: ClipboardList, name: 'Admin',       color: '#4ea8f9' },
  { Icon: Users,         name: '7 Groups',    color: '#f7931e' },
]

function GroupIconCard({ Icon, name, color, index }: typeof GROUPS[0] & { index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl p-4 cursor-default active:scale-95"
      style={{
        background: hovered ? `${color}30` : `${color}18`,
        border: `1px solid ${hovered ? color + '70' : color + '30'}`,
        transform: hovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 12px 32px ${color}35` : 'none',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
        animationDelay: `${index * 0.12}s`,
      }}
    >
      <div
        style={{
          color: hovered ? color : 'rgba(255,255,255,0.75)',
          transform: hovered ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={22} />
      </div>
      <span
        className="text-[10px] font-heading font-bold text-center leading-tight"
        style={{
          color: hovered ? 'white' : 'rgba(255,255,255,0.7)',
          transition: 'color 0.3s ease',
        }}
      >
        {name}
      </span>
    </div>
  )
}

export function MinistryGroupsHeroGrid() {
  return (
    <div className="hidden lg:grid grid-cols-4 gap-3">
      {GROUPS.map((g, i) => (
        <GroupIconCard key={g.name} {...g} index={i} />
      ))}
    </div>
  )
}
