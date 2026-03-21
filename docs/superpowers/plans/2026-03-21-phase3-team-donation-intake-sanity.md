# Phase 3 — Team Page, Donation Page, Intake Form & Sanity Schema

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the remaining Phase 3 user-facing features (Team page, Donation page, Peer Support Intake Form) and Sanity schema definitions, bringing the Next.js migration to feature-complete before Vercel deployment.

**Architecture:** All new pages follow the established RSC pattern — server components export `metadata` and render data, client components handle interactivity. Static JSON fallbacks ensure every page works without Sanity credentials. The Sanity schema lives in `/sanity/schemas/` ready for studio setup; the Next.js app queries it lazily (no build-time throw if env vars are absent).

**Tech Stack:** Next.js 14 App Router, Tailwind CSS, Sanity (GROQ queries via next-sanity), Tawk.to JS API (intake → chat handoff), Give Lively embed (donation), TypeScript.

**Working directory:** `C:\Users\samca\Documents\Project-Reach\.worktrees\feature-nextjs-migration`

**Verification command (after every task):** `npm run build` — must exit 0 with no type errors.

---

## Current State

- Phases 1 & 2 complete: 17 routes, all components, Sanity integration scaffolded (queries written, no credentials yet)
- Impact stats hardcoded in `app/impact/page.tsx` lines 64–67
- No Team page, no Donation page, no Intake form
- `/sanity/` directory does not exist — no schema definitions yet
- Nav has 7 links; Footer Navigate column has 9 links

---

## File Map

### New files
| File | Responsibility |
|------|---------------|
| `sanity/schemas/post.ts` | Blog post document type |
| `sanity/schemas/teamMember.ts` | Team member document type |
| `sanity/schemas/siteStats.ts` | Site-wide stats document type |
| `sanity/schemas/index.ts` | Schema registry (exports all schemas) |
| `sanity/sanity.config.ts` | Sanity Studio v3 configuration |
| `sanity/README.md` | Setup instructions for Sanity Studio |
| `content/team.json` | Static fallback team data |
| `app/team/page.tsx` | Team/Leadership page (server component) |
| `app/donate/page.tsx` | Donation page with Give Lively embed |
| `app/intake/page.tsx` | Peer support intake questionnaire (client component) |

### Modified files
| File | Change |
|------|--------|
| `lib/sanity.ts` | Add `TeamMember` type + `getTeamMembers()`, `SiteStats` type + `getSiteStats()` |
| `app/impact/page.tsx` | Fetch stats from Sanity; fall back to hardcoded values |
| `components/layout/Nav.tsx` | Add Team link to `navLinks` |
| `components/layout/Footer.tsx` | Add Team + Donate links; add Donate CTA button |
| `app/page.tsx` | Add Donate CTA in hero section |
| `next-sitemap.config.js` | Add `/team`, `/donate`, `/intake` |
| `next.config.mjs` | Add image domain for Sanity CDN (`cdn.sanity.io`) |

---

## Task 1: Sanity Schema Definitions

**Goal:** Create schema files for the three Sanity document types the app queries — `post`, `teamMember`, `siteStats` — so that when the Sanity project is set up, the studio has the exact field structure the GROQ queries expect.

**Files:**
- Create: `sanity/schemas/post.ts`
- Create: `sanity/schemas/teamMember.ts`
- Create: `sanity/schemas/siteStats.ts`
- Create: `sanity/schemas/index.ts`
- Create: `sanity/sanity.config.ts`
- Create: `sanity/README.md`

- [ ] **Step 1: Create `sanity/schemas/post.ts`**

```ts
// sanity/schemas/post.ts
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r: any) => r.required() },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (r: any) => r.required().max(200) },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }], options: { list: ['Guide','Resources','Advice','Wellness','Community'] } },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
  ],
  orderings: [{ title: 'Published At, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'excerpt' } },
}
```

