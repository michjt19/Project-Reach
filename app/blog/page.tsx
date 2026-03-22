import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { getAllPosts } from '@/lib/sanity'
import { getStaticPosts } from '@/lib/blog'
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

export default async function BlogPage() {
  const fallback = getStaticPosts().map((p) => ({
    slug: p.slug,
    category: p.categories[0] ?? '',
    title: p.title,
    excerpt: p.excerpt,
  }))

  // Fetch from Sanity; fall back to static list if env vars not configured
  let posts: { slug: string; category: string; title: string; excerpt: string }[] = fallback
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
