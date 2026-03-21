# Sanity Studio — Project Reach

## Setup

1. Create a Sanity project at https://sanity.io (free tier)
2. Copy `.env.local.example` to `.env.local` in the project root and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Install Sanity CLI globally: `npm install -g @sanity/cli`
4. Install studio dependencies (from this directory): `npm install sanity @sanity/vision`
5. Login and deploy: `sanity login && sanity deploy`

## Document Types

- **Blog Post** (`post`) — Blog content (matches Next.js `/blog/[slug]` route)
- **Team Member** (`teamMember`) — Leadership / team page entries
- **Site Statistics** (`siteStats`) — Impact page counters (singleton — edit in Studio without a deploy)

## Importing existing blog posts

Use the Sanity Studio UI to create the 5 existing posts with matching slugs:
- `what-is-peer-support`
- `free-mental-health-resources-without-insurance`
- `how-to-talk-about-mental-health`
- `signs-you-need-someone-to-talk-to`
- `what-to-expect-from-online-peer-support`
