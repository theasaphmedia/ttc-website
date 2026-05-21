import React from 'react'

interface FieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

export function Field({ label, required, children }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
        {label} {required && <span style={{ color: '#f7931e' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'var(--off-white)',
  border: '1px solid var(--gray-200)',
  color: 'var(--dark)',
  fontFamily: 'var(--font-open-sans)',
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200 transition-all"
      style={inputStyle}
    />
  )
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
      style={inputStyle}
    />
  )
}

export function Select({ options, placeholder, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder?: string }) {
  return (
    <select
      {...props}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200 transition-all"
      style={{ ...inputStyle, color: props.value ? 'var(--dark)' : 'var(--text-muted)' }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}
