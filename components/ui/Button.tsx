import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'orange' | 'outline' | 'outline-white' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'btn-primary',
  orange: 'btn-orange',
  outline: 'btn-outline',
  'outline-white': 'btn-outline-white',
  ghost: 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold text-sm tracking-wide transition-all duration-300 text-egyptian-blue hover:bg-blue-50',
}

const sizeStyles: Record<Size, string> = {
  sm: '!px-5 !py-2.5 !text-xs',
  md: '',
  lg: '!px-9 !py-4 !text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  icon,
  iconPosition = 'right',
  loading,
  fullWidth,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    loading && 'opacity-70 cursor-not-allowed',
    className,
  )

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={loading} {...props}>
      {content}
    </button>
  )
}
