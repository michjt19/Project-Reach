'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

// Extend Window to include the optional Tawk.to API
declare global {
  interface Window {
    Tawk_API?: {
      toggle?: () => void
      maximize?: () => void
      showWidget?: () => void
      hideWidget?: () => void
      setAttributes?: (attrs: Record<string, string>, callback?: () => void) => void
      [key: string]: unknown
    }
  }
}

/** Opens the Tawk.to chat widget if available. */
export function openTawkChat() {
  if (typeof window !== 'undefined') {
    window.Tawk_API?.toggle?.()
  }
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/get-support', label: 'Get Support' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/community', label: 'Community' },
  { href: '/team', label: 'Team' },
]

const volunteerLinks = [
  { href: '/volunteer', label: 'Become a Volunteer' },
  { href: '/code-of-conduct', label: 'Code of Conduct' },
]

export default function Nav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Refs for focus management
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null)

  // Avoid hydration mismatch for theme-dependent rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile nav and dropdown on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  // Trap focus within mobile nav when open
  useEffect(() => {
    if (!mobileOpen) return

    const nav = navRef.current
    if (!nav) return

    // Gather all focusable elements within the nav
    const getFocusable = () =>
      Array.from(
        nav.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.closest('[hidden]') && el.offsetParent !== null)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setDropdownOpen(false)
        hamburgerRef.current?.focus()
        return
      }

      if (e.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Move focus into the nav when it opens
    const focusable = getFocusable()
    if (focusable.length > 0) focusable[0].focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  // Escape key closes dropdown when mobile nav is closed
  useEffect(() => {
    if (mobileOpen) return // handled above

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dropdownOpen) {
        setDropdownOpen(false)
        dropdownTriggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen, dropdownOpen])

  // Click-outside closes mobile nav and dropdown
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setMobileOpen(false)
      setDropdownOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  // Restore scroll when mobile nav closes
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isDark = mounted && theme === 'dark'
  const themeAriaLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const volunteerActive = volunteerLinks.some((l) => isActive(l.href))

  const activeLinkClass =
    'text-primary font-semibold underline underline-offset-4'
  const defaultLinkClass =
    'text-text-base hover:text-primary transition-colors duration-150'

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
      className="bg-surface border-b border-border sticky top-0 z-50"
    >
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Project Reach Home"
          className="flex-shrink-0 flex items-center"
        >
          <Image
            src="/assets/reach-logo.png"
            alt="Project Reach logo"
            width={140}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm ${isActive(href) ? activeLinkClass : defaultLinkClass}`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Volunteer dropdown */}
          <li className="relative">
            <button
              ref={dropdownTriggerRef}
              onClick={(e) => {
                e.stopPropagation()
                setDropdownOpen((prev) => !prev)
              }}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className={`text-sm flex items-center gap-1 ${
                volunteerActive ? activeLinkClass : defaultLinkClass
              }`}
            >
              Volunteer
              <span aria-hidden="true" className="text-xs">
                {dropdownOpen ? '▴' : '▾'}
              </span>
            </button>

            {dropdownOpen && (
              <ul
                className="absolute top-full left-0 mt-1 bg-surface border border-border rounded-md shadow-lg py-1 min-w-[180px] list-none p-0 z-50"
                role="menu"
              >
                {volunteerLinks.map(({ href, label }) => (
                  <li key={href} role="none">
                    <Link
                      href={href}
                      role="menuitem"
                      className={`block px-4 py-2 text-sm hover:bg-surface-hover ${
                        isActive(href) ? 'text-primary font-semibold' : 'text-text-base'
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Donate button */}
          <li>
            <Link
              href="/donate"
              className="bg-accent text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Donate
            </Link>
          </li>
        </ul>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={themeAriaLabel}
            className="p-2 rounded-md hover:bg-surface-hover transition-colors duration-150 text-lg"
          >
            {mounted ? (isDark ? '☀️' : '🌙') : '🌙'}
          </button>

          {/* Hamburger — mobile only */}
          <button
            ref={hamburgerRef}
            onClick={(e) => {
              e.stopPropagation()
              setMobileOpen((prev) => !prev)
            }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            className="md:hidden p-2 rounded-md hover:bg-surface-hover transition-colors duration-150 text-xl"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-surface border-t border-border px-4 pb-4"
        >
          <ul className="list-none m-0 p-0 pt-2 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block py-2 text-sm ${
                    isActive(href) ? activeLinkClass : defaultLinkClass
                  }`}
                  aria-current={isActive(href) ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Volunteer section in mobile */}
            <li>
              <button
                ref={dropdownTriggerRef}
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                className={`w-full text-left py-2 text-sm flex items-center justify-between ${
                  volunteerActive ? activeLinkClass : defaultLinkClass
                }`}
              >
                Volunteer
                <span aria-hidden="true" className="text-xs">
                  {dropdownOpen ? '▴' : '▾'}
                </span>
              </button>
              {dropdownOpen && (
                <ul className="list-none m-0 pl-4 flex flex-col gap-1">
                  {volunteerLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`block py-2 text-sm ${
                          isActive(href) ? activeLinkClass : defaultLinkClass
                        }`}
                        onClick={() => {
                          setMobileOpen(false)
                          setDropdownOpen(false)
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                href="/donate"
                className="block py-2 text-sm font-semibold text-accent hover:opacity-80 transition-opacity"
                onClick={() => setMobileOpen(false)}
              >
                Donate
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