- [ ] **Step 2: Create `sanity/schemas/teamMember.ts`**

```ts
// sanity/schemas/teamMember.ts
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (r: any) => r.required() },
    { name: 'role', title: 'Role / Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'bio', title: 'Bio', type: 'text', rows: 4 },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number', description: 'Lower numbers appear first' },
    { name: 'group', title: 'Group', type: 'string', options: { list: ['Leadership','Volunteer Coordinator','Advisor','Board'] } },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
}
```

- [ ] **Step 3: Create `sanity/schemas/siteStats.ts`**

```ts
// sanity/schemas/siteStats.ts
export default {
  name: 'siteStats',
  title: 'Site Statistics',
  type: 'document',
  __experimental_actions: ['update', 'publish'],  // singleton — no create/delete
  fields: [
    { name: 'peopleSupported', title: 'People Supported', type: 'number', initialValue: 1200 },
    { name: 'volunteerHours', title: 'Volunteer Hours', type: 'number', initialValue: 3400 },
    { name: 'communityMembers', title: 'Community Members', type: 'number', initialValue: 850 },
    { name: 'blogReaders', title: 'Blog Readers', type: 'number', initialValue: 15000 },
  ],
  preview: { select: { title: 'peopleSupported' }, prepare: ({ title }: any) => ({ title: 'Site Statistics', subtitle: `${title} people supported` }) },
}
```

- [ ] **Step 4: Create `sanity/schemas/index.ts`**

```ts
// sanity/schemas/index.ts
import post from './post'
import teamMember from './teamMember'
import siteStats from './siteStats'

export const schemaTypes = [post, teamMember, siteStats]
```

- [ ] **Step 5: Create `sanity/sanity.config.ts`**

```ts
// sanity/sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'project-reach',
  title: 'Project Reach',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 6: Create `sanity/README.md`** with setup instructions

```markdown
# Sanity Studio — Project Reach

## Setup

1. Create a Sanity project at https://sanity.io (free tier)
2. Copy `.env.local.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Install Sanity CLI: `npm install -g @sanity/cli`
4. From this directory: `sanity login && sanity deploy`

## Document Types

- **Blog Post** — Blog content (matches Next.js `/blog/[slug]` route)
- **Team Member** — Leadership / team page entries
- **Site Statistics** — Impact page counters (edit in Studio without a deploy)

## Importing existing blog posts

Use the Sanity CLI or Studio UI to create the 5 existing posts:
- what-is-peer-support
- free-mental-health-resources-without-insurance
- how-to-talk-about-mental-health
- signs-you-need-someone-to-talk-to
- what-to-expect-from-online-peer-support
```

- [ ] **Step 7: Verify build passes**

```bash
npm run build
```
Expected: exit 0, no type errors.

- [ ] **Step 8: Commit**

```bash
git add sanity/
git commit -m "feat: add Sanity Studio schema definitions (post, teamMember, siteStats)"
```

---

## Task 2: Dynamic Impact Stats

**Goal:** Update `app/impact/page.tsx` to fetch stats from the Sanity `siteStats` document, falling back to the current hardcoded values when Sanity is not configured.

**Files:**
- Modify: `lib/sanity.ts` — add `SiteStats` type + `getSiteStats()`
- Modify: `app/impact/page.tsx` — fetch from Sanity; keep hardcoded fallback

- [ ] **Step 1: Add `SiteStats` type and `getSiteStats()` to `lib/sanity.ts`**

Append after the `getRelatedPosts` function:

```ts
export interface SiteStats {
  peopleSupported: number
  volunteerHours: number
  communityMembers: number
  blogReaders: number
}

const DEFAULT_STATS: SiteStats = {
  peopleSupported: 1200,
  volunteerHours: 3400,
  communityMembers: 850,
  blogReaders: 15000,
}

/** Singleton site-wide stats — falls back to defaults if Sanity not configured */
export async function getSiteStats(): Promise<SiteStats> {
  const client = getSanityClient()
  if (!client) return DEFAULT_STATS
  try {
    const stats = await client.fetch<SiteStats | null>(
      `*[_type == "siteStats"][0] { peopleSupported, volunteerHours, communityMembers, blogReaders }`
    )
    return stats ?? DEFAULT_STATS
  } catch {
    return DEFAULT_STATS
  }
}
```

