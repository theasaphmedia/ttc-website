import React from 'react'
import { cn } from '@/lib/utils'

interface WaveDividerProps {
  fillColor?: string
  className?: string
  flip?: boolean
  height?: number
  variant?: 'wave' | 'tilt' | 'curve' | 'organic'
}

export function WaveDivider({
  fillColor = '#ffffff',
  className,
  flip = false,
  height = 80,
  variant = 'wave',
}: WaveDividerProps) {
  const paths: Record<string, string> = {
    wave: 'M0,32 C150,80 350,-20 500,40 C650,80 850,-20 1000,32 L1000,80 L0,80 Z',
    tilt: 'M0,0 L1000,50 L1000,80 L0,80 Z',
    curve: 'M0,60 Q250,0 500,40 Q750,80 1000,20 L1000,80 L0,80 Z',
    organic: 'M0,40 C80,10 200,70 350,30 C500,-10 650,70 800,35 C900,15 960,55 1000,40 L1000,80 L0,80 Z',
  }

  return (
    <div
      className={cn('w-full overflow-hidden leading-none', flip && '-scale-y-100', className)}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1000 80`}
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={paths[variant]} fill={fillColor} />
      </svg>
    </div>
  )
}

/* ─── Organic Background Blobs ────────────────────────────────────── */
export function OrgBlob({ className }: { className?: string }) {
  return (
    <div
      className={cn('absolute pointer-events-none select-none', className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g transform="translate(300,300)">
          <path
            d="M120,-157.6C152.7,-141.5,174.3,-102.6,183.4,-61.6C192.5,-20.6,189.1,22.4,172.7,58.3C156.3,94.2,126.9,123,93.4,147.7C59.9,172.4,22.3,193.1,-18.2,196.4C-58.7,199.7,-102.1,185.6,-134.7,160.3C-167.3,135,-189.1,98.5,-197.2,59.1C-205.3,19.7,-199.7,-22.6,-183.4,-60C-167.1,-97.4,-140.2,-129.9,-106.1,-143.7C-72,-157.5,-30.7,-152.6,10.7,-163.3C52.1,-174,87.3,-173.7,120,-157.6Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  )
}
