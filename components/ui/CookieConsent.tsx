'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const STORAGE_KEY = 'reach_cookie_consent'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}


export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const prevPath = useRef<string | null>(null)

  useEffect(() => {
    if (prevPath.current !== null && prevPath.current !== pathname) {
      const consent = localStorage.getItem(STORAGE_KEY)
      if (consent === 'accepted' && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', { page_path: pathname })
      }
    }
    prevPath.current = pathname
  }, [pathname])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted') {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' })
    } else if (!stored) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
    window.gtag?.('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' })
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 bg-surface border-t border-border shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-text-muted max-w-xl">
          We use cookies to understand how visitors use our site (Google Analytics). No personal data is shared with third parties. See our{' '}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="text-sm border border-border text-text-muted font-medium px-4 py-2 rounded-lg hover:bg-surface-hover transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
