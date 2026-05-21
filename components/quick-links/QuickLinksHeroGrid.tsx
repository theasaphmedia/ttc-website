'use client'

import React, { useState } from 'react'
import {
  UserCheck, MessageCircle, Star, Sparkles, RotateCcw, Heart,
  BookOpen, Users, Globe, Flame, Shield, MapPin, Smile, Award, Mic,
} from 'lucide-react'

const HERO_ICONS = [
  { Icon: UserCheck,    label: 'Membership',    color: '#4ea8f9' },
  { Icon: MessageCircle,label: 'Counseling',     color: '#22b573' },
  { Icon: Star,         label: 'Feedback',       color: '#f7931e' },
  { Icon: Sparkles,     label: 'First Timer',    color: '#4ea8f9' },
  { Icon: RotateCcw,    label: 'Second Timer',   color: '#22b573' },
  { Icon: Heart,        label: 'Volunteer',      color: '#f7931e' },
  { Icon: BookOpen,     label: 'Classes',        color: '#4ea8f9' },
  { Icon: Globe,        label: 'Online Comm.',   color: '#22b573' },
  { Icon: Flame,        label: 'Prayer',         color: '#f7931e' },
  { Icon: Shield,       label: 'Welfare',        color: '#4ea8f9' },
  { Icon: MapPin,       label: 'My City',        color: '#22b573' },
  { Icon: Award,        label: 'Elders Forum',   color: '#f7931e' },
]

function HeroIconCard({
  Icon, label, color, index,
}: typeof HERO_ICONS[0] & { index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center justify-center gap-2 h-20 rounded-2xl cursor-default active:scale-[0.94] touch-float"
      style={{
        animationDelay: `${index * 0.15}s`,
        background: hovered ? `${color}28` : 'rgba(255,255,255,0.07)',
        border: `1px solid ${hovered ? color + '60' : 'rgba(255,255,255,0.12)'}`,
        transform: hovered ? 'translateY(-6px) scale(1.06)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 14px 36px ${color}35` : 'none',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      <div
        style={{
          color: hovered ? color : 'rgba(255,255,255,0.75)',
          transform: hovered ? 'scale(1.25)' : 'scale(1)',
          filter: hovered ? `drop-shadow(0 0 6px ${color}90)` : 'none',
          transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <span
        className="text-[9px] font-heading font-bold tracking-wide uppercase text-center leading-none px-1"
        style={{
          color: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
          transition: 'color 0.3s ease',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function QuickLinksHeroGrid() {
  return (
    <div className="hidden lg:grid grid-cols-4 grid-rows-3 gap-3">
      {HERO_ICONS.map((item, i) => (
        <HeroIconCard key={item.label} {...item} index={i} />
      ))}
    </div>
  )
}
