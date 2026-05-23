import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'The Transformation Camp — The Place of Your Making'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent circles */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(78,168,249,0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'rgba(247,147,30,0.12)',
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(247,147,30,0.2)',
            border: '1px solid rgba(247,147,30,0.4)',
            borderRadius: 100,
            padding: '8px 20px',
            marginBottom: 28,
          }}
        >
          <span style={{ color: '#f7931e', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
            Binah Church International
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: 12,
            maxWidth: 900,
          }}
        >
          The Transformation Camp
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: '#f7931e',
            marginBottom: 32,
            fontStyle: 'italic',
          }}
        >
          The Place of Your Making
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 3,
            background: 'linear-gradient(to right, #f7931e, #4ea8f9)',
            borderRadius: 2,
            marginBottom: 32,
          }}
        />

        {/* Sub-text */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Raising 1 million Ministry Leaders — bi-weekly campus meetings online &amp; onsite
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 16,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: 1,
          }}
        >
          ttconline.org
        </div>
      </div>
    ),
    { ...size },
  )
}
