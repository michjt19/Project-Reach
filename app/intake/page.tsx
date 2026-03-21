'use client'

import { useState } from 'react'

type Step = 1 | 2 | 3
type ContactMethod = 'chat' | 'text' | 'community'

export default function IntakePage() {
  const [step, setStep] = useState<Step>(1)
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [contactMethod, setContactMethod] = useState<ContactMethod | null>(null)
  const [topicError, setTopicError] = useState('')

  function goToStep2(e: React.FormEvent) {
    e.preventDefault()
    if (!topic.trim()) {
      setTopicError("Please tell us what's on your mind.")
      return
    }
    setTopicError('')
    setStep(2)
  }

  function goToStep3(method: ContactMethod) {
    setContactMethod(method)
    setStep(3)
  }

  function handleConnect() {
    if (contactMethod === 'chat') {
      const attrs: Record<string, string> = { 'intake-topic': topic }
      if (name) attrs['name'] = name
      const tawk = window.Tawk_API
      if (tawk?.setAttributes) {
        tawk.setAttributes(attrs, () => tawk?.maximize?.())
      } else {
        tawk?.maximize?.()
      }
    } else if (contactMethod === 'text') {
      window.location.href = 'sms:+19014921712'
    } else {
      window.open('https://thereachcommunity.discourse.group/', '_blank', 'noopener noreferrer')
    }
  }

  return (
    <main id="main-content" className="min-h-[70vh] py-16 px-4">
      <div className="max-w-xl mx-auto">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-10" aria-label="Step progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-valuetext={`Step ${step} of 3`}>
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= s ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </div>

        {/* Step 1 — About You */}
        {step === 1 && (
          <form onSubmit={goToStep2} noValidate>
            <h1 className="font-heading text-3xl font-bold text-text-base mb-2">We&apos;re here to listen.</h1>
            <p className="text-text-muted mb-8">
              Share a little so we can connect you the right way. Everything is optional except what&apos;s on your mind.
            </p>

            <div className="mb-5">
              <label htmlFor="intake-name" className="block text-sm font-medium text-text-base mb-1">
                Your name{' '}
                <span className="text-text-muted font-normal">(optional — you can stay anonymous)</span>
              </label>
              <input
                id="intake-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name or nickname"
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-surface text-text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="intake-topic" className="block text-sm font-medium text-text-base mb-1">
                What&apos;s on your mind today?{' '}
                <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <textarea
                id="intake-topic"
                value={topic}
                onChange={(e) => { setTopic(e.target.value); if (topicError) setTopicError('') }}
                rows={4}
                placeholder="You don't need the right words. Just start wherever feels natural."
                required
                aria-required="true"
                aria-describedby={topicError ? 'topic-error' : undefined}
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-surface text-text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              />
              {topicError && (
                <p id="topic-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {topicError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Continue →
            </button>

            <p className="mt-4 text-center text-xs text-text-muted">
              In crisis?{' '}
              <a href="tel:988" className="text-primary hover:underline font-medium">Call or text 988</a> right now.
            </p>
          </form>
        )}

        {/* Step 2 — How to Connect */}
        {step === 2 && (
          <div>
            <h1 className="font-heading text-3xl font-bold text-text-base mb-2">How would you like to connect?</h1>
            <p className="text-text-muted mb-8">Pick whatever feels most comfortable right now.</p>

            <div className="flex flex-col gap-3" role="group" aria-label="Connection method">
              {([
                { id: 'chat' as const, emoji: '💬', label: 'Live Chat', sub: 'Talk with a volunteer right now' },
                { id: 'text' as const, emoji: '📱', label: 'Text / SMS', sub: 'Text us at +1 (901) 492-1712' },
                { id: 'community' as const, emoji: '🤝', label: 'Community Forum', sub: 'Connect with others who understand' },
              ]).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => goToStep3(opt.id)}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-surface hover:bg-surface-hover text-left transition-colors"
                >
                  <span aria-hidden="true" className="text-3xl flex-shrink-0">{opt.emoji}</span>
                  <div>
                    <p className="font-semibold text-text-base">{opt.label}</p>
                    <p className="text-sm text-text-muted">{opt.sub}</p>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-text-muted">
              In crisis?{' '}
              <a href="tel:988" className="text-primary hover:underline font-medium">Call or text 988</a>
              {' '}or text <strong>HOME</strong> to{' '}
              <a href="sms:741741?&body=HOME" className="text-primary hover:underline font-medium">741741</a>.
            </p>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-4 text-sm text-text-muted hover:text-primary transition-colors"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 3 — Ready */}
        {step === 3 && contactMethod && (
          <div className="text-center">
            <span aria-hidden="true" className="text-6xl block mb-6">
              {contactMethod === 'chat' ? '💬' : contactMethod === 'text' ? '📱' : '🤝'}
            </span>
            <h1 className="font-heading text-3xl font-bold text-text-base mb-3">
              {name ? `We're ready for you, ${name}.` : "We're ready for you."}
            </h1>
            <p className="text-text-muted mb-8">
              {contactMethod === 'chat' &&
                "A volunteer will see your context when the chat opens — you won't need to repeat yourself."}
              {contactMethod === 'text' &&
                "Your phone's messaging app will open. A volunteer will reply as soon as they're available."}
              {contactMethod === 'community' &&
                'The community forum will open in a new tab.'}
            </p>

            <button
              type="button"
              onClick={handleConnect}
              className="bg-primary text-white font-semibold px-10 py-4 rounded-lg hover:opacity-90 transition-opacity text-lg"
            >
              {contactMethod === 'chat' && 'Open Chat'}
              {contactMethod === 'text' && 'Open Messaging'}
              {contactMethod === 'community' && 'Visit Forum'}
            </button>

            <p className="mt-6 text-xs text-text-muted">
              In crisis?{' '}
              <a href="tel:988" className="text-primary hover:underline font-medium">Call or text 988</a>.
            </p>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-4 block mx-auto text-sm text-text-muted hover:text-primary transition-colors"
            >
              ← Change method
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
