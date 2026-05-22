'use client'

import React, { useState } from 'react'

const STATS = [
  { value: '1M+',    label: 'Believers to Transform', color: '#4ea8f9' },
  { value: 'Global', label: 'Reach & Impact',          color: '#f7931e' },
  { value: 'July 2025', label: 'TTC Founded',          color: '#22b573' },
  { value: 'Global', label: 'Reach & Impact',          color: '#4ea8f9' },
]

function StatCard({ value, label, color }: typeof STATS[0]) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col justify-center p-6 rounded-2xl cursor-default active:scale-[0.97]"
      style={{
        background: hovered ? `${color}20` : 'rgba(255,255,255,0.06)',
        border: `1px solid ${hovered ? color + '55' : 'rgba(255,255,255,0.1)'}`,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 40px ${color}30` : 'none',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      <span
        className="font-heading font-black text-4xl leading-none mb-2"
        style={{
          color: hovered ? color : color,
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
          display: 'inline-block',
        }}
      >
        {value}
      </span>
      <span
        className="text-xs font-heading font-semibold uppercase tracking-widest"
        style={{
          color: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)',
          transition: 'color 0.3s ease',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function AboutHeroStats() {
  return (
    <div className="hidden lg:grid grid-cols-2 gap-4">
      {STATS.map(stat => <StatCard key={stat.label} {...stat} />)}
    </div>
  )
}
