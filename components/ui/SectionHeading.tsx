import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: React.ReactNode
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  dark?: boolean
  className?: string
  titleClassName?: string
  accentWord?: string
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align]

  return (
    <div className={cn('flex flex-col', alignClass, className)}>
      {label && (
        <span className="section-label">{label}</span>
      )}
      <h2
        className={cn(
          dark ? 'section-title-white' : 'section-title',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('section-sub', dark && 'text-blue-100', align === 'center' && 'text-center mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
