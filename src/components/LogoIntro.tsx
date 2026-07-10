'use client'

import { useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'

type LogoIntroProps = {
  /** 'onDark' = white mark for dark/colored backgrounds, 'onLight' = navy mark for light backgrounds */
  variant?: 'onLight' | 'onDark'
  className?: string
}

const TEAL = '#00B894'
const NAVY = '#0D1B3D'
const WHITE = '#FFFFFF'

// Real traced geometry, extracted directly from the official logo SVG files
// (M: 5 solid pieces, C: 1 bezier path, cross: 2 independent stroke bars)
const M_PIECES = [
  'M 0 0 L 58.11 0 L 58.11 276.03 L 0 276.03 Z',
  'M 0 0 L 118.97 0 L 118.97 124.09 L 0 124.09 Z',
  'M 0 44.84 L 36.97 0 L 192.85 128.53 L 155.88 173.37 Z',
  'M 3.13 87.93 L 0 0 L 78.16 -2.77 L 81.28 84.85 Z',
  'M 39.07 184.51 L 0 145.44 L 145.44 0 L 184.51 39.07 Z',
]

const C_PATH =
  'M 14.8 -157.9 C 14.8 -189 21.5 -216.7 35 -241.1 C 48.4 -265.5 67.2 -284.5 91.3 -298.1 C 115.4 -311.7 142.7 -318.5 173.2 -318.5 C 210.5 -308.6 242.5 -281.3 268 -236.6 L 220.6 -206.6 C 202.8 -237.8 178.4 -253.4 147.4 -253.4 C 122.9 -253.4 102.6 -244.5 86.6 -226.7 C 70.5 -208.9 62.5 -186.1 62.5 -158.3 C 62.5 -130.4 70.5 -107.6 86.6 -89.9 C 102.6 -72.1 122.9 -63.2 147.4 -63.2 C 178.4 -63.2 202.8 -78.8 220.6 -110 L 268 -80 C 242.5 -35.3 210.5 -8 173.2 2 C 142.7 2 115.4 -4.8 91.3 -18.4 C 67.2 -32 48.4 -51 35 -75.4 C 21.5 -99.8 14.8 -127.5 14.8 -157.9 Z'

export function LogoIntro({ variant = 'onLight', className }: LogoIntroProps) {
  const [scope, animate] = useAnimate()
  const hasPlayed = useRef(false)

  const mColor = variant === 'onDark' ? WHITE : NAVY
  const wordMedColor = variant === 'onDark' ? WHITE : NAVY

  useEffect(() => {
    if (hasPlayed.current) return
    hasPlayed.current = true

    async function play() {
      // Stage 1 — clean pause
      await new Promise((r) => setTimeout(r, 200))

      // Stage 2 — M revealed via directional clip-path wipe (real geometry, no fade, no scale)
      await animate(
        '.mc-m-piece',
        { clipPath: 'inset(0 0% 0 0)' },
        { duration: 0.7, ease: [0.65, 0, 0.35, 1] }
      )

      // Stage 3 — C: subtle premium spring bounce
      await animate(
        '.mc-c',
        { opacity: 1, scale: 1 },
        { type: 'spring', stiffness: 320, damping: 20, mass: 0.6 }
      )

      // Stage 4 — medical cross: vertical shoots down, horizontal follows 80ms later
      animate(
        '.mc-cross-v',
        { scaleY: 1, opacity: 1 },
        { duration: 0.16, ease: [0.11, 0.79, 0.29, 1] }
      )
      await new Promise((r) => setTimeout(r, 80))
      await animate(
        '.mc-cross-h',
        { scaleX: 1, opacity: 1 },
        { duration: 0.16, ease: [0.11, 0.79, 0.29, 1] }
      )

      // Stage 5 — confirmation micro-pulse, no bounce, no rotation
      await animate('.mc-mark', { scale: [1, 1.01, 1] }, { duration: 0.18, ease: 'easeOut' })

      // Stage 6 — wordmark fades up, then the logo stays completely still
      await animate(
        '.mc-wordmark',
        { opacity: 1, y: 0 },
        { duration: 0.45, ease: 'easeOut' }
      )
    }

    play()
  }, [animate])

  return (
    <div ref={scope} className={className}>
      <svg viewBox="0 0 700 620" width="100%" height="100%" style={{ overflow: 'visible' }}>
        <g className="mc-mark">
          {/* M — 5 real pieces, each revealed by an animated clip-path wipe */}
          <g transform="translate(20,182)" fill={mColor}>
            {M_PIECES.map((d, i) => (
              <path key={i} className="mc-m-piece" d={d} style={{ clipPath: 'inset(0 100% 0 0)' }} />
            ))}
          </g>

          {/* C — real bezier path, bounces in after the M completes */}
          <path
            className="mc-c"
            d={C_PATH}
            fill={TEAL}
            transform="translate(300,340)"
            style={{ opacity: 0, transformOrigin: '175px -158px', scale: 0.4 } as React.CSSProperties}
          />

          {/* Medical cross — two independent real stroke bars */}
          <rect
            className="mc-cross-v"
            x="228"
            y="205"
            width="18"
            height="82"
            rx="3"
            fill={TEAL}
            style={{ opacity: 0, transformOrigin: '237px 205px', scaleY: 0 } as React.CSSProperties}
          />
          <rect
            className="mc-cross-h"
            x="196"
            y="237"
            width="82"
            height="18"
            rx="3"
            fill={TEAL}
            style={{ opacity: 0, transformOrigin: '196px 246px', scaleX: 0 } as React.CSSProperties}
          />
        </g>

        {/* Wordmark — clean Poppins text, fades up in stage 6 */}
        <text
          className="mc-wordmark"
          x="350"
          y="560"
          textAnchor="middle"
          fontFamily="Poppins, sans-serif"
          fontWeight={700}
          fontSize="46"
          style={{ opacity: 0, transform: 'translateY(10px)' }}
        >
          <tspan fill={wordMedColor}>Med</tspan>
          <tspan fill={TEAL}>Core</tspan>
        </text>
      </svg>
    </div>
  )
}