- [ ] **Step 2: Update `app/impact/page.tsx` to be an async server component that fetches stats**

Change:
```tsx
// Remove the static import of AnimatedCounter from the top-level server component
// Keep AnimatedCounter as-is; just update the data source
```

Replace the current hardcoded counters section in the JSX:
```tsx
// BEFORE (hardcoded):
<AnimatedCounter target={1200} suffix="+" label="People supported" />
<AnimatedCounter target={3400} suffix="+" label="Volunteer hours" />
<AnimatedCounter target={850} suffix="+" label="Community members" />
<AnimatedCounter target={15000} suffix="+" label="Blog readers" />

// AFTER (dynamic):
// 1. Make the default export async
// 2. Fetch at the top: const stats = await getSiteStats()
// 3. Use stats.X as target values
<AnimatedCounter target={stats.peopleSupported} suffix="+" label="People supported" />
<AnimatedCounter target={stats.volunteerHours} suffix="+" label="Volunteer hours" />
<AnimatedCounter target={stats.communityMembers} suffix="+" label="Community members" />
<AnimatedCounter target={stats.blogReaders} suffix="+" label="Blog readers" />
```

Full page signature:
```tsx
import { getSiteStats } from '@/lib/sanity'
// ...
export default async function ImpactPage() {
  const stats = await getSiteStats()
  // ...
}
```

- [ ] **Step 3: Verify build — no type errors, impact page still renders**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add lib/sanity.ts app/impact/page.tsx
git commit -m "feat: dynamic impact stats from Sanity with hardcoded fallback"
```

---

## Task 3: Team/Leadership Page

**Goal:** Create `app/team/page.tsx` showing team members with name, role, bio, and photo. Uses static JSON fallback; Sanity-ready via `getTeamMembers()`.

**Files:**
- Create: `content/team.json` — static team data
- Modify: `lib/sanity.ts` — add `TeamMember` type + `getTeamMembers()`
- Create: `app/team/page.tsx` — server component
- Modify: `components/layout/Nav.tsx` — add Team to `navLinks`
- Modify: `components/layout/Footer.tsx` — add Team link to Navigate column

- [ ] **Step 1: Create `content/team.json` with static fallback data**

```json
[
  {
    "name": "Project Reach Team",
    "role": "Volunteer Listeners & Coordinators",
    "bio": "Our team is made up of trained volunteer listeners who believe everyone deserves someone to talk to. Many of our volunteers have their own lived experience with mental health challenges, which deepens their empathy and commitment.",
    "group": "Leadership",
    "photo": null
  }
]
```

> Note: Actual team bios/photos will be managed in Sanity. This is the placeholder until the studio is set up.

- [ ] **Step 2: Add `TeamMember` type and `getTeamMembers()` to `lib/sanity.ts`**

```ts
export interface TeamMember {
  _id?: string  // optional — static fallback data has no Sanity _id
  name: string
  role: string
  bio?: string
  group?: string
  photo?: { asset: { _ref: string }; hotspot?: object }
}

/** All team members ordered by display order */
export async function getTeamMembers(): Promise<TeamMember[]> {
  const client = getSanityClient()
  if (!client) return []
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc) { _id, name, role, bio, group, photo }`
  )
}
```

- [ ] **Step 3: Create `app/team/page.tsx`**

