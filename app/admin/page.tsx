'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  LogOut, Plus, Trash2, Calendar, BookOpen, Users,
  Upload, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff, X,
  HandHeart, Send, TrendingUp
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Event {
  id: string
  title: string
  date: string
  time: string
  description?: string
  type: string
  is_online: boolean
  location?: string
  link?: string
  flyer_url?: string
}

interface Devotional {
  id: string
  title: string
  scripture?: string
  body: string
  author: string
  published_date: string
}

type Tab = 'events' | 'devotionals' | 'giving' | 'broadcast'

// ─── Helpers ─────────────────────────────────────────────────────────────────
const EVENT_TYPES = ['service', 'ingathering', 'special', 'meeting', 'conference', 'outreach']
const TYPE_COLORS: Record<string, string> = {
  service: '#153093',
  ingathering: '#f7931e',
  special: '#22b573',
  meeting: '#4ea8f9',
  conference: '#9333ea',
  outreach: '#ef4444',
}

// ─── Character Counter ────────────────────────────────────────────────────────
function CharCounter({ value, max, warn }: { value: string; max: number; warn?: number }) {
  const count = value.length
  const warnAt = warn ?? Math.floor(max * 0.8)
  const color = count > max ? '#dc2626' : count >= warnAt ? '#f7931e' : 'var(--text-muted)'
  return (
    <span className="text-[11px] font-heading font-bold tabular-nums" style={{ color }}>
      {count}/{max}
      {count > max && ' — over limit!'}
    </span>
  )
}

