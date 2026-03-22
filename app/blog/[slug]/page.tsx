import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { getAllPostSlugs, getPost, getRelatedPosts } from '@/lib/sanity'
import { getStaticPost, getStaticPosts } from '@/lib/blog'
import { PortableText } from '@portabletext/react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const sanitySlugObjects = await getAllPostSlugs()
  const sanityParams = sanitySlugObjects.map((s) => ({ slug: s }))
  const staticParams = getStaticPosts().map((p) => ({ slug: p.slug }))
  // Merge, deduplicating by slug
  const seen = new Set(sanityParams.map((p) => p.slug))
  const merged = [...sanityParams]
  for (const p of staticParams) {
    if (!seen.has(p.slug)) merged.push(p)
  }
  return merged
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (post) {
    return buildMetadata({
      title: `${post.title} | Project Reach Blog`,
      description: post.excerpt,
      canonical: `https://www.thereachcommunity.com/blog/${params.slug}`,
    })
  }
  const staticPost = getStaticPost(params.slug)
  if (!staticPost) return {}
  return buildMetadata({
    title: `${staticPost.title} | Project Reach Blog`,
    description: staticPost.excerpt,
    canonical: `https://www.thereachcommunity.com/blog/${params.slug}`,
  })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: Props) {
  const sanityPost = await getPost(params.slug)
  const staticPost = sanityPost ? null : getStaticPost(params.slug)

  if (!sanityPost && !staticPost) notFound()

  const title = sanityPost?.title ?? staticPost!.title
  const excerpt = sanityPost?.excerpt ?? staticPost!.excerpt
  const publishedAt = sanityPost?.publishedAt ?? staticPost!.publishedAt
  const categories = sanityPost?.categories ?? staticPost!.categories ?? []
  const estimatedReadingTime = sanityPost?.estimatedReadingTime ?? staticPost!.estimatedReadingTime

  const related = sanityPost ? await getRelatedPosts(params.slug, categories) : []

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    datePublished: publishedAt,
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
      { '@type': 'ListItem', position: 3, name: title, item: `https://www.thereachcommunity.com/blog/${params.slug}` },
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
        <span>{title}</span>
      </nav>

      <main id="main-content">
        <article className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
          {/* Header */}
          <header className="py-10 border-b border-border mb-8">
            {categories.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {categories.map((cat) => (
                  <span key={cat} className="inline-block text-xs font-semibold text-accent uppercase tracking-wide">
                    {cat}
                  </span>
                ))}
              </div>
            )}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-base mb-4">{title}</h1>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
              {estimatedReadingTime > 0 && (
                <span>{estimatedReadingTime} min read</span>
              )}
            </div>
          </header>

          {/* Body */}
          <div className="prose prose-lg prose-slate max-w-none text-text-base
            prose-headings:font-heading prose-headings:text-text-base
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-text-base prose-blockquote:border-accent">
            {sanityPost ? (
              <PortableText value={sanityPost.body} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: staticPost!.htmlBody }} />
            )}
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

        {/* Related posts — only available when Sanity is configured */}
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