Key patterns to follow:
- Server component with `generateMetadata` equivalent (use `export const metadata`)
- `JsonLd` schema for `AboutPage` + `BreadcrumbList`
- Fetch team members from Sanity; fall back to `content/team.json`
- Group members by `group` field
- `next/image` for photos; fall back to initials avatar if no photo
- Same card pattern as resource directory

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { getTeamMembers, type TeamMember } from '@/lib/sanity'
import teamJson from '@/content/team.json'

export const metadata: Metadata = buildMetadata({
  title: 'Our Team | Project Reach',
  description: 'Meet the volunteers and team behind Project Reach — people who show up because they care.',
  canonical: 'https://www.thereachcommunity.com/team',
})

const schema = { /* BreadcrumbList */ }

// Group members by group field
function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key] ?? 'Team')
    return { ...acc, [k]: [...(acc[k] ?? []), item] }
  }, {} as Record<string, T[]>)
}

// Initials avatar fallback
function Initials({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('')
  return (
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
      <span className="font-heading text-xl font-bold text-primary">{initials}</span>
    </div>
  )
}

export default async function TeamPage() {
  let members: TeamMember[] = []
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try { members = await getTeamMembers() } catch { /* fallback */ }
  }
  const hasSanityData = members.length > 0
  const displayData = hasSanityData ? members : teamJson as unknown as TeamMember[]
  const groups = groupBy(displayData, 'group')

  return (
    <>
      <JsonLd schema={schema} />
      {/* breadcrumb nav */}
      <main id="main-content">
        {/* hero section */}
        {/* grouped member cards — iterate Object.entries(groups) */}
      </main>
    </>
  )
}
```

- [ ] **Step 4: Add Team to `navLinks` in `components/layout/Nav.tsx`**

Add after `/community`:
```ts
{ href: '/team', label: 'Team' },
```

- [ ] **Step 5: Add Team link to Footer Navigate column in `components/layout/Footer.tsx`**

Add `{ href: '/team', label: 'Our Team' }` to the Navigate column.

- [ ] **Step 6: Verify build**

```bash
npm run build
```
Expected: new `/team` route appears in build output.

- [ ] **Step 7: Commit**

```bash
git add content/team.json lib/sanity.ts app/team/page.tsx components/layout/Nav.tsx components/layout/Footer.tsx
git commit -m "feat: add team/leadership page with Sanity integration and static fallback"
```

---

## Task 4: Donation Page

**Goal:** Create `app/donate/page.tsx` with a Give Lively embed, impact-focused copy, and Donate CTAs in the nav, footer, and homepage hero.

**Files:**
- Create: `app/donate/page.tsx`
- Modify: `components/layout/Nav.tsx` — add Donate button (styled differently, not a nav link)
- Modify: `components/layout/Footer.tsx` — add Donate link
- Modify: `app/page.tsx` — add Donate CTA alongside existing hero CTAs

**Give Lively embed pattern:**
Give Lively provides a `<script>` tag embed + a `<div>` target element. In Next.js, the script must be loaded via `next/script` with `strategy="afterInteractive"`. The embed div needs a `data-campaign-id` attribute.

Since we don't have the actual Give Lively campaign ID yet, use a placeholder `data-campaign-id="GIVE_LIVELY_CAMPAIGN_ID"` and add a note.

- [ ] **Step 1: Create `app/donate/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Donate | Support Free Peer Support | Project Reach',
  description: 'Your donation keeps peer support free for everyone. 100% of contributions fund volunteer training and platform operations.',
  canonical: 'https://www.thereachcommunity.com/donate',
})

