'use client'

import React, { useState } from 'react'
import { HandHeart, Coins, Building2, Sprout } from 'lucide-react'
import { Field, TextInput } from '../forms/FormField'
import { useTilt } from '@/hooks/useTilt'

type Category = 'offering' | 'tithe' | 'building' | 'special'

const CATEGORIES: { key: Category; icon: React.ElementType; label: string; desc: string; color: string }[] = [
  { key: 'offering', icon: HandHeart,  label: 'Offering', desc: 'Your weekly act of worship',          color: '#f7931e' },
  { key: 'tithe',    icon: Coins,      label: 'Tithe',    desc: 'Returning the first tenth to God',    color: '#153093' },
  { key: 'building', icon: Building2,  label: 'Building', desc: 'Investing in the house of God',       color: '#22b573' },
  { key: 'special',  icon: Sprout,     label: 'Special',  desc: 'Seeds sown for specific causes',      color: '#4ea8f9' },
]

function CategoryCard({
  cat,
  selected,
  onClick,
}: {
  cat: typeof CATEGORIES[0]
  selected: boolean
  onClick: () => void
}) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt<HTMLButtonElement>({ maxTilt: 10, scale: 1.04, speed: 300, glare: true })
  const Icon = cat.icon

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center overflow-hidden relative"
      style={{
        ...(cardStyle as React.CSSProperties),
        background: selected ? `${cat.color}12` : isHovered ? 'white' : 'var(--off-white)',
        border: `2px solid ${selected ? cat.color : isHovered ? cat.color + '40' : 'var(--gray-200)'}`,
        boxShadow: selected ? `0 8px 28px ${cat.color}25` : isHovered ? `0 8px 24px ${cat.color}15` : 'none',
        transition: [(cardStyle as React.CSSProperties).transition, 'background 0.2s ease', 'border-color 0.2s ease', 'box-shadow 0.2s ease'].join(', '),
      }}
      {...handlers}
    >
      <div style={glareStyle} />
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center relative z-10"
        style={{
          background: `${cat.color}18`,
          color: cat.color,
          transform: isHovered || selected ? 'translateZ(14px) scale(1.1)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={18} />
      </div>
      <p
        className="font-heading font-bold text-sm relative z-10"
        style={{ color: selected ? cat.color : 'var(--dark)' }}
      >
        {cat.label}
      </p>
      <p className="text-[10px] leading-tight relative z-10" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
        {cat.desc}
      </p>
    </button>
  )
}

export function GivingForm() {
  const [category, setCategory] = useState<Category>('offering')
  const [form, setForm] = useState({ name: '', email: '', phone: '', amount: '', note: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <div className="space-y-8">
      {/* Category selector */}
      <div>
        <p className="text-xs font-heading font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
          Giving Category
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat.key}
              cat={cat}
              selected={category === cat.key}
              onClick={() => setCategory(cat.key)}
            />
          ))}
        </div>
      </div>

      {/* Online giving — coming soon */}
      <div className="relative p-8 rounded-2xl text-center overflow-hidden" style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)' }}>
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: 'rgba(248,249,255,0.92)', backdropFilter: 'blur(4px)' }}>
          <div className="text-center px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-heading font-bold tracking-widest uppercase" style={{ background: 'rgba(247,147,30,0.15)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}>
              Coming Soon
            </div>
            <h3 className="font-heading font-bold text-xl mb-2" style={{ color: 'var(--dark)' }}>Online Card Payment</h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Our secure Paystack integration is being activated. Use the bank transfer details below to give right now.
            </p>
          </div>
        </div>
        <div className="space-y-4 opacity-30 pointer-events-none">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" required><TextInput placeholder="Your name" /></Field>
            <Field label="Email" required><TextInput placeholder="your@email.com" /></Field>
            <Field label="Phone"><TextInput placeholder="+234 ..." /></Field>
            <Field label="Amount (NGN)" required><TextInput type="number" placeholder="0.00" /></Field>
          </div>
          <button className="w-full py-4 rounded-full font-heading font-bold text-white" style={{ background: '#f7931e' }}>
            Pay Now
          </button>
        </div>
      </div>

    </div>
  )
}
