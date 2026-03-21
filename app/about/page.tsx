import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'
import Carousel from '@/components/ui/Carousel'

export const metadata: Metadata = buildMetadata({
  title: 'About Project Reach | Free Mental Health Peer Support',
  description: 'Project Reach fills the gap between crisis lines and clinical care with free, anonymous peer support. Learn about our mission, values, and the people behind it.',
  canonical: 'https://www.thereachcommunity.com/about',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.thereachcommunity.com/about' },
  ],
}

const testimonials = [
  { quote: "I didn't want to call a hotline — this felt different. Someone just listened.", author: '— Alex, 24' },
  { quote: "I wasn't in crisis, I just needed to talk. Project Reach was there.", author: '— Jordan' },
  { quote: "As a volunteer, I've grown so much. Helping others helped me too.", author: '— Sarah M., Volunteer' },
]

const whyItMatters = [
  { icon: '🚫', title: '"Not in crisis enough"', desc: "People are turned away because they don't fit a clinical threshold — even when they're genuinely struggling." },
  { icon: '📋', title: 'Forms & waitlists', desc: 'Complicated intake processes push people away before they ever get support.' },
  { icon: '💙', title: 'They need a human', desc: "Sometimes people don't need a clinical chart — they need someone who understands." },
]

const whatMakesDifferent = [
  { icon: '✅', title: 'No diagnosis required', desc: "You don't need a label or a referral. Just reach out." },
  { icon: '⚡', title: 'No waitlists', desc: 'Connect with someone right now — no scheduling, no appointments.' },
  { icon: '🤝', title: 'No judgment', desc: "A real person, trained to support, listen, and remind you that you're not alone." },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={schema} />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>About</span>
      </nav>

      <main id="main-content">
        {/* Mission hero */}
        <section className="bg-primary text-white py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">We believe no one should feel alone in their hardest moments.</h1>
            <h2 className="text-xl font-normal mb-4 opacity-90">Free Mental Health Peer Support — Filling the Gap Between Crisis Lines and Clinical Care</h2>
            <p className="text-lg opacity-80">Project Reach exists to fill the space between clinical care and crisis lines — with human warmth, presence, and zero red tape.</p>
          </div>
        </section>

        {/* What is Project Reach */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">What Is Project Reach?</h2>
              <p className="text-text-muted">Real connection, freely given.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-8">
              <p className="text-text-base mb-4">Project Reach was created for one reason: to make sure no one feels alone in their hardest moments.</p>
              <p className="text-text-base mb-4">In a world flooded with apps, forms, and waitlists, real connection has become hard to find — especially for those who aren&apos;t in a full-blown crisis, but are still hurting. Project Reach fills that gap. We offer instant, human support from <Link href="/volunteer" className="text-primary hover:underline">trained peers</Link> who simply listen, care, and sit with you in whatever you&apos;re facing — without judgment, diagnosis, or red tape.</p>
              <p className="text-text-base">Whether you&apos;re texting at 2 a.m. because you&apos;re spiraling quietly, or just need to hear that you matter — we&apos;re here. No accounts. No labels. Just presence. Visit our <Link href="/get-support" className="text-primary hover:underline">Get Support page</Link> to connect with a listener now.</p>
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">Why It Matters</h2>
              <p className="text-text-muted">Too many people fall between the cracks of the mental health system.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {whyItMatters.map((item) => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-6 text-center">
                  <span className="text-3xl mb-3 block" aria-hidden="true">{item.icon}</span>
                  <h3 className="font-heading font-semibold text-text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-text-muted">Project Reach was built for those people.</p>
          </div>
        </section>

        {/* What makes it different */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">What Makes It Different</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {whatMakesDifferent.map((item) => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-6 text-center">
                  <span className="text-3xl mb-3 block" aria-hidden="true">{item.icon}</span>
                  <h3 className="font-heading font-semibold text-text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-text-muted max-w-xl mx-auto mb-6">We believe emotional care should be as easy as sending a message — and that support shouldn&apos;t start only when things hit rock bottom.</p>
              <Link href="/get-support" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
                💬 Reach Out Now
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">What People Are Saying</h2>
              <p className="text-text-muted">Anonymous voices from our community.</p>
            </div>
            <Carousel items={testimonials} />
          </div>
        </section>

        {/* The gap */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-text-base mb-6">The Gap We&apos;re Filling</h2>
            <blockquote className="border-l-4 border-accent pl-6 text-left space-y-3">
              <p className="text-text-base">The mental health world has professionals. The crisis world has hotlines.</p>
              <p className="text-text-base">But the middle space — the <em>&ldquo;I&apos;m not okay, but I don&apos;t know what to do&rdquo;</em> — is often empty.</p>
              <p className="text-text-base font-medium text-primary">That&apos;s where we show up. We&apos;re here to reach you — with empathy, presence, and heart.</p>
            </blockquote>
          </div>
        </section>
      </main>
    </>
  )
}
