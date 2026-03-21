'use client'

import { useState } from 'react'
import Link from 'next/link'
import { openTawkChat } from '@/components/layout/Nav'

type IntakeOption = 'chat' | 'text' | 'crisis' | 'community' | null

const intakeOptions: { id: IntakeOption; label: string; emoji: string }[] = [
  { id: 'chat', label: 'I need to talk to someone right now', emoji: '💬' },
  { id: 'text', label: 'I prefer to text', emoji: '📱' },
  { id: 'crisis', label: "I'm in crisis or feel unsafe", emoji: '🆘' },
  { id: 'community', label: 'I want community support', emoji: '🤝' },
]

export default function GetSupportPage() {
  const [copyConfirm, setCopyConfirm] = useState('')
  const [intakeChoice, setIntakeChoice] = useState<IntakeOption>(null)

  function copyNumber() {
    navigator.clipboard.writeText('19014921712').then(() => {
      setCopyConfirm('Copied!')
      setTimeout(() => setCopyConfirm(''), 2000)
    })
  }

  return (
    <>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Get Support</span>
      </nav>

      <main id="main-content">
        {/* Page header */}
        <section className="bg-primary text-white py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">You reached out. That took courage.</h1>
            <h2 className="text-xl font-normal opacity-90 mb-2">Free Peer Support via Live Chat &amp; Text — Available 24/7</h2>
            <p className="text-lg opacity-80">Here are all the ways to connect with a volunteer listener.</p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
          <div
            role="alert"
            aria-label="Peer support disclaimer"
            className="rounded-lg border border-warning-border bg-warning-bg text-warning-text px-4 py-3 text-sm"
          >
            ⚠︎ This is <strong>peer support only</strong>. We are not medical professionals. If you feel unsafe, call{' '}
            <a href="tel:988" className="font-semibold underline">988</a> or{' '}
            <a href="tel:911" className="font-semibold underline">911</a> immediately.
          </div>
        </div>

        {/* Crisis intake widget */}
        <section className="py-10 px-4 border-b border-border" aria-labelledby="intake-heading">
          <div className="max-w-2xl mx-auto">
            <h2 id="intake-heading" className="font-heading text-xl font-bold text-text-base mb-5 text-center">
              What brings you here today?
            </h2>
            <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="intake-heading">
              {intakeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setIntakeChoice(opt.id)}
                  aria-pressed={intakeChoice === opt.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left text-sm font-medium transition-colors ${
                    intakeChoice === opt.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-surface text-text-base hover:bg-surface-hover'
                  }`}
                >
                  <span aria-hidden="true" className="text-2xl flex-shrink-0">{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Intake result */}
            {intakeChoice && (
              <div className="mt-6 p-5 rounded-xl border border-border bg-surface" role="region" aria-live="polite" aria-label="Recommended action">
                {intakeChoice === 'chat' && (
                  <div className="text-center">
                    <p className="text-sm text-text-muted mb-4">A volunteer is ready to chat with you right now.</p>
                    <button
                      onClick={openTawkChat}
                      className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Start Live Chat
                    </button>
                  </div>
                )}
                {intakeChoice === 'text' && (
                  <div className="text-center">
                    <p className="text-sm text-text-muted mb-4">Text us at any time — a real volunteer will respond.</p>
                    <a
                      href="sms:+19014921712"
                      className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Text +1 (901) 492-1712
                    </a>
                  </div>
                )}
                {intakeChoice === 'crisis' && (
                  <div>
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3">
                      If you&apos;re in immediate danger, please reach out to a crisis service right now:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="tel:988" className="text-primary font-semibold hover:underline">Call or text 988</a>
                        {' '}&mdash; Suicide &amp; Crisis Lifeline, 24/7
                      </li>
                      <li>
                        Text <strong>HOME</strong> to{' '}
                        <a href="sms:741741?&body=HOME" className="text-primary font-semibold hover:underline">741741</a>
                        {' '}&mdash; Crisis Text Line, 24/7
                      </li>
                      <li>
                        <a href="tel:911" className="text-primary font-semibold hover:underline">Call 911</a>
                        {' '}for immediate emergencies
                      </li>
                    </ul>
                    <p className="text-xs text-text-muted mt-3">Project Reach is peer support — not a crisis intervention service. Please use the resources above if you feel unsafe.</p>
                  </div>
                )}
                {intakeChoice === 'community' && (
                  <div className="text-center">
                    <p className="text-sm text-text-muted mb-4">Join our community forum to connect with others who understand.</p>
                    <a
                      href="https://thereachcommunity.discourse.group/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Visit Community Forum
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Support options */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

              {/* Live Chat */}
              <div className="bg-surface border border-border rounded-xl p-6 flex flex-col relative">
                <span className="absolute top-4 right-4 text-xs font-semibold text-accent uppercase tracking-wide">Fastest</span>
                <span aria-hidden="true" className="text-4xl mb-3 block">💬</span>
                <h2 className="font-heading text-xl font-bold text-text-base mb-2">Live Chat</h2>
                <p className="text-text-muted text-sm mb-4 flex-1">Connect instantly with a volunteer listener right now.</p>
                <button
                  onClick={openTawkChat}
                  className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Chat with us now
                </button>
              </div>

              {/* Text / SMS */}
              <div className="bg-surface border border-border rounded-xl p-6 flex flex-col">
                <span aria-hidden="true" className="text-4xl mb-3 block">📱</span>
                <h2 className="font-heading text-xl font-bold text-text-base mb-2">Text / SMS</h2>
                <p className="text-text-muted text-sm mb-4 flex-1">Text us at any time — available around the clock.</p>
                <a
                  href="sms:+19014921712"
                  className="block w-full text-center bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity mb-3"
                >
                  Text from your phone
                </a>
                <div className="relative">
                  <button
                    onClick={copyNumber}
                    aria-label="Copy support phone number to clipboard"
                    className="w-full border border-border text-text-base font-semibold py-3 rounded-lg hover:bg-surface-hover transition-colors"
                  >
                    Copy number
                  </button>
                  {copyConfirm && (
                    <span role="status" aria-live="polite" className="absolute -bottom-6 left-0 right-0 text-center text-xs text-primary font-medium">
                      {copyConfirm}
                    </span>
                  )}
                </div>
              </div>

              {/* What to expect */}
              <div className="bg-surface border border-border rounded-xl p-6 flex flex-col">
                <span aria-hidden="true" className="text-4xl mb-3 block">🤝</span>
                <h2 className="font-heading text-xl font-bold text-text-base mb-2">What to Expect</h2>
                <p className="text-text-muted text-sm mb-4">A few things to know before you reach out:</p>
                <ul className="space-y-2 text-sm text-text-muted list-disc list-inside">
                  <li>A real <Link href="/volunteer" className="text-primary hover:underline">volunteer</Link> — not a bot or AI</li>
                  <li>Zero judgment, no matter what you share</li>
                  <li>Anonymous by default — no account needed</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Conversation starters */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">Not sure what to say?</h2>
              <p className="text-text-muted">That&apos;s completely normal. Here are a few ways people start — you can use any of these, or just say hello.</p>
            </div>
            <ul className="space-y-3">
              {[
                '"I\'ve been feeling really overwhelmed lately and just needed to talk to someone."',
                '"I don\'t know where to start, but I\'m going through a hard time."',
                '"I\'m not in crisis, I just need to be heard."',
                '"I saw your site and wasn\'t sure if this was for me, but I wanted to try."',
              ].map((starter) => (
                <li key={starter} className="bg-surface border border-border rounded-lg px-5 py-4 text-text-base text-sm italic">
                  {starter}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Reassurance strip */}
        <section className="py-12 px-4 border-y border-border">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Free, always', sub: 'No fees, no subscriptions, ever' },
              { label: 'No waitlist', sub: 'Connect right now, no scheduling' },
              { label: 'Real humans', sub: 'Trained volunteer listeners' },
              { label: 'Anonymous', sub: 'No account or ID required' },
            ].map((item) => (
              <div key={item.label}>
                <strong className="block text-text-base text-sm font-semibold">{item.label}</strong>
                <span className="text-text-muted text-xs">{item.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency resources */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">Emergency &amp; Helpful Resources</h2>
              <p className="text-text-muted">If you&apos;re in crisis or need immediate help, please reach out to these services.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6 max-w-2xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-xl">📞</span>
                  <div>
                    <strong><a href="tel:988" className="text-primary hover:underline">988 Suicide &amp; Crisis Lifeline</a></strong>
                    <p className="text-sm text-text-muted">Call or text 988 — available 24/7</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-xl">💬</span>
                  <div>
                    <strong>Crisis Text Line</strong>
                    <p className="text-sm text-text-muted">Text <strong>HOME</strong> to <strong>741741</strong></p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-xl">🌐</span>
                  <div>
                    <strong><a href="https://findtreatment.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">FindTreatment.gov</a></strong>
                    <p className="text-sm text-text-muted">Find treatment and mental health resources near you</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Not ready to talk */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-md mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold text-text-base mb-3">Not ready to talk?</h2>
            <p className="text-text-muted mb-6">That&apos;s completely okay. Take your time. We&apos;ll be here whenever you are.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/about" className="border border-border text-text-base font-semibold px-6 py-2 rounded-lg hover:bg-surface transition-colors text-sm">
                Learn about us
              </Link>
              <Link href="/faq" className="border border-border text-text-base font-semibold px-6 py-2 rounded-lg hover:bg-surface transition-colors text-sm">
                Read the FAQ
              </Link>
              <Link href="/intake" className="border border-border text-text-base font-semibold px-6 py-2 rounded-lg hover:bg-surface transition-colors text-sm">
                Help me choose
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
