'use client'

import React, { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Field, TextInput, Textarea, Select } from './FormField'
import type { FormType } from '@/types'

type Status = 'idle' | 'sending' | 'success' | 'error'

interface TrainingFormProps {
  formType: FormType
  className?: string
  title?: string
}

const HOW_HEARD = [
  'TTC Service',
  'Social Media',
  'Friend / Family',
  'WhatsApp',
  'YouTube',
  'Other',
]

export function TrainingForm({ formType, className = '', title }: TrainingFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    howHeard: '',
    notes: '',
  })

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: formType,
          name: form.name,
          email: form.email,
          phone: form.phone,
          how_heard: form.howHeard,
          notes: form.notes,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'HTTP ' + res.status }))
        setErrorMsg(body?.error ?? 'HTTP ' + res.status)
        setStatus('error')
        return
      }
      setStatus('success')
    } catch (err) {
      setErrorMsg(String(err))
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center text-center py-10 gap-4 ${className}`}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(34,181,115,0.12)' }}
        >
          <CheckCircle size={30} style={{ color: '#22b573' }} />
        </div>
        <h3 className="font-heading font-bold text-xl" style={{ color: 'var(--dark)' }}>
          Registration Received!
        </h3>
        <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          Thank you for registering{title ? ` for ${title}` : ''}. We will be in touch with details shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 font-heading font-bold text-sm underline"
          style={{ color: '#153093' }}
        >
          Register another person
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <TextInput required value={form.name} onChange={set('name')} placeholder="Your full name" />
        </Field>
        <Field label="Email" required>
          <TextInput type="email" required value={form.email} onChange={set('email')} placeholder="your@email.com" />
        </Field>
        <Field label="Phone Number" required>
          <TextInput type="tel" required value={form.phone} onChange={set('phone')} placeholder="+234 ..." />
        </Field>
        <Field label="How did you hear about this?">
          <Select
            value={form.howHeard}
            onChange={set('howHeard')}
            options={HOW_HEARD}
            placeholder="Select..."
          />
        </Field>
      </div>
      <Field label="Additional Notes">
        <Textarea
          rows={3}
          value={form.notes}
          onChange={set('notes')}
          placeholder="Any questions or information you'd like us to know..."
        />
      </Field>
      {status === 'error' && (
        <div
          className="flex items-start gap-2 text-sm p-3 rounded-xl"
          style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMsg || 'Something went wrong. Please try again.'}</span>
        </div>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-heading font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        style={{ background: '#153093', boxShadow: '0 4px 20px rgba(21,48,147,0.3)' }}
      >
        {status === 'sending' ? 'Submitting...' : <><Send size={15} /> Register Now</>}
      </button>
    </form>
  )
}
