'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

type Audience = 'all' | 'seeker' | 'volunteer'

const faqs: { q: string; a: JSX.Element | string; audience: 'both' | 'seeker' | 'volunteer' }[] = [
  {
    q: 'What is free peer support?',
    audience: 'both',
    a: 'Free peer support connects you with a trained volunteer listener who genuinely cares — at no cost. Project Reach is a peer support service for anyone who just needs someone to talk to. We\'re not crisis counselors or therapists — just humans trained to listen without judgment.',
  },
  {
    q: 'Is this a crisis service?',
    audience: 'seeker',
    a: (<>No — Project Reach is peer support, not a crisis intervention service. If you&apos;re in crisis or feeling unsafe, please call <a href="tel:988" className="text-primary hover:underline">988</a> or <a href="tel:911" className="text-primary hover:underline">911</a> immediately. We can be a supportive presence for everyday emotional struggles, but we&apos;re not equipped to manage emergencies.</>),
  },
  {
    q: 'Is peer support free?',
    audience: 'both',
    a: 'Yes, completely free. Project Reach is volunteer-powered and costs nothing to use. There are no fees, no subscriptions, and no hidden costs — ever.',
  },
  {
    q: 'How do I connect with a peer support listener?',
    audience: 'seeker',
    a: (<>Visit our <Link href="/get-support" className="text-primary hover:underline">Get Support</Link> page to see all your options — live chat, text, and more. No sign-up, no forms, no waitlist — just reach out whenever you&apos;re ready.</>),
  },
  {
    q: 'Is my conversation private?',
    audience: 'seeker',
    a: (<>We take privacy seriously. Please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for full details on how conversations are handled.</>),
  },
  {
    q: 'How long does a conversation usually last?',
    audience: 'seeker',
    a: 'There\'s no set time limit. Most conversations last between 15 and 45 minutes, but you can stay as long as you need. There\'s no pressure to wrap up — we\'re here at your pace.',
  },
  {
    q: 'What if the conversation gets overwhelming?',
    audience: 'seeker',
    a: (<>That&apos;s okay. You can step away at any time — no explanation needed. If things feel urgent or unsafe, our volunteers are trained to gently guide you to professional resources like <a href="tel:988" className="text-primary hover:underline">988</a>. You&apos;re in control.</>),
  },
  {
    q: 'Do volunteers need prior training or experience?',
    audience: 'volunteer',
    a: 'No prior experience is required. We\'ll guide you through our Code of Conduct and best practices before you start. All we ask is that you show up with compassion and a willingness to listen.',
  },
  {
    q: 'How much time do I need to commit as a volunteer?',
    audience: 'volunteer',
    a: 'Most volunteers contribute about 2 hours per week. We\'re flexible — you can choose weekday, evening, or weekend availability. Life happens, and we work around your schedule.',
  },
  {
    q: 'What is the difference between peer support and therapy?',
    audience: 'both',
    a: 'Peer support is not therapy or clinical treatment. It\'s human connection — a trained volunteer who listens without judgment. Therapy involves a licensed professional who diagnoses and treats. Peer support fills the space for people who need to talk but aren\'t ready for or don\'t need clinical care.',
  },
  {
    q: 'How do I talk to someone about my mental health for free?',
    audience: 'both',
    a: 'With Project Reach, you can connect for free via live chat or text — no account, no appointment, no cost. Visit our Get Support page and reach out whenever you\'re ready.',
  },
  {
    q: 'Can I use Project Reach if I\'m not in crisis?',
    audience: 'both',
    a: 'Yes — and that\'s exactly who we\'re here for. You don\'t need to be in a crisis to deserve support. If you\'re feeling overwhelmed, anxious, lonely, or just need to talk, we\'re here.',
  },
  {
    q: 'Is peer support effective for mental health?',
    audience: 'both',
    a: 'Research consistently shows that peer support reduces feelings of isolation, improves wellbeing, and helps people feel heard and understood. It\'s not a replacement for clinical care, but for many people it\'s a meaningful and accessible first step.',
  },
  {
    q: 'How is Project Reach different from a crisis hotline?',
    audience: 'both',
    a: 'Crisis hotlines are designed for emergencies. Project Reach is for everyday emotional struggles — the hard days that don\'t qualify as a crisis but still hurt. We\'re a complement to those services, not a replacement.',
  },
  {
    q: 'Can I get mental health support without insurance?',
    audience: 'seeker',
    a: 'Absolutely. Project Reach is completely free and requires no insurance, no referral, and no paperwork. If you need someone to talk to, we\'re here — regardless of your insurance status.',
  },
  {
    q: 'Is online peer support anonymous?',
    audience: 'seeker',
    a: 'Yes. You don\'t need to create an account, share your name, or provide any identifying information. You can use a nickname or no name at all. Your privacy is respected by default.',
  },
  {
    q: 'What should I say when I reach out for peer support?',
    audience: 'seeker',
    a: 'You can say anything — or nothing at all. Many people start with "I just need to talk" or "I\'m not sure where to begin." Our listeners meet you wherever you are. There\'s no wrong way to start.',
  },
]

function FaqItem({ q, a }: { q: string; a: JSX.Element | string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-text-base bg-surface hover:bg-surface-hover transition-colors"
      >
        <span>{q}</span>
        <span aria-hidden="true" className={`ml-4 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-6 py-4 text-sm text-text-muted leading-relaxed border-t border-border bg-background">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  const [filter, setFilter] = useState<Audience>('all')
  const [search, setSearch] = useState('')

  const visible = useMemo(() => {
    return faqs.filter((f) => {
      const audienceMatch = filter === 'all' || f.audience === 'both' || f.audience === filter
      const searchMatch = !search || f.q.toLowerCase().includes(search.toLowerCase())
      return audienceMatch && searchMatch
    })
  }, [filter, search])

  return (
    <>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>FAQ</span>
      </nav>

      <main id="main-content">
        <section className="py-12 px-4 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-heading text-4xl font-bold text-text-base mb-2">Frequently Asked Questions</h1>
            <h2 className="text-xl font-normal text-text-muted">Everything You Need to Know About Free Peer Support</h2>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex gap-2" role="group" aria-label="Filter by audience">
                {(['all', 'seeker', 'volunteer'] as Audience[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-surface border border-border text-text-muted hover:bg-surface-hover'}`}
                  >
                    {f === 'all' ? 'All' : f === 'seeker' ? 'For Seekers' : 'For Volunteers'}
                  </button>
                ))}
              </div>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions…"
                aria-label="Search FAQ"
                className="flex-1 border border-border rounded-lg px-4 py-2 text-sm text-text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* FAQ list */}
            <div className="space-y-3">
              {visible.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
              {visible.length === 0 && (
                <p role="status" className="text-center text-text-muted py-8">No questions match your search.</p>
              )}
            </div>

          </div>
        </section>
      </main>
    </>
  )
}