function Badge({ type }: { type: string }) {
  const color = TYPE_COLORS[type] ?? '#6b7280'
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider"
      style={{ background: color }}
    >
      {type}
    </span>
  )
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        setError('Incorrect password. Please try again.')
      } else {
        onLogin()
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--off-white)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: '#153093' }}
          >
            <span className="text-white font-black text-2xl" style={{ fontFamily: 'var(--font-montserrat)' }}>TT</span>
          </div>
          <h1 className="font-heading font-black text-2xl" style={{ color: 'var(--dark)' }}>Admin Panel</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
            The Transformation Camp
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm" style={{ border: '1px solid var(--gray-200)' }}>
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter admin username"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-4"
            style={{
              border: '1.5px solid var(--gray-200)',
              fontFamily: 'var(--font-open-sans)',
              color: 'var(--dark)',
              background: 'var(--off-white)',
            }}
            required
            autoComplete="username"
          />
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Password
          </label>
          <div className="relative mb-4">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl pr-12 text-sm outline-none"
              style={{
                border: '1.5px solid var(--gray-200)',
                fontFamily: 'var(--font-open-sans)',
                color: 'var(--dark)',
                background: 'var(--off-white)',
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm mb-4 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-heading font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
            style={{ background: '#153093' }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Add Event Form ───────────────────────────────────────────────────────────
function AddEventForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({
    title: '', date: '', time: '12:00 PM', description: '',
    type: 'service', is_online: false, location: '', link: '',
  })
  const [flyerFile, setFlyerFile] = useState<File | null>(null)
  const [flyerPreview, setFlyerPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFlyerFile(file)
    setFlyerPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let flyer_url = ''
      if (flyerFile) {
        const fd = new FormData()
        fd.append('file', flyerFile)
        const upRes = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (!upRes.ok) throw new Error('Flyer upload failed')
        const { url } = await upRes.json()
        flyer_url = url
      }

      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, flyer_url }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Failed to save event')
      }

      setForm({ title: '', date: '', time: '12:00 PM', description: '', type: 'service', is_online: false, location: '', link: '' })
      setFlyerFile(null)
      setFlyerPreview(null)
      onAdded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl text-sm outline-none"
  const inputStyle = {
    border: '1.5px solid var(--gray-200)',
    fontFamily: 'var(--font-open-sans)',
    color: 'var(--dark)',
    background: 'white',
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-heading font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Event Title *</label>
            <CharCounter value={form.title} max={60} />
          </div>
          <input className={inputClass} style={inputStyle} placeholder="e.g. Quarterly Ingathering" value={form.title} onChange={e => set('title', e.target.value)} required maxLength={80} />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Date *</label>
          <input type="date" className={inputClass} style={inputStyle} value={form.date} onChange={e => set('date', e.target.value)} required />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Time *</label>
          <input className={inputClass} style={inputStyle} placeholder="e.g. 12:00 PM" value={form.time} onChange={e => set('time', e.target.value)} required />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Type</label>
          <select className={inputClass} style={inputStyle} value={form.type} onChange={e => set('type', e.target.value)}>
            {EVENT_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Location</label>
          <input className={inputClass} style={inputStyle} placeholder="e.g. 38A Ikota Villa or Online" value={form.location} onChange={e => set('location', e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Join Link (optional)</label>
          <input className={inputClass} style={inputStyle} placeholder="YouTube / Zoom link" value={form.link} onChange={e => set('link', e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-heading font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Description</label>
            <CharCounter value={form.description} max={300} warn={200} />
          </div>
          <textarea
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
            style={{ ...inputStyle, minHeight: '80px' }}
            placeholder="Brief description of the event... (first 120 characters show on the card)"
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
          <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
            First 120 characters show as preview on the Programs page.
          </p>
        </div>

        <div className="sm:col-span-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => set('is_online', !form.is_online)}
            className="w-10 h-6 rounded-full transition-colors relative shrink-0"
            style={{ background: form.is_online ? '#153093' : '#d1d5db' }}
          >
            <span
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
              style={{ transform: form.is_online ? 'translateX(18px)' : 'translateX(2px)' }}
            />
          </button>
          <span className="text-sm font-heading font-medium" style={{ color: 'var(--dark)' }}>This is an online event</span>
        </div>

        {/* Flyer Upload */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Event Flyer (optional)</label>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          {flyerPreview ? (
            <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image src={flyerPreview} alt="Flyer preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => { setFlyerFile(null); setFlyerPreview(null) }}
                className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full py-8 rounded-xl border-2 border-dashed flex flex-col items-center gap-2 transition-colors hover:border-blue-400"
              style={{ borderColor: 'var(--gray-200)', color: 'var(--text-muted)' }}
            >
              <Upload size={24} />
              <span className="text-sm font-heading font-medium">Click to upload flyer</span>
              <span className="text-xs" style={{ fontFamily: 'var(--font-open-sans)' }}>JPG, PNG, WebP — any size (16:9 looks best)</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-heading font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
        style={{ background: '#153093' }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        {loading ? 'Publishing...' : 'Publish Event'}
      </button>
    </form>
  )
}

// ─── Add Devotional Form ──────────────────────────────────────────────────────
function AddDevotionalForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({
    title: '', scripture: '', body: '',
    author: 'Pastor Daniel Odinaka', published_date: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/devotionals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Failed to save devotional')
      }
      setForm({ title: '', scripture: '', body: '', author: 'Pastor Daniel Odinaka', published_date: new Date().toISOString().split('T')[0] })
      onAdded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl text-sm outline-none"
  const inputStyle = { border: '1.5px solid var(--gray-200)', fontFamily: 'var(--font-open-sans)', color: 'var(--dark)', background: 'white' }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-heading font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Title *</label>
          <CharCounter value={form.title} max={80} />
        </div>
        <input className={inputClass} style={inputStyle} placeholder="e.g. Walking in Purpose" value={form.title} onChange={e => set('title', e.target.value)} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Scripture</label>
          <input className={inputClass} style={inputStyle} placeholder="e.g. Romans 8:28" value={form.scripture} onChange={e => set('scripture', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Date</label>
          <input type="date" className={inputClass} style={inputStyle} value={form.published_date} onChange={e => set('published_date', e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Author</label>
        <input className={inputClass} style={inputStyle} value={form.author} onChange={e => set('author', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Devotional Content *</label>
        <textarea
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
          style={{ ...inputStyle, minHeight: '160px' }}
          placeholder="Write the devotional content here..."
          value={form.body}
          onChange={e => set('body', e.target.value)}
          required
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>
          <AlertCircle size={14} />{error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-heading font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
        style={{ background: '#f7931e' }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        {loading ? 'Publishing...' : 'Publish Devotional'}
      </button>
    </form>
  )
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
interface GivingTx {
  id: string
  created_at: string
  name: string
  email: string
  amount: number
  category: string
  paystack_reference: string
  status: string
}

function GivingDashboard() {
  const [transactions, setTransactions] = useState<GivingTx[]>([])
  const [totals, setTotals] = useState<Record<string, number>>({})
  const [grandTotal, setGrandTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/giving')
      .then(r => r.json())
      .then(d => {
        setTransactions(d.transactions ?? [])
        setTotals(d.totals ?? {})
        setGrandTotal(d.grandTotal ?? 0)
      })
      .finally(() => setLoading(false))
  }, [])

  const catColors: Record<string, string> = {
    offering: '#f7931e', tithe: '#153093', building: '#22b573', special: '#4ea8f9',
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin" style={{ color: '#153093' }} /></div>

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Received', value: grandTotal, color: '#153093', bg: 'rgba(21,48,147,0.06)' },
          { label: 'Offering', value: totals['offering'] ?? 0, color: '#f7931e', bg: 'rgba(247,147,30,0.06)' },
          { label: 'Tithe', value: totals['tithe'] ?? 0, color: '#153093', bg: 'rgba(21,48,147,0.06)' },
          { label: 'Building', value: totals['building'] ?? 0, color: '#22b573', bg: 'rgba(34,181,115,0.06)' },
        ].map(c => (
          <div key={c.label} className="p-4 rounded-2xl" style={{ background: c.bg, border: `1px solid ${c.color}20` }}>
            <p className="text-xs font-heading font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{c.label}</p>
            <p className="font-heading font-black text-xl" style={{ color: c.color }}>
              ₦{c.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Transactions table */}
      {transactions.length === 0 ? (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <HandHeart size={36} className="mx-auto mb-3 opacity-20" />
          <p className="text-sm" style={{ fontFamily: 'var(--font-open-sans)' }}>No giving transactions yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--gray-200)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#153093' }}>
                {['Date', 'Name', 'Email', 'Category', 'Amount', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-heading font-bold text-xs uppercase tracking-wider text-white">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={tx.id} style={{ background: i % 2 === 0 ? 'white' : 'var(--off-white)' }}>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)', whiteSpace: 'nowrap' }}>
                    {new Date(tx.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-sm font-heading font-bold" style={{ color: 'var(--dark)' }}>{tx.name}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>{tx.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-white text-[10px] font-bold uppercase" style={{ background: catColors[tx.category] ?? '#888' }}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-heading font-black text-sm" style={{ color: '#22b573' }}>
                    ₦{Number(tx.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ background: tx.status === 'success' ? 'rgba(34,181,115,0.1)' : 'rgba(239,68,68,0.1)', color: tx.status === 'success' ? '#22b573' : '#dc2626' }}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function BroadcastPanel() {
  const [form, setForm] = useState({ subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!form.subject.trim() || !form.message.trim()) return setError('Subject and message are required.')
    setError('')
    setLoading(true)
    try {
      const html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#153093;padding:24px;border-radius:8px 8px 0 0">
            <h2 style="color:white;margin:0;font-size:20px">The Transformation Camp</h2>
            <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">ttconline.org</p>
          </div>
          <div style="background:white;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
            <h3 style="color:#153093;margin:0 0 16px">${form.subject}</h3>
            <div style="color:#333;line-height:1.7;white-space:pre-wrap">${form.message}</div>
            <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
            <p style="color:#9ca3af;font-size:12px;margin:0">
              You are receiving this because you subscribed to updates from The Transformation Camp.
              <br/>© ${new Date().getFullYear()} The Transformation Camp — An expression of Binah Church International
            </p>
          </div>
        </div>
      `
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: form.subject, html, plain: form.message }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Failed to send')
      }
      setSuccess(true)
      setForm({ subject: '', message: '' })
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { border: '1.5px solid var(--gray-200)', fontFamily: 'var(--font-open-sans)', color: 'var(--dark)', background: 'white' }

  return (
    <div className="max-w-2xl">
      <div className="p-5 rounded-2xl mb-6" style={{ background: 'rgba(247,147,30,0.06)', border: '1px solid rgba(247,147,30,0.2)' }}>
        <p className="text-sm font-heading font-bold mb-1" style={{ color: '#f7931e' }}>⚠️ Important</p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          This sends an email to ALL subscribers on your Brevo mailing list. Make sure your message is ready before sending — this cannot be undone.
        </p>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-4 rounded-xl mb-4 text-sm font-heading font-bold" style={{ background: 'rgba(34,181,115,0.1)', color: '#22b573' }}>
          <CheckCircle2 size={16} /> Broadcast sent successfully!
        </div>
      )}

      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-heading font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Email Subject *</label>
            <CharCounter value={form.subject} max={80} />
          </div>
          <input
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={inputStyle}
            placeholder="e.g. TTC Update — New Event This Saturday"
            value={form.subject}
            onChange={e => set('subject', e.target.value)}
            required
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-heading font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Message *</label>
            <CharCounter value={form.message} max={2000} warn={1500} />
          </div>
          <textarea
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
            style={{ ...inputStyle, minHeight: '200px' }}
            placeholder="Write your message here..."
            value={form.message}
            onChange={e => set('message', e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="flex items-center gap-2 text-sm p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-heading font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          style={{ background: '#153093' }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {loading ? 'Sending...' : 'Send Broadcast'}
        </button>
      </form>
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('events')
  const [events, setEvents] = useState<Event[]>([])
  const [devotionals, setDevotionals] = useState<Devotional[]>([])
  const [loadingData, setLoadingData] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function fetchData() {
    setLoadingData(true)
    try {
      const [evRes, dvRes] = await Promise.all([
        fetch('/api/admin/events'),
        fetch('/api/admin/devotionals'),
      ])
      if (evRes.ok) { const d = await evRes.json(); setEvents(d.events ?? []) }
      if (dvRes.ok) { const d = await dvRes.json(); setDevotionals(d.devotionals ?? []) }
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    if (authed) fetchData()
  }, [authed])

  async function deleteEvent(id: string) {
    setDeletingId(id)
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
    setEvents(ev => ev.filter(e => e.id !== id))
    setDeletingId(null)
  }

  async function deleteDevotional(id: string) {
    setDeletingId(id)
    await fetch(`/api/admin/devotionals/${id}`, { method: 'DELETE' })
    setDevotionals(dv => dv.filter(d => d.id !== id))
    setDeletingId(null)
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthed(false)
  }

  function showSuccess(msg: string) {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3500)
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  const TABS = [
    { key: 'events' as Tab, label: 'Events', icon: Calendar, count: events.length },
    { key: 'devotionals' as Tab, label: 'Devotionals', icon: BookOpen, count: devotionals.length },
    { key: 'giving' as Tab, label: 'Giving', icon: HandHeart, count: null },
    { key: 'broadcast' as Tab, label: 'Broadcast', icon: Send, count: null },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--off-white)' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: 'var(--gray-200)' }}>
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#153093' }}>
              <span className="text-white font-black text-xs">TT</span>
            </div>
            <div>
              <p className="font-heading font-black text-sm" style={{ color: 'var(--dark)' }}>TTC Admin</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>Content Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs font-heading font-bold px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-100"
              style={{ color: 'var(--text-muted)' }}
            >
              <Users size={13} /> View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-heading font-bold px-3 py-1.5 rounded-lg transition-colors hover:bg-red-50"
              style={{ color: '#dc2626' }}
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Success toast */}
        {successMsg && (
          <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-heading font-bold shadow-lg" style={{ background: '#22b573' }}>
            <CheckCircle2 size={16} /> {successMsg}
          </div>
        )}

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-1.5 rounded-2xl w-fit" style={{ border: '1px solid var(--gray-200)' }}>
          {TABS.map(t => {
            const Icon = t.icon
            const active = tab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-sm transition-all"
                style={{ background: active ? '#153093' : 'transparent', color: active ? 'white' : 'var(--text-muted)' }}
              >
                <Icon size={15} />
                {t.label}
                {t.count !== null && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-black"
                    style={{ background: active ? 'rgba(255,255,255,0.2)' : 'var(--off-white)', color: active ? 'white' : 'var(--text-muted)' }}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Giving tab — full width */}
        {tab === 'giving' && (
          <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid var(--gray-200)' }}>
            <h2 className="font-heading font-black text-lg mb-6" style={{ color: 'var(--dark)' }}>💰 Giving Transactions</h2>
            <GivingDashboard />
          </div>
        )}

        {/* Broadcast tab — full width */}
        {tab === 'broadcast' && (
          <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid var(--gray-200)' }}>
            <h2 className="font-heading font-black text-lg mb-2" style={{ color: 'var(--dark)' }}>📣 Email Broadcast</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Send an email to all your subscribers at once.
            </p>
            <BroadcastPanel />
          </div>
        )}

        {/* Events & Devotionals — two column */}
        {(tab === 'events' || tab === 'devotionals') && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add form panel */}
            <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid var(--gray-200)' }}>
              <h2 className="font-heading font-black text-lg mb-6" style={{ color: 'var(--dark)' }}>
                {tab === 'events' ? '📅 Add New Event' : '📖 Add New Devotional'}
              </h2>
              {tab === 'events' ? (
                <AddEventForm onAdded={() => { fetchData(); showSuccess('Event published successfully!') }} />
              ) : (
                <AddDevotionalForm onAdded={() => { fetchData(); showSuccess('Devotional published successfully!') }} />
              )}
            </div>

            {/* List panel */}
            <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid var(--gray-200)' }}>
              <h2 className="font-heading font-black text-lg mb-6" style={{ color: 'var(--dark)' }}>
                {tab === 'events' ? `📋 All Events (${events.length})` : `📋 All Devotionals (${devotionals.length})`}
              </h2>
              {loadingData ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 size={24} className="animate-spin" style={{ color: '#153093' }} />
                </div>
              ) : tab === 'events' ? (
                events.length === 0 ? (
                  <div className="text-center py-12" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                    <Calendar size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No events yet. Add your first event.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {events.map(ev => (
                      <div key={ev.id} className="flex gap-3 p-4 rounded-2xl" style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)' }}>
                        {ev.flyer_url && (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                            <Image src={ev.flyer_url} alt={ev.title} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-heading font-bold text-sm truncate" style={{ color: 'var(--dark)' }}>{ev.title}</p>
                            <button onClick={() => deleteEvent(ev.id)} disabled={deletingId === ev.id} className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: '#dc2626' }}>
                              {deletingId === ev.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                            </button>
                          </div>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                            {new Date(ev.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {ev.time}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <Badge type={ev.type} />
                            {ev.is_online && <span className="text-[10px] font-bold text-emerald-600">● Online</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                devotionals.length === 0 ? (
                  <div className="text-center py-12" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                    <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No devotionals yet. Add your first one.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {devotionals.map(dv => (
                      <div key={dv.id} className="p-4 rounded-2xl" style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)' }}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-heading font-bold text-sm" style={{ color: 'var(--dark)' }}>{dv.title}</p>
                          <button onClick={() => deleteDevotional(dv.id)} disabled={deletingId === dv.id} className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: '#dc2626' }}>
                            {deletingId === dv.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                          </button>
                        </div>
                        {dv.scripture && <p className="text-xs mt-0.5 font-heading font-medium" style={{ color: '#f7931e' }}>{dv.scripture}</p>}
                        <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>{dv.body}</p>
                        <p className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>
                          {new Date(dv.published_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {dv.author}
                        </p>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
