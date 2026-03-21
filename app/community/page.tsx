import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Community Forum | Project Reach',
  description: 'Join the Project Reach community forum. Connect with others navigating anxiety, depression, and mental health. Peer support, shared stories, and healthy habits.',
  canonical: 'https://www.thereachcommunity.com/community',
})

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
      { '@type': 'ListItem', position: 2, name: 'Community', item: 'https://www.thereachcommunity.com/community' },
    ],
  },
]

const categories = [
  { icon: '👋', title: 'Welcome & Introductions', description: "New to the community? Start here. Introduce yourself and get a warm welcome from members." },
  { icon: '🌀', title: 'Anxiety', description: "Discuss what anxiety feels like, coping strategies that help, and the day-to-day of living with it." },
  { icon: '🌧️', title: 'Depression', description: "A compassionate space to talk about the heaviness of depression and find others who understand." },
  { icon: '🌱', title: 'Healthy Habits', description: "Share routines, small wins, and practical ideas for building mental and physical well-being." },
  { icon: '📖', title: 'My Story', description: "Your experience matters. Share what you've been through, what helped, and where you are now." },
  { icon: '🤝', title: 'General Support', description: "Anything on your mind that doesn't fit elsewhere. We're here to listen." },
  { icon: '📚', title: 'Resources & Tips', description: "Helpful articles, apps, hotlines, and community-recommended tools for mental well-being." },
]

export default function CommunityPage() {
  return (
    <>
      <JsonLd schema={schema} />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Community</span>
      </nav>

      <main id="main-content">
        {/* Hero */}
        <section className="bg-primary text-white py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">You don&apos;t have to go through it alone.</h1>
            <h2 className="text-xl font-normal mb-6 opacity-90">Join the Project Reach Community Forum</h2>
            <p className="text-lg opacity-80 mb-8">A safe, moderated space to connect with others who get it — people navigating anxiety, depression, and everything in between. Share your story. Ask questions. Find your people.</p>
            <a
              href="https://thereachcommunity.discourse.group/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Visit the Community Forum
            </a>
          </div>
        </section>

        {/* What is the community */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">What Is the Community?</h2>
              <p className="text-text-muted">Real people. Real conversations. Zero judgment.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <p className="text-text-base mb-3">The Project Reach Community Forum is a moderated online space where members can connect, share experiences, and support one another on topics like anxiety, depression, healthy habits, and mental well-being.</p>
              <p className="text-text-base">This is <strong>peer support</strong> — not professional mental health care. Members are real people with lived experience, not therapists or counselors. For one-on-one support with a trained peer listener, visit our <Link href="/get-support" className="text-primary hover:underline">Get Support page</Link>. If you are in crisis, please reach out to the <a href="tel:988" className="text-primary hover:underline">988 Suicide &amp; Crisis Lifeline</a> or text HOME to <a href="sms:741741?&body=HOME" className="text-primary hover:underline">741741</a>.</p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-text-base mb-2">Forum Categories</h2>
              <p className="text-text-muted">Find a space that speaks to where you are right now.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.title} className="bg-surface border border-border rounded-xl p-6">
                  <span className="text-3xl mb-3 block" aria-hidden="true">{cat.icon}</span>
                  <h3 className="font-heading font-semibold text-text-base mb-2">{cat.title}</h3>
                  <p className="text-sm text-text-muted">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community guidelines */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface border border-border rounded-xl p-8">
              <h2 className="font-heading text-2xl font-bold text-text-base mb-4">Community Guidelines</h2>
              <p className="text-text-base mb-4">The Reach Community is built on respect, empathy, and safety. Before participating, please read our <Link href="/code-of-conduct" className="text-primary hover:underline">Code of Conduct</Link>. Key principles:</p>
              <ul className="space-y-2 text-text-base mb-6">
                <li>Be kind and respectful — no hate speech, harassment, or judgment</li>
                <li>Protect privacy — don&apos;t share personal information about others</li>
                <li>This is peer support, not professional advice — please don&apos;t give clinical guidance</li>
                <li>Flag anything that feels unsafe — moderators review all reports</li>
              </ul>
              <p className="text-text-base mb-6">By joining, you agree to uphold these values and help keep this a safe space for everyone.</p>
              <Link href="/code-of-conduct" className="inline-block bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                Read the Full Code of Conduct
              </Link>
            </div>
          </div>
        </section>

        {/* Crisis resources */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-2xl mx-auto">
            <div className="border-l-4 border-accent bg-surface rounded-r-xl p-8">
              <h2 className="font-heading text-2xl font-bold text-text-base mb-4">In Crisis? Please Reach Out Now.</h2>
              <p className="text-text-base mb-4">The community forum is not a crisis service. If you or someone you know is in immediate danger or experiencing a mental health emergency, please contact:</p>
              <ul className="space-y-2 text-text-base mb-4">
                <li><strong>988 Suicide &amp; Crisis Lifeline</strong> — call or text <a href="tel:988" className="text-primary hover:underline font-medium">988</a></li>
                <li><strong>Crisis Text Line</strong> — text HOME to <a href="sms:741741?&body=HOME" className="text-primary hover:underline font-medium">741741</a></li>
                <li><strong>Emergency services</strong> — call <a href="tel:911" className="text-primary hover:underline font-medium">911</a></li>
              </ul>
              <p className="text-text-base font-medium">You matter. Help is available 24/7.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-text-base mb-4">Ready to Connect?</h2>
            <p className="text-text-muted mb-8">Join hundreds of people sharing, supporting, and showing up for each other in the Project Reach Community Forum.</p>
            <a
              href="https://thereachcommunity.discourse.group/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Visit the Community Forum
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
