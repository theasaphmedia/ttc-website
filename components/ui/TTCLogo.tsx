import React from 'react'

interface TTCLogoProps {
  variant?: 'dark' | 'white' | 'color'
  size?: number
  showText?: boolean
  className?: string
}

/**
 * The Transformation Camp logo — faithfully recreated from brand guidelines.
 * TT = double pillar gate mark (spiritual entry)
 * C  = curved swoosh (the hill — transformative journey)
 */
export function TTCLogo({
  variant = 'color',
  size = 48,
  showText = true,
  className,
}: TTCLogoProps) {
  const markColor = variant === 'white' ? '#ffffff' : '#153093'
  const swooshColor = variant === 'white' ? 'rgba(255,255,255,0.75)' : '#4ea8f9'
  const textPrimary = variant === 'white' ? '#ffffff' : '#153093'
  const textSecondary = variant === 'white' ? 'rgba(255,255,255,0.85)' : '#2d2d2d'

  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      {/* Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left T pillar */}
        <rect x="5" y="7" width="14" height="3.5" rx="1.5" fill={markColor} />
        <rect x="10.5" y="10.5" width="3" height="18" rx="1.5" fill={markColor} />

        {/* Right T pillar */}
        <rect x="20" y="7" width="14" height="3.5" rx="1.5" fill={markColor} />
        <rect x="25.5" y="10.5" width="3" height="18" rx="1.5" fill={markColor} />

        {/* C swoosh — curved hill path */}
        <path
          d="M 8 34 C 10 28, 16 26, 22 28 C 28 30, 32 28, 36 24"
          stroke={swooshColor}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 36 24 C 40 20, 42 24, 38 30 C 36 33, 32 35, 26 36"
          stroke={swooshColor}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Wordmark */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="font-heading font-extrabold tracking-tight leading-none"
            style={{ color: textPrimary, fontSize: size * 0.27 }}
          >
            The Transformation
          </span>
          <span
            className="font-accent leading-tight"
            style={{ color: '#f7931e', fontSize: size * 0.36 }}
          >
            Camp
          </span>
        </div>
      )}
    </div>
  )
}
