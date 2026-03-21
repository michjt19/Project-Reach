'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'reach_cookie_consent'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function enableAnalytics() {
  if (typeof window === 'undefined') return
  // Load GA4 script dynamically after consent
  if (!document.getElementById('ga4-script')) {
    const s = document.createElement('script')
    s.id = 'ga4-script'
    s.async = true
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-S8M7YHYFMV'
    document.head.appendChild(s)
  }
  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', 'G-S8M7YHYFMV')
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted') {
      enableAnalytics()
    } else if (!stored) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    enableAnalytics()
    setVisible(false)
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
