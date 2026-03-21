import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { getSiteStats } from '@/lib/sanity'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export const metadata: Metadata = buildMetadata({
  title: 'Our Impact | Project Reach',
  description: 'See how Project Reach is making a difference — peer support sessions, volunteer hours, and the community we\'ve built together.',
  canonical: 'https://www.thereachcommunity.com/impact',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Our Impact', item: 'https://www.thereachcommunity.com/impact' },
  ],
}

const testimonials = [
  {
    quote: "I didn't expect it to help as much as it did. Just having someone listen — without judgment, without an agenda — made such a difference.",
    attribution: 'Community member',
  },
  {
    quote: "Volunteering with Project Reach has been one of the most meaningful things I've done. You realize how powerful it is to just be present for someone.",
    attribution: 'Project Reach volunteer',
  },
  {
    quote: "I was in a really dark place and wasn't ready to call a hotline. Texting felt safer. That first conversation helped me take the next step.",
    attribution: 'Community member',
  },
]

export default async function ImpactPage() {
  const stats = await getSiteStats()

  return (
    <>
      <JsonLd schema={schema} />

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Our Impact</span>
      </nav>

      <main id="main-content">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Impact</h1>
            <p className="text-lg opacity-90">
              Every conversation matters. Here&apos;s a look at the community we&apos;ve built together.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-4" aria-labelledby="stats-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="stats-heading" className="sr-only">Impact statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              <AnimatedCounter target={stats.peopleSupported} suffix="+" label="People supported" />
              <AnimatedCounter target={stats.volunteerHours} suffix="+" label="Volunteer hours" />
              <AnimatedCounter target={stats.communityMembers} suffix="+" label="Community members" />
              <AnimatedCounter target={stats.blogReaders} suffix="+" label="Blog readers" />
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-4 bg-background border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-text-base mb-6 text-center">Why We Exist</h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Project Reach started with a simple belief: everyone deserves someone to talk to. Not a therapist, not a crisis line — just a human who listens without judgment. Affordable mental health care remains out of reach for millions of people. Peer support fills a critical gap.
              </p>
              <p>
                Our volunteers are trained listeners who show up because they care. Many have lived experience with mental health struggles themselves. They understand what it means to need to be heard — and they show up for others because of it.
              </p>
              <p>
                We are 100% free, forever. No subscriptions, no waitlists, no insurance required. Anyone with a phone can reach us.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4" aria-labelledby="testimonials-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="testimonials-heading" className="font-heading text-3xl font-bold text-text-base mb-10 text-center">
              In Their Own Words
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <figure key={t.attribution} className="bg-surface border border-border rounded-xl p-6">
                  <blockquote className="text-text-base text-sm leading-relaxed italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-xs text-text-muted font-semibold">— {t.attribution}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-primary text-white text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-4">Be Part of the Story</h2>
            <p className="opacity-90 mb-8">
              Whether you need support or want to give it, there&apos;s a place for you here.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/get-support"
                className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Support
              </Link>
              <Link
                href="/volunteer"
                className="border border-white/60 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
