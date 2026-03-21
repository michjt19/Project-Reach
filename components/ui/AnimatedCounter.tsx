'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  target: number
  duration?: number
  suffix?: string
  label: string
}

export default function AnimatedCounter({ target, duration = 2000, suffix = '', label }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-4xl md:text-5xl font-bold text-primary">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-text-muted text-sm mt-2">{label}</p>
    </div>
  )
}
