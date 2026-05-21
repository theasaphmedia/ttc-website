'use client'

import React, { useEffect, useState } from 'react'
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Field, TextInput, Textarea, Select } from './FormField'
import type { FormType } from '@/types'

interface QuickLinkModalProps {
  formType: FormType | null
  formTitle: string
  onClose: () => void
}

type Status = 'idle' | 'sending' | 'success' | 'error'

// Generic dynamic form fields per form_type
function getFields(formType: FormType) {
  switch (formType) {
    case 'membership':
      return [
        { key: 'address', label: 'Home Address', type: 'text', required: true },
        { key: 'dob', label: 'Date of Birth', type: 'date', required: false },
        { key: 'how_heard', label: 'How did you find TTC?', type: 'select', options: ['Social Media', 'Friend / Family', 'YouTube', 'Church Service', 'Other'], required: false },
      ]
    case 'counseling':
      return [
        { key: 'concern', label: 'Nature of Concern', type: 'select', options: ['Spiritual', 'Marital', 'Family', 'Career', 'Personal', 'Other'], required: true },
        { key: 'preferred_time', label: 'Preferred Time', type: 'text', placeholder: 'E.g. Weekday mornings', required: false },
        { key: 'message', label: 'Your Message', type: 'textarea', required: true, rows: 4 },
      ]
    case 'feedback':
      return [
        { key: 'rating', label: 'Rating (1–5)', type: 'select', options: ['5 - Excellent', '4 - Good', '3 - Average', '2 - Below Average', '1 - Poor'], required: true },
        { key: 'loved', label: 'What did you love?', type: 'textarea', required: false, rows: 3 },
        { key: 'improve', label: 'What can improve?', type: 'textarea', required: false, rows: 3 },
        { key: 'suggestions', label: 'Other Suggestions', type: 'textarea', required: false, rows: 2 },
      ]
    case 'first_timer':
      return [
        { key: 'how_heard', label: 'How did you hear about us?', type: 'select', options: ['Social Media', 'Friend / Family', 'YouTube', 'Church Service', 'Other'], required: true },
        { key: 'what_brought_you', label: 'What brought you today?', type: 'textarea', required: false, rows: 3 },
        { key: 'follow_up', label: 'Would you like follow-up?', type: 'select', options: ['Yes please', 'No, thank you'], required: false },
      ]
    case 'second_timer':
      return [
        { key: 'first_visit', label: 'First Visit Date (approx)', type: 'text', placeholder: 'E.g. March 2025', required: false },
        { key: 'what_brought_back', label: 'What brought you back?', type: 'textarea', required: false, rows: 3 },
        { key: 'get_connected', label: 'Would you like to get more connected?', type: 'select', options: ['Yes!', 'Not yet', 'Just browsing'], required: false },
      ]
    case 'volunteer':
      return [
        { key: 'area', label: 'Area of Interest', type: 'select', options: ['Music Group', 'Locomotive Group (MJK)', 'Transformative Word Group', 'Tremendous Power Group', 'Community Impact Group', 'Media Operations', 'Administrative Support'], required: true },
        { key: 'availability', label: 'Availability', type: 'select', options: ['Weekdays', 'Weekends', 'Both', 'Event-based only'], required: false },
        { key: 'skills', label: 'Skills / Experience', type: 'textarea', required: false, rows: 3 },
      ]
    case 'membership_class':
      return [
        { key: 'preferred_date', label: 'Preferred Class Date', type: 'text', placeholder: 'E.g. First Friday of June', required: false },
        { key: 'new_member', label: 'Are you a new member?', type: 'select', options: ['Yes', 'No — just curious'], required: false },
      ]
    case 'ministry_group_class':
      return [
        { key: 'group', label: 'Which Group?', type: 'select', options: ['Music Group', 'Locomotive Group (MJK)', 'Transformative Word Group (TWG)', 'Tremendous Power Group (TPG)', 'Community Impact Group (GIP)', 'Media Operations Group', 'Administrative Support Group'], required: true },
        { key: 'preferred_schedule', label: 'Preferred Schedule', type: 'text', placeholder: 'E.g. Saturday mornings', required: false },
      ]
    case 'online_community':
      return [
        { key: 'country', label: 'Country', type: 'text', required: true, placeholder: 'Your country' },
        { key: 'platform', label: 'Which platform do you use most?', type: 'select', options: ['WhatsApp', 'Telegram', 'Instagram', 'Facebook', 'YouTube', 'Other'], required: true },
      ]
    case 'premarital_counseling':
      return [
        { key: 'partner_name', label: "Partner's Name", type: 'text', required: true },
        { key: 'partner_email', label: "Partner's Email", type: 'email', required: false },
        { key: 'proposed_date', label: 'Proposed Marriage Date', type: 'text', required: false, placeholder: 'E.g. December 2025' },
        { key: 'how_long_together', label: 'How long together?', type: 'text', required: false, placeholder: 'E.g. 2 years' },
        { key: 'message', label: 'Additional Message', type: 'textarea', required: false, rows: 3 },
      ]
    case 'postmarital_counseling':
      return [
        { key: 'spouse_name', label: "Spouse's Name", type: 'text', required: true },
        { key: 'years_married', label: 'Years Married', type: 'text', required: false },
        { key: 'concern', label: 'Nature of Concern', type: 'select', options: ['Communication', 'Finance', 'Intimacy', 'Family', 'Spiritual', 'Other'], required: true },
        { key: 'message', label: 'Details', type: 'textarea', required: false, rows: 4 },
      ]
    case 'prayer_request':
      return [
        { key: 'request', label: 'Prayer Request', type: 'textarea', required: true, rows: 5 },
        { key: 'public', label: 'Make this public on prayer wall?', type: 'select', options: ['Yes', 'No — keep private'], required: false },
      ]
    case 'testimony':
      return [
        { key: 'testimony', label: 'Your Testimony', type: 'textarea', required: true, rows: 6 },
        { key: 'share', label: 'May we share this?', type: 'select', options: ['Yes, share freely', 'Yes, but anonymously', 'No'], required: false },
      ]
    case 'welfare':
      return [
        { key: 'need', label: 'Nature of Need', type: 'select', options: ['Financial', 'Medical', 'Food', 'Housing', 'Other'], required: true },
        { key: 'details', label: 'Details', type: 'textarea', required: true, rows: 4 },
        { key: 'urgency', label: 'Urgency', type: 'select', options: ['Urgent (within 24 hours)', 'This week', 'This month', 'Not urgent'], required: true },
      ]
    case 'tic_city':
      return [
        { key: 'city', label: 'City', type: 'text', required: true },
        { key: 'state', label: 'State / Province', type: 'text', required: true },
        { key: 'country', label: 'Country', type: 'text', required: true },
        { key: 'ttc_member', label: 'Are you currently a TTC member?', type: 'select', options: ['Yes', 'No'], required: true },
        { key: 'why_needed', label: 'Why is TTC needed in your city?', type: 'textarea', required: true, rows: 4 },
        { key: 'vision', label: 'Your Vision for TTC in your city', type: 'textarea', required: true, rows: 4 },
      ]
    case 'transformation_kids':
      return [
        { key: 'child_name', label: "Child's Name", type: 'text', required: true },
        { key: 'child_age', label: "Child's Age", type: 'number', required: true },
        { key: 'interests', label: 'Interests', type: 'textarea', required: false, rows: 2 },
        { key: 'special_needs', label: 'Any special needs or notes?', type: 'textarea', required: false, rows: 2 },
      ]
    case 'elders_forum':
      return [
        { key: 'age_range', label: 'Age Range', type: 'select', options: ['40–49', '50–59', '60–69', '70+'], required: true },
        { key: 'years_ministry', label: 'Years in Ministry', type: 'text', required: false },
        { key: 'contribution', label: 'How can you contribute?', type: 'textarea', required: true, rows: 4 },
        { key: 'message', label: 'Additional Message', type: 'textarea', required: false, rows: 3 },
      ]
    case 'circle_group':
      return [
        { key: 'city', label: 'City', type: 'text', required: true },
        { key: 'group_size', label: 'Preferred Group Size', type: 'select', options: ['5–8 people', '9–15 people', '16–20 people', 'No preference'], required: false },
        { key: 'interests', label: 'Interest Areas', type: 'textarea', required: false, rows: 3, placeholder: 'E.g. Prayer, Bible Study, Mentorship...' },
        { key: 'willing_to_lead', label: 'Are you willing to lead a circle?', type: 'select', options: ['Yes', 'Maybe', 'No'], required: false },
      ]
    default:
      return []
  }
}

