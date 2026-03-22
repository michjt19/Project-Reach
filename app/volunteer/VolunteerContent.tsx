'use client'

import { useState } from 'react'
import Link from 'next/link'

const STEPS = ['About You', 'Your Story', 'Finish Up']

export default function VolunteerContent() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', why: '', experience: '', availability: '', consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next })
  }

  function validateStep(s: number) {
    const e: Record<string, string> = {}
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Name is required'
      if (!form.email.trim()) e.email = 'Email is required'
    }
    if (s === 2) {
      if (!form.why.trim()) e.why = 'Please share your motivation'
    }
    if (s === 3) {
      if (!form.availability) e.availability = 'Please select your availability'
      if (!form.consent) e.consent = 'You must agree to the Code of Conduct'
    }
    return e
  }

  function next() {
    const e = validateStep(step)
    if (Object.keys(e).length) { setErrors(e); return }
    setStep((s) => s + 1)
  }

  function back() { setStep((s) => s - 1) }

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const stepErrors = validateStep(3)
    if (Object.keys(stepErrors).length) { setErrors(stepErrors); return }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          why: form.why,
          experience: form.experience,
          availability: form.availability,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main id="main-content" className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <span aria-hidden="true" className="text-5xl block mb-4">🎉</span>
          <h1 className="font-heading text-3xl font-bold text-text-base mb-3">Application received!</h1>
          <p className="text-text-muted mb-6">Thank you for wanting to make a difference. We&apos;ll be in touch soon.</p>
          <Link href="/" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Volunteer</span>
      </nav>

      <main id="main-content">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest opacity-80 mb-3">Join Our Team</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">Make a Difference</h1>
            <h2 className="text-xl font-normal opacity-90 mb-4">Become a Volunteer Peer Support Listener — Remote &amp; Flexible</h2>
            <p className="text-lg opacity-80 mb-6">Become a volunteer listener and help someone who just needs to be heard.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['~2 hrs/week', 'Training provided', 'Fully remote'].map((chip) => (
                <span key={chip} className="bg-white/15 border border-white/25 text-white text-sm font-medium px-4 py-1.5 rounded-full">{chip}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-surface border border-border rounded-xl p-8">

              {/* Social proof */}
              <div className="mb-8 text-sm text-text-muted space-y-3 border-b border-border pb-6">
                <p>Our volunteers contribute around 2 hours per week — fully remote, on a schedule that works for them. Since launching, Project Reach has connected hundreds of people with a <Link href="/get-support" className="text-primary hover:underline">listener</Link> when they needed one most. Learn more <Link href="/about" className="text-primary hover:underline">about our mission</Link>.</p>
                <blockquote className="border-l-2 border-accent pl-3 italic">&ldquo;As a volunteer, I&apos;ve grown so much. Helping others helped me too.&rdquo; — Sarah M., Volunteer</blockquote>
                <p>No clinical background required. We provide full training and ongoing support before you take your first conversation.</p>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center justify-between mb-8" aria-label="Form progress">
                {STEPS.map((label, i) => {
                  const n = i + 1
                  const active = n === step
                  const done = n < step
                  return (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${done ? 'bg-accent text-white' : active ? 'bg-primary text-white' : 'bg-border text-text-muted'}`}>
                          {done ? '✓' : n}
                        </div>
                        <span className={`text-xs font-medium ${active ? 'text-primary' : 'text-text-muted'}`}>{label}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${done ? 'bg-accent' : 'bg-border'}`} />
                      )}
                    </div>
                  )
                })}
              </div>

              <form onSubmit={submit} noValidate>

                {/* Step 1 */}
                {step === 1 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text-base mb-6">Tell us about yourself</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-base mb-1">Full Name <span aria-hidden="true">*</span></label>
                        <input id="name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required autoComplete="name" placeholder="Your full name" className={`w-full border rounded-lg px-4 py-2.5 text-text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : 'border-border'}`} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-base mb-1">Email Address <span aria-hidden="true">*</span></label>
                        <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required autoComplete="email" placeholder="you@example.com" className={`w-full border rounded-lg px-4 py-2.5 text-text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-border'}`} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button type="button" onClick={next} className="bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity">Next →</button>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text-base mb-6">Your motivation</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="why" className="block text-sm font-medium text-text-base mb-1">Why do you want to volunteer? <span aria-hidden="true">*</span></label>
                        <textarea id="why" value={form.why} onChange={(e) => update('why', e.target.value)} rows={5} required placeholder="Share a bit about your motivation..." className={`w-full border rounded-lg px-4 py-2.5 text-text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none ${errors.why ? 'border-red-500' : 'border-border'}`} />
                        {errors.why && <p className="text-red-500 text-xs mt-1">{errors.why}</p>}
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-text-base mb-1">Any relevant experience? <span className="text-text-muted font-normal">(optional)</span></label>
                        <textarea id="experience" value={form.experience} onChange={(e) => update('experience', e.target.value)} rows={3} placeholder="e.g. listening, counseling, lived experience..." className="w-full border border-border rounded-lg px-4 py-2.5 text-text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button type="button" onClick={back} className="border border-border text-text-base font-semibold px-6 py-2.5 rounded-lg hover:bg-surface-hover transition-colors">← Back</button>
                      <button type="button" onClick={next} className="bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity">Next →</button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text-base mb-6">Almost done!</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-text-base mb-1">Availability <span aria-hidden="true">*</span></label>
                        <select id="availability" value={form.availability} onChange={(e) => update('availability', e.target.value)} required className={`w-full border rounded-lg px-4 py-2.5 text-text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary ${errors.availability ? 'border-red-500' : 'border-border'}`}>
                          <option value="" disabled>Select your availability</option>
                          <option value="weekdays">Weekdays</option>
                          <option value="evenings">Evenings</option>
                          <option value="weekends">Weekends</option>
                          <option value="flexible">Flexible</option>
                        </select>
                        {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} required className="mt-0.5 accent-primary" />
                        <span className="text-sm text-text-base">I have read and agree to the{' '}<Link href="/code-of-conduct" target="_blank" className="text-primary hover:underline">Code of Conduct</Link> <span aria-hidden="true">*</span></span>
                      </label>
                      {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
                    </div>
                    {submitError && (
                      <p role="alert" className="text-red-500 text-sm mt-3">{submitError}</p>
                    )}
                    <div className="mt-6 flex justify-between">
                      <button type="button" onClick={back} className="border border-border text-text-base font-semibold px-6 py-2.5 rounded-lg hover:bg-surface-hover transition-colors">← Back</button>
                      <button type="submit" disabled={submitting} className="bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed">
                        {submitting ? 'Submitting…' : 'Submit Application'}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
