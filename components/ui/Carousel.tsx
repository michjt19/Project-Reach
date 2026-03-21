'use client'

import { useState, useEffect, useRef } from 'react'

interface CarouselItem {
  quote: string
  author: string
}

interface CarouselProps {
  items: CarouselItem[]
}

export default function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || paused) return
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 6000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [items.length, prefersReducedMotion, paused])

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)
  const next = () => setCurrent((c) => (c + 1) % items.length)

  return (
    <div
      className="relative max-w-2xl mx-auto"
      role="region"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="bg-surface border border-border rounded-xl p-8 text-center min-h-[140px] flex flex-col justify-center">
        <p className="text-lg italic text-text-base mb-4">&ldquo;{items[current].quote}&rdquo;</p>
        <span className="text-sm text-text-muted font-medium">{items[current].author}</span>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="p-2 rounded-full hover:bg-surface-hover transition-colors text-text-muted hover:text-primary"
        >
          ←
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-border'}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="p-2 rounded-full hover:bg-surface-hover transition-colors text-text-muted hover:text-primary"
        >
          →
        </button>
      </div>
    </div>
  )
}
