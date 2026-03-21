import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { getAllPostSlugs, getPost, getRelatedPosts } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return buildMetadata({
    title: `${post.title} | Project Reach Blog`,
    description: post.excerpt,
    canonical: `https://www.thereachcommunity.com/blog/${params.slug}`,
  })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const related = await getRelatedPosts(params.slug, post.categories ?? [])

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Project Reach',
      url: 'https://www.thereachcommunity.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.thereachcommunity.com/blog/${params.slug}`,
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.thereachcommunity.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.thereachcommunity.com/blog/${params.slug}` },
    ],
  }

  return (
    <>
      <JsonLd schema={[schema, breadcrumb]} />

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>{post.title}</span>
      </nav>

      <main id="main-content">
        <article className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
          {/* Header */}
          <header className="py-10 border-b border-border mb-8">
            {post.categories?.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {post.categories.map((cat) => (
                  <span key={cat} className="inline-block text-xs font-semibold text-accent uppercase tracking-wide">
                    {cat}
                  </span>
                ))}
              </div>
            )}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-base mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
              {post.estimatedReadingTime > 0 && (
                <span>{post.estimatedReadingTime} min read</span>
              )}
            </div>
          </header>

          {/* Body */}
          <div className="prose prose-lg prose-slate max-w-none text-text-base
            prose-headings:font-heading prose-headings:text-text-base
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-text-base prose-blockquote:border-accent">
            <PortableText value={post.body} />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Link href="/blog" className="text-sm text-primary hover:underline font-medium">← Back to Blog</Link>
            <Link
              href="/get-support"
              className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              💬 Get Support Now
            </Link>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-heading text-xl font-bold text-text-base mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <article key={r._id} className="bg-surface border border-border rounded-xl p-4 flex flex-col">
                  {r.categories?.[0] && (
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">{r.categories[0]}</span>
                  )}
                  <h3 className="font-heading text-sm font-bold text-text-base mb-2 flex-1">
                    <Link href={`/blog/${r.slug.current}`} className="hover:text-primary transition-colors">
                      {r.title}
                    </Link>
                  </h3>
                  <Link href={`/blog/${r.slug.current}`} className="text-xs text-primary font-medium hover:underline">
                    Read →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}