type FieldDef = {
  key: string
  label: string
  type: string
  required?: boolean
  options?: string[]
  rows?: number
  placeholder?: string
}

export function QuickLinkModal({ formType, formTitle, onClose }: QuickLinkModalProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [base, setBase] = useState({ name: '', email: '', phone: '' })
  const [extra, setExtra] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!formType) return
    const fields = getFields(formType)
    const init: Record<string, string> = {}
    fields.forEach(f => { init[f.key] = '' })
    setExtra(init)
    setBase({ name: '', email: '', phone: '' })
    setStatus('idle')
  }, [formType])

  useEffect(() => {
    if (!formType) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [formType, onClose])

  if (!formType) return null

  const extraFields: FieldDef[] = getFields(formType)
  const needsName = formType !== 'feedback'
  const needsEmail = formType !== 'feedback'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form_type: formType, ...base, ...extra }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full sm:max-w-lg bg-white sm:rounded-3xl overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh', borderRadius: '24px 24px 0 0' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <h2 className="font-heading font-bold text-lg" style={{ color: 'var(--dark)' }}>{formTitle}</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,181,115,0.12)' }}>
                <CheckCircle size={30} style={{ color: '#22b573' }} />
              </div>
              <h3 className="font-heading font-bold text-xl" style={{ color: 'var(--dark)' }}>Submitted!</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                Thank you! We will be in touch with you soon.
              </p>
              <button onClick={onClose} className="mt-2 font-heading font-bold text-sm underline" style={{ color: '#153093' }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Always-present base fields */}
              {needsName && (
                <Field label="Full Name" required>
                  <TextInput required value={base.name} onChange={e => setBase(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
                </Field>
              )}
              {needsEmail && (
                <Field label="Email Address" required>
                  <TextInput type="email" required value={base.email} onChange={e => setBase(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                </Field>
              )}
              {formType !== 'feedback' && formType !== 'prayer_request' && formType !== 'testimony' && (
                <Field label="Phone Number">
                  <TextInput type="tel" value={base.phone} onChange={e => setBase(p => ({ ...p, phone: e.target.value }))} placeholder="+234 ..." />
                </Field>
              )}

              {/* Dynamic extra fields */}
              {extraFields.map(f => (
                <Field key={f.key} label={f.label} required={f.required}>
                  {f.type === 'textarea' ? (
                    <Textarea rows={f.rows ?? 3} required={f.required} value={extra[f.key] ?? ''} onChange={e => setExtra(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder ?? ''} />
                  ) : f.type === 'select' && f.options ? (
                    <Select required={f.required} options={f.options} placeholder="Select an option" value={extra[f.key] ?? ''} onChange={e => setExtra(p => ({ ...p, [f.key]: e.target.value }))} />
                  ) : (
                    <TextInput type={f.type} required={f.required} value={extra[f.key] ?? ''} onChange={e => setExtra(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder ?? ''} />
                  )}
                </Field>
              ))}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-sm p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>
                  <AlertCircle size={16} />
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-heading font-bold text-white text-sm mt-2 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                style={{ background: '#153093', boxShadow: '0 4px 20px rgba(21,48,147,0.25)' }}
              >
                {status === 'sending' ? 'Submitting...' : <><Send size={15} /> Submit</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