export default function DonatePage() {
  return (
    <>
      <JsonLd schema={/* BreadcrumbList */} />
      {/* breadcrumb */}
      <main id="main-content">
        {/* Hero: "Your support keeps us free" */}
        {/* Impact copy: "$X covers Y peer support sessions" */}
        {/* Give Lively embed: */}
        {/*   <div data-gl-widget data-campaign-id="GIVE_LIVELY_CAMPAIGN_ID" /> */}
        {/*   <Script src="https://secure.givelively.org/widgets/branded_campaign/..." strategy="afterInteractive" /> */}
        {/* FAQ: tax-deductible? how funds are used? */}
      </main>
    </>
  )
}
```

> **Note:** Replace `GIVE_LIVELY_CAMPAIGN_ID` with the actual ID from https://www.givelively.org once the nonprofit account is set up.

- [ ] **Step 2: Add a "Donate" button to Nav desktop + mobile menus**

The donate button should be visually distinct (accent color) and positioned after the volunteer dropdown:
```tsx
// In the desktop nav, after the volunteer dropdown:
<li>
  <Link
    href="/donate"
    className="bg-accent text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
  >
    Donate
  </Link>
</li>
```
Add the same as a list item in the mobile nav panel.

- [ ] **Step 3: Add Donate link to Footer**

Add `{ href: '/donate', label: 'Donate' }` to the Navigate column in `Footer.tsx`.

- [ ] **Step 4: Add Donate CTA to homepage hero in `app/page.tsx`**

The homepage already has two hero CTAs (Get Support + Volunteer). Add a third:
```tsx
<Link
  href="/donate"
  className="border border-accent text-accent font-semibold px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors"
>
  Donate
</Link>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```
Expected: `/donate` route in build output; no `next/script` type errors.

- [ ] **Step 6: Commit**

```bash
git add app/donate/page.tsx components/layout/Nav.tsx components/layout/Footer.tsx app/page.tsx
git commit -m "feat: add donation page with Give Lively embed scaffold and Donate CTAs"
```

---

## Task 5: Peer Support Intake Questionnaire

**Goal:** Create a multi-step intake form at `/intake` that collects (optional) name, what brings the user here, and preferred contact method — then opens the Tawk.to chat widget with the context pre-loaded as visitor attributes.

**Why no backend:** Tawk.to's JS API (`Tawk_API.setAttributes`, `Tawk_API.maximize`) lets us pass context client-side before opening the chat. No server call needed.

**Files:**
- Create: `app/intake/page.tsx` — `'use client'` multi-step form
- Modify: `app/get-support/page.tsx` — add "Guided intake" link/button

**Form steps:**
1. **Step 1 — About You:** Name (optional, placeholder "You can stay anonymous"), "What's on your mind today?" (textarea, required)
2. **Step 2 — How to Connect:** Pick one: Live Chat, Text/SMS, Community Forum
3. **Step 3 — Ready:** Summary + action button

**Tawk.to context handoff (Step 3 submit):**
```ts
// When user selects Live Chat and clicks "Start":
window.Tawk_API?.setAttributes?.({
  'intake-topic': topic,
  ...(name ? { name } : {}),
}, (err: unknown) => { if (!err) window.Tawk_API?.maximize?.() })

// For Text: navigate to sms: link
// For Community: open Discourse in new tab
```

- [ ] **Step 1: Create `app/intake/page.tsx`**

Full implementation:
```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type Step = 1 | 2 | 3
type ContactMethod = 'chat' | 'text' | 'community'

