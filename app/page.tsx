import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Free Peer Support & Live Mental Health Chat | Project Reach',
  description: 'Project Reach connects you with a caring volunteer listener — no judgment, no diagnosis, no waitlist. Free peer support via live chat and text, available 24/7.',
  canonical: 'https://www.thereachcommunity.com/',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Project Reach',
  url: 'https://www.thereachcommunity.com',
  logo: 'https://www.thereachcommunity.com/assets/reach-logo.png',
  description: 'Free peer support and live mental health chat — no waitlist, no cost, real humans.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-901-492-1712',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.tiktok.com/@thereachcommunity',
    'https://www.facebook.com/TheReachCommunity',
    'https://www.instagram.com/the_reach_community',
  ],
}

const steps = [
  { n: '1', title: 'Reach out', body: 'Text +1 (901) 492-1712 or open the chat widget — whenever you\'re ready.' },
  { n: '2', title: 'Connect', body: 'You\'ll be connected with a trained volunteer listener who truly cares.' },
  { n: '3', title: 'Be heard', body: 'No pressure, no clock — just someone who\'s there for you.' },
]

const testimonials = [
  { quote: "I didn't want to call a hotline — this felt different. Someone just listened.", author: '— Alex, 24' },
  { quote: "I wasn't in crisis, I just needed to talk. Project Reach was there.", author: '— Jordan' },
]

export default function HomePage() {
  return (
    <>
      <JsonLd schema={schema} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          role="alert"
          aria-label="Peer support disclaimer"
          className="mt-4 mb-2 rounded-lg border border-warning-border bg-warning-bg text-warning-text px-4 py-3 text-sm"
        >
          ⚠︎ This is <strong>peer support only</strong>. We are not medical professionals. If you feel unsafe, call{' '}
          <a href="tel:988" className="font-semibold underline">988</a> or{' '}
          <a href="tel:911" className="font-semibold underline">911</a> immediately.
        </div>
      </div>

      <main id="main-content">
        {/* Hero */}
        <section className="bg-primary text-white py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">You don&apos;t have to go through this alone.</h1>
            <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">Project Reach connects you with a caring volunteer listener — free, anonymous, no waitlist.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/get-support" className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
                💬 Get Support Now
              </Link>
              <Link href="/about" className="inline-block bg-white/10 border border-white/30 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors">
                Learn More
              </Link>
              <Link
                href="/donate"
                className="border border-accent text-accent font-semibold px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors"
              >
                Donate
              </Link>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-surface border-y border-border py-4 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-8">
            {['✓ 100% Free', '✓ No Waitlist', '✓ Real Humans', '✓ 24/7 Available'].map((pill) => (
              <span key={pill} className="text-sm font-semibold text-primary">{pill}</span>
            ))}
          </div>
        </div>

        {/* SEO paragraph */}
        <div className="max-w-3xl mx-auto px-4 py-8 text-center text-text-muted text-sm leading-relaxed">
          Project Reach provides free peer support and live chat for anyone navigating mental health challenges. Whether you&apos;re feeling anxious, overwhelmed, or simply need someone to talk to — our{' '}
          <Link href="/volunteer" className="text-primary hover:underline">trained volunteer listeners</Link>{' '}
          are here 24/7. No appointments. No forms. No cost. Just real human connection when you need it most.
        </div>

        {/* How it works */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">How it works</h2>
              <p className="text-text-muted">Getting support is simple and free — no appointments, no forms.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div key={step.n} className="bg-surface border border-border rounded-xl p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {step.n}
                  </div>
                  <h3 className="font-heading font-semibold text-text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">What people are saying</h2>
              <p className="text-text-muted">Real words from people who&apos;ve reached out.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {testimonials.map((t) => (
                <blockquote key={t.author} className="bg-surface border border-border rounded-xl p-6">
                  <p className="text-text-base italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="text-sm text-text-muted font-medium">{t.author}</footer>
                </blockquote>
              ))}
            </div>
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

        {/* Volunteer CTA */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-surface border border-border rounded-xl p-10">
              <span aria-hidden="true" className="text-4xl block mb-4">❤️</span>
              <h2 className="font-heading text-2xl font-bold text-text-base mb-3">Want to make a difference?</h2>
              <p className="text-text-muted mb-6">Become a volunteer listener and help someone who just needs to be heard.</p>
              <Link href="/volunteer" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
                Become a Volunteer
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
