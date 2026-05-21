import React from 'react'

interface BrandCurvesProps {
  color?: string
  opacity?: number
  className?: string
  animated?: boolean
  /** Which corner/side to position: 'top-right' | 'bottom-left' | 'full' */
  position?: 'top-right' | 'bottom-left' | 'full' | 'center-right'
}

/**
 * The TTC organic flowing curve pattern — directly from brand guidelines.
 * This is the signature visual element: flowing, interconnected curves
 * that suggest growth, transformation, and movement.
 */
export function BrandCurves({
  color = '#4ea8f9',
  opacity = 0.15,
  className = '',
  animated = true,
  position = 'top-right',
}: BrandCurvesProps) {
  const posClasses: Record<string, string> = {
    'top-right': 'absolute -top-20 -right-20 w-[500px] h-[500px]',
    'bottom-left': 'absolute -bottom-20 -left-20 w-[500px] h-[500px]',
    'center-right': 'absolute top-1/2 -translate-y-1/2 -right-10 w-[400px] h-[600px]',
    full: 'absolute inset-0 w-full h-full',
  }

  return (
    <div
      className={`pointer-events-none overflow-hidden ${posClasses[position]} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          opacity,
          animation: animated ? 'brandCurveFloat 18s ease-in-out infinite' : undefined,
          transformOrigin: 'center',
        }}
      >
        {/* Main flowing C-curve — signature TTC shape */}
        <path
          d="M 420 30 C 480 80, 490 160, 440 220 C 390 280, 310 290, 270 350 C 230 410, 250 480, 200 530 C 160 570, 80 580, 30 560"
          stroke={color}
          strokeWidth="22"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner parallel curve */}
        <path
          d="M 390 60 C 450 110, 455 185, 405 245 C 355 305, 275 310, 240 375 C 205 435, 225 500, 175 545"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* Outer parallel curve */}
        <path
          d="M 455 10 C 510 65, 520 145, 468 205 C 418 265, 340 272, 302 335 C 265 390, 280 460, 226 512 C 185 550, 110 558, 55 535"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        {/* Small accent loop at top */}
        <path
          d="M 300 40 C 350 20, 400 50, 380 100 C 360 145, 300 150, 280 120 C 260 90, 280 50, 300 40 Z"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        {/* Bottom curl */}
        <path
          d="M 80 500 C 120 490, 155 510, 145 550 C 135 580, 95 585, 70 565 C 50 548, 60 510, 80 500 Z"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        {/* Mid floating loop */}
        <path
          d="M 180 280 C 210 255, 250 265, 245 300 C 240 330, 205 340, 180 325 C 158 312, 158 295, 180 280 Z"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
      </svg>

      <style>{`
        @keyframes brandCurveFloat {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          33%       { transform: translateY(-18px) rotate(1.5deg) scale(1.02); }
          66%       { transform: translateY(10px) rotate(-1deg) scale(0.98); }
        }
      `}</style>
    </div>
  )
}
