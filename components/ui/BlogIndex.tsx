'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Post {
  slug: string
  category: string
  title: string
  excerpt: string
}

interface Props {
  posts: Post[]
}

export default function BlogIndex({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))
    return ['All', ...cats]
  }, [posts])

  const filtered = useMemo(
    () => (activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory)),
    [posts, activeCategory]
  )

  return (
    <>
      {/* Category filter chips */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-surface border border-border text-text-base hover:bg-surface-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <p role="status" className="sr-only">{filtered.length} posts</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <article key={post.slug} className="bg-surface border border-border rounded-xl p-6 flex flex-col">
            {post.category && (
              <span className="inline-block text-xs font-semibold text-accent uppercase tracking-wide mb-3">
                {post.category}
              </span>
            )}
            <h2 className="font-heading text-lg font-bold text-text-base mb-3 flex-1">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-text-muted mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-sm text-primary font-medium hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </>
  )
}
