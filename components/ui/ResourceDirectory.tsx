'use client'

import { useState, useMemo } from 'react'
import { buildResourceIndex, type Resource } from '@/lib/search'

const CATEGORIES = ['All', 'Crisis', 'Hotlines', 'General', 'Anxiety', 'Depression', 'Substance Use']

interface Props {
  resources: Resource[]
}

export default function ResourceDirectory({ resources }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const index = useMemo(() => buildResourceIndex(resources), [resources])

  const results = useMemo(() => {
    let filtered = resources

    if (query.trim().length >= 2) {
      try {
        const hits = index.search(query.trim() + '*')
        const names = new Set(hits.map((h) => h.ref))
        filtered = filtered.filter((r) => names.has(r.name))
      } catch {
        // Invalid lunr query — fall through to unfiltered
      }
    }

    if (category !== 'All') {
      filtered = filtered.filter((r) => r.category === category)
    }

    return filtered
  }, [query, category, resources, index])

  return (
    <div>
      {/* Search + filter controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <label htmlFor="resource-search" className="sr-only">Search resources</label>
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources…"
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-surface text-text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-primary text-white'
                : 'bg-surface border border-border text-text-base hover:bg-surface-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <p role="status" className="text-center text-text-muted py-12">
          No resources found. Try a different search or category.
        </p>
      ) : (
        <>
          <p role="status" className="sr-only">{results.length} resources found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((r) => (
              <article
                key={r.name}
                className="bg-surface border border-border rounded-xl p-5 flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="inline-block text-xs font-semibold text-accent uppercase tracking-wide">
                    {r.category}
                  </span>
                  {r.free && (
                    <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-base font-bold text-text-base mb-2 flex-1">{r.name}</h3>
                <p className="text-sm text-text-muted mb-4">{r.description}</p>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block w-full text-center bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  Visit Resource
                </a>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
