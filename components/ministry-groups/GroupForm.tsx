'use client'

import React, { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import type { MinistryGroup } from '@/types'

interface GroupFormProps {
  group: MinistryGroup
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const HOW_OPTIONS = ['Social Media', 'Friend / Family', 'Church Service', 'YouTube', 'Other']

export function GroupForm({ group }: GroupFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '',
    why: '', skills: '', how: '',
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: group.formType,
          name: form.name,
          email: form.email,
          phone: form.phone,
          group: group.name,
          location: form.location,
          why: form.why,
          skills: form.skills,
          how_heard: form.how,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-14 gap-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,181,115,0.12)' }}>
          <CheckCircle size={36} style={{ color: '#22b573' }} />
        </div>
        <h3 className="font-heading font-bold text-2xl" style={{ color: 'var(--dark)' }}>
          Application Submitted!
        </h3>
        <p className="text-base max-w-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          Welcome to the <strong>{group.name}</strong>! A member of our team will be in touch with you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Your full name' },
          { key: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com' },
          { key: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+234 ...' },
          { key: 'location', label: 'City, State', type: 'text', required: true, placeholder: 'Lagos, Nigeria' },
        ].map(({ key, label, type, required, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              {label} {required && '*'}
            </label>
            <input
              type={type}
              required={required}
              value={form[key as keyof typeof form]}
              onChange={set(key as keyof typeof form)}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)', color: 'var(--dark)', fontFamily: 'var(--font-open-sans)' }}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
          How did you hear about TTC?
        </label>
        <select value={form.how} onChange={set('how')}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)', color: form.how ? 'var(--dark)' : 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}
        >
          <option value="">Select an option</option>
          {HOW_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
          Why do you want to join this group? *
        </label>
        <textarea required rows={3} value={form.why} onChange={set('why')} placeholder="Share your heart..."
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)', color: 'var(--dark)', fontFamily: 'var(--font-open-sans)' }}
        />
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
          Relevant skills or experience
        </label>
        <textarea rows={3} value={form.skills} onChange={set('skills')} placeholder="E.g. singing, guitar, video editing..."
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)', color: 'var(--dark)', fontFamily: 'var(--font-open-sans)' }}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-heading font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        style={{ background: group.color, boxShadow: `0 4px 20px ${group.color}40` }}
      >
        {status === 'sending' ? 'Submitting...' : <><Send size={15} /> Submit Application</>}
      </button>
    </form>
  )
}