export default function IntakePage() {
  const [step, setStep] = useState<Step>(1)
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [contactMethod, setContactMethod] = useState<ContactMethod | null>(null)
  const [topicError, setTopicError] = useState('')

  function goToStep2(e: React.FormEvent) {
    e.preventDefault()
    if (!topic.trim()) { setTopicError('Please tell us what's on your mind.'); return }
    setTopicError('')
    setStep(2)
  }

  function goToStep3(method: ContactMethod) {
    setContactMethod(method)
    setStep(3)
  }

  function handleConnect() {
    if (contactMethod === 'chat') {
      window.Tawk_API?.setAttributes?.(
        { 'intake-topic': topic, ...(name ? { name } : {}) },
        (err: unknown) => { if (!err) window.Tawk_API?.maximize?.() }
      )
    } else if (contactMethod === 'text') {
      window.location.href = 'sms:+19014921712'
    } else {
      window.open('https://thereachcommunity.discourse.group/', '_blank', 'noopener noreferrer')
    }
  }

  const contactLabels = { chat: 'Live Chat', text: 'Text / SMS', community: 'Community Forum' }

  return (
    <main id="main-content" className="min-h-[70vh] py-16 px-4">
      <div className="max-w-xl mx-auto">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8" aria-label="Step progress">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-colors ${step >= s ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={goToStep2} noValidate>
            <h1 className="font-heading text-3xl font-bold text-text-base mb-2">We're here to listen.</h1>
            <p className="text-text-muted mb-8">Share a little — so we can connect you in the right way. Everything is optional except what's on your mind.</p>
            <div className="mb-5">
              <label htmlFor="intake-name" className="block text-sm font-medium text-text-base mb-1">
                Your name <span className="text-text-muted font-normal">(optional — you can stay anonymous)</span>
              </label>
              <input
                id="intake-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name or nickname"
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-surface text-text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="intake-topic" className="block text-sm font-medium text-text-base mb-1">
                What's on your mind today? <span className="text-accent" aria-hidden>*</span>
              </label>
              <textarea
                id="intake-topic"
                value={topic}
                onChange={(e) => { setTopic(e.target.value); if (topicError) setTopicError('') }}
                rows={4}
                placeholder="You don't need the right words. Just start wherever feels natural."
                required
                aria-describedby={topicError ? 'topic-error' : undefined}
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-surface text-text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              />
              {topicError && <p id="topic-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{topicError}</p>}
            </div>
            <button type="submit" className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
              Continue →
            </button>
          </form>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-heading text-3xl font-bold text-text-base mb-2">How would you like to connect?</h1>
            <p className="text-text-muted mb-8">Pick whatever feels most comfortable right now.</p>
            <div className="flex flex-col gap-3">
              {([
                { id: 'chat' as const, emoji: '💬', label: 'Live Chat', sub: 'Talk with a volunteer right now' },
                { id: 'text' as const, emoji: '📱', label: 'Text / SMS', sub: 'Text us at +1 (901) 492-1712' },
                { id: 'community' as const, emoji: '🤝', label: 'Community Forum', sub: 'Connect with others who understand' },
              ]).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => goToStep3(opt.id)}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-surface hover:bg-surface-hover text-left transition-colors"
                >
                  <span aria-hidden className="text-3xl">{opt.emoji}</span>
                  <div>
                    <p className="font-semibold text-text-base">{opt.label}</p>
                    <p className="text-sm text-text-muted">{opt.sub}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-6 text-sm text-text-muted hover:text-primary transition-colors">
              ← Back
            </button>
          </div>
        )}

        {step === 3 && contactMethod && (
          <div className="text-center">
            <span aria-hidden className="text-6xl block mb-6">
              {contactMethod === 'chat' ? '💬' : contactMethod === 'text' ? '📱' : '🤝'}
            </span>
            <h1 className="font-heading text-3xl font-bold text-text-base mb-3">
              {name ? `We're ready for you, ${name}.` : "We're ready for you."}
            </h1>
            <p className="text-text-muted mb-8">
              {contactMethod === 'chat' && 'A volunteer will see your context when the chat opens — you don\'t need to repeat yourself.'}
              {contactMethod === 'text' && 'Your phone\'s messaging app will open. A volunteer will reply as soon as they\'re available.'}
              {contactMethod === 'community' && 'The community forum will open in a new tab.'}
            </p>
            <button
              onClick={handleConnect}
              className="bg-primary text-white font-semibold px-10 py-4 rounded-lg hover:opacity-90 transition-opacity text-lg"
            >
              {contactMethod === 'chat' && 'Open Chat'}
              {contactMethod === 'text' && 'Open Messaging'}
              {contactMethod === 'community' && 'Visit Forum'}
            </button>
            <p className="mt-6 text-xs text-text-muted">
              If you\'re in crisis, please{' '}
              <a href="tel:988" className="text-primary hover:underline font-medium">call or text 988</a>.
            </p>
            <button onClick={() => setStep(2)} className="mt-4 block mx-auto text-sm text-text-muted hover:text-primary transition-colors">
              ← Change method
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Add `metadata` export to `app/intake/page.tsx`**

Since the page is `'use client'`, metadata must be in a separate `layout.tsx` or moved to a wrapper. The simplest approach in Next.js 14: add a `app/intake/layout.tsx` server component that exports metadata:

```tsx
// app/intake/layout.tsx
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Get Connected | Project Reach',
  description: 'Tell us a little about what you\'re going through, and we\'ll help connect you with the right support.',
}
export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 3: Add "Guided intake" link to `app/get-support/page.tsx`**

Add a subtle link in the "Not ready to talk?" section:
```tsx
<Link href="/intake" className="border border-border text-text-base font-semibold px-6 py-2 rounded-lg hover:bg-surface transition-colors text-sm">
  Help me choose
</Link>
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: `/intake` route in build output (static), no type errors.

- [ ] **Step 5: Commit**

```bash
git add app/intake/ app/get-support/page.tsx
git commit -m "feat: add peer support intake questionnaire with Tawk.to context handoff"
```

---

## Task 6: Nav, Footer, Sitemap Cleanup

**Goal:** Add the new routes to the sitemap, update nav/footer for the donate button, and update the sitemap transform to include `/team`, `/donate`, `/intake`.

**Files:**
- Modify: `next-sitemap.config.js` — add new routes to priority list
- Modify: `next.config.mjs` — add `cdn.sanity.io` to `images.remotePatterns` for Sanity photo URLs

- [ ] **Step 1: Update `next-sitemap.config.js`**

```js
changefreq: ['/', '/about', '/get-support', '/resources', '/donate'].includes(path) ? 'daily' : 'weekly',
priority: ['/', '/get-support', '/about', '/resources', '/donate'].includes(path) ? 1.0
  : ['/team', '/impact', '/volunteer'].includes(path) ? 0.8
  : 0.7,
```

- [ ] **Step 2: Update `next.config.mjs` for Sanity image CDN**

```js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', port: '', pathname: '/**' },
    ],
  },
  async redirects() { /* existing redirects unchanged */ }
}
```

- [ ] **Step 3: Final full build + sitemap check**

```bash
npm run build
```
Expected: `/team`, `/donate`, `/intake` appear in build output; sitemap-0.xml updated in public/.

- [ ] **Step 4: Commit**

```bash
git add next-sitemap.config.js next.config.mjs
git commit -m "chore: add new routes to sitemap and Sanity image CDN to next.config"
```

---

## Verification Checklist

After all tasks complete:

- [ ] `npm run build` exits 0 with no TypeScript errors
- [ ] 21+ routes in build output (`/team`, `/donate`, `/intake` all present)
- [ ] `/team` renders initials avatars without Sanity credentials
- [ ] `/donate` renders without a Give Lively campaign ID (embed div is present but empty)
- [ ] `/intake` completes all 3 steps without errors
- [ ] `/impact` renders hardcoded fallback stats when Sanity is not configured
- [ ] Nav shows Donate button (styled in accent color)
- [ ] No `console.error` in browser dev tools on any page

---

## Out of Scope (Phase 3 Advanced — Separate Plan)

These require external service setup and a dedicated infrastructure plan:
- **Volunteer Portal** — NextAuth.js magic-link auth + Supabase database + protected routes. Requires Supabase project, OAuth app setup, environment variables.
- **Sanity Studio deployment** — `sanity deploy` to sanity.io/manage requires account credentials.
- **Resend domain verification** — `noreply@thereachcommunity.com` must be verified in Resend dashboard.
- **Give Lively campaign ID** — Requires nonprofit Give Lively account setup.
