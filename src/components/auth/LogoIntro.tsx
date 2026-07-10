"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

/**
 * MedCore Logo Motion — plays once on mount, never loops.
 * Stages: M (stroke-drawn) -> C (spring entrance) -> medical cross
 * (two-line assembly) -> micro confirmation pulse -> wordmark -> subtitle.
 * Respects prefers-reduced-motion (skips straight to a static fade-in).
 */

interface LogoIntroProps {
  className?: string
  size?: number
  wordmark?: string
  subtitle?: string
  onComplete?: () => void
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const

export function LogoIntro({
  className,
  size = 120,
  wordmark = "MedCore",
  subtitle = "منصة الطب الذكية",
  onComplete,
}: LogoIntroProps) {
  const prefersReducedMotion = useReducedMotion()
  const [, setDone] = useState(false)

  useEffect(() => {
    const total = prefersReducedMotion ? 400 : 2400
    const t = setTimeout(() => {
      setDone(true)
      onComplete?.()
    }, total)
    return () => clearTimeout(t)
  }, [prefersReducedMotion, onComplete])

  if (prefersReducedMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 }}
      >
        <StaticMark size={size} />
        <Wordmark wordmark={wordmark} subtitle={subtitle} fade />
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.18, ease: EASE_OUT }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="MedCore"
      >
        {/* Stage 1 — M, stroke-drawn, 0.0s -> 0.7s */}
        <motion.path
          d="M20 90 L20 30 L45 65 L70 30 L70 90"
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        />

        {/* Stage 2 — C, subtle spring entrance, 0.7s -> 1.25s */}
        <motion.path
          d="M108 45a24 24 0 1 0 0 30"
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: [0.92, 1.05, 1] }}
          transition={{ delay: 0.7, duration: 0.55, ease: EASE_OUT }}
          style={{ transformOrigin: "96px 60px" }}
        />

        {/* Stage 3 — medical cross, two independent strokes, 1.25s -> 1.55s */}
        <motion.line
          x1={92}
          y1={38}
          x2={92}
          y2={58}
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.25, duration: 0.15, ease: "easeOut" }}
        />
        <motion.line
          x1={82}
          y1={48}
          x2={102}
          y2={48}
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.33, duration: 0.15, ease: "easeOut" }}
        />
      </svg>

      {/* Stage 4 — whole mark, imperceptible confirmation pulse, 1.55s -> 1.9s */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ delay: 1.55, duration: 0.35, ease: EASE_OUT }}
      >
        <Wordmark wordmark={wordmark} subtitle={subtitle} />
      </motion.div>
    </motion.div>
  )
}

function Wordmark({
  wordmark,
  subtitle,
  fade = false,
}: {
  wordmark: string
  subtitle: string
  fade?: boolean
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <motion.div
        initial={fade ? undefined : { opacity: 0, y: 8 }}
        animate={fade ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.3, ease: EASE_OUT }}
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: 20,
          color: "var(--on-surface, currentColor)",
        }}
      >
        {wordmark}
      </motion.div>
      <motion.div
        dir="rtl"
        initial={fade ? undefined : { opacity: 0, y: 6 }}
        animate={fade ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.3, ease: EASE_OUT }}
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 13,
          color: "var(--on-surface-variant, currentColor)",
          marginTop: 2,
        }}
      >
        {subtitle}
      </motion.div>
    </div>
  )
}

function StaticMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" role="img" aria-label="MedCore">
      <path
        d="M20 90 L20 30 L45 65 L70 30 L70 90"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M108 45a24 24 0 1 0 0 30" stroke="currentColor" strokeWidth={7} strokeLinecap="round" fill="none" />
      <line x1={92} y1={38} x2={92} y2={58} stroke="currentColor" strokeWidth={6} strokeLinecap="round" />
      <line x1={82} y1={48} x2={102} y2={48} stroke="currentColor" strokeWidth={6} strokeLinecap="round" />
    </svg>
  )
}

export default LogoIntro
