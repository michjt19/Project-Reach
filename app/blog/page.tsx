import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { getAllPosts } from '@/lib/sanity'
import BlogIndex from '@/components/ui/BlogIndex'

export const metadata: Metadata = buildMetadata({
  title: 'Blog | Peer Support & Mental Health Articles | Project Reach',
  description: 'Articles on peer support, mental health, and emotional well-being from the Project Reach team.',
  canonical: 'https://www.thereachcommunity.com/blog',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.thereachcommunity.com/blog' },
  ],
}

const staticPosts = [
  { slug: 'what-is-peer-support', category: 'Guide', title: 'What Is Peer Support? A Complete Guide', excerpt: 'Peer support connects people with shared experiences. Learn what it is, how it works, and why it matters for mental health.' },
  { slug: 'free-mental-health-resources-without-insurance', category: 'Resources', title: 'Free Mental Health Resources Without Insurance', excerpt: 'No insurance? No problem. Here are free mental health resources you can access right now — no coverage required.' },
  { slug: 'how-to-talk-about-mental-health', category: 'Advice', title: 'How to Talk About Mental Health: Starting the Conversation', excerpt: 'Talking about mental health can feel hard. Here are practical tips to start the conversation with someone you trust.' },
  { slug: 'signs-you-need-someone-to-talk-to', category: 'Wellness', title: 'Signs You Need Someone to Talk To (And Where to Find Support)', excerpt: "Sometimes we don't realize how much we're carrying. Here are the signs it's time to talk — and where to find someone who'll listen." },
  { slug: 'what-to-expect-from-online-peer-support', category: 'Guide', title: 'What to Expect from Online Peer Support', excerpt: "Curious about online peer support? Here's what actually happens when you reach out — no surprises, no pressure." },
]

export default async function BlogPage() {
  // Fetch from Sanity; fall back to static list if env vars not configured
  let posts: { slug: string; category: string; title: string; excerpt: string }[] = staticPosts
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const sanityPosts = await getAllPosts()
      if (sanityPosts.length > 0) {
        posts = sanityPosts.map((p) => ({
          slug: p.slug.current,
          category: p.categories?.[0] ?? '',
          title: p.title,
          excerpt: p.excerpt,
        }))
      }
    } catch {
      // Sanity unavailable — use static fallback
    }
  }

  return (
    <>
      <JsonLd schema={schema} />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Blog</span>
      </nav>

      <main id="main-content">
        <section className="py-12 px-4 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-heading text-4xl font-bold text-text-base mb-3">Blog</h1>
            <p className="text-text-muted text-lg">Articles on peer support, mental health, and emotional well-being.</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <BlogIndex posts={posts} />
          </div>
        </section>
      </main>
    </>
  )
}
