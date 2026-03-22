# Design: Next.js + Vercel Go-Live

**Date:** 2026-03-21
**Status:** Approved
**Branch:** `feature/nextjs-migration` → merge to `main`

---

## Goal

Make the Next.js 14 + Sanity CMS version of thereachcommunity.com the permanent live site, replacing the current static HTML GitHub Pages deployment. All traffic routes through Vercel. `main` becomes the Next.js codebase.

---

## Context

The `feature/nextjs-migration` branch is 95% complete and already deployed to a Vercel preview URL. Vercel is connected to the GitHub repo. DNS is managed via GoDaddy. The Resend API key (volunteer form email notifications) is already configured in Vercel. Sanity env vars may or may not be set — the site has full static fallbacks so it works either way.

---

## Approach

**Fix branch → merge to main → configure Vercel production → DNS switch at GoDaddy**

This makes `main` the permanent source of truth. The feature branch is cleaned up after merge.

---

## Section 1: Code Fixes (in `feature/nextjs-migration` worktree)

### 1a. Remove `/donate` page

- Delete `app/donate/page.tsx`
- Remove all `/donate` navigation links from:
  - `components/layout/Nav.tsx`
  - `components/layout/Footer.tsx`
- Add a 301 redirect in `next.config.mjs`: `/donate` → `/get-support`

### 1b. Replace newsletter form with social media prompt

- Delete `components/ui/NewsletterForm.tsx`
- Delete `app/api/newsletter/route.ts`
- In `components/layout/Footer.tsx`: replace the newsletter form section with a "Follow us on social media" prompt linking to:
  - TikTok: @thereachcommunity
  - Facebook: The Reach Community
  - Instagram: @the_reach_community
- Remove Mailchimp vars (`MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_API_SERVER`) from `.env.local.example`

### 1c. Fix branding

- `app/privacy/page.tsx`: replace all instances of "Reach Collective" with "Project Reach"
- `app/terms/page.tsx`: replace all instances of "Reach Collective" with "Project Reach"

### 1d. Fix GA4 consent mode

**`app/layout.tsx`** — load GA4 immediately with consent defaulting to `denied`:

```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-S8M7YHYFMV"
  strategy="afterInteractive"
/>
<Script id="ga4-init" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
  gtag('config', 'G-S8M7YHYFMV');
`}</Script>
```

**`components/ui/CookieConsent.tsx`** — replace `enableAnalytics()` (which currently injects the GA4 script dynamically) with a `gtag('consent', 'update', ...)` call. The new `accept()` function body:

```ts
const accept = () => {
  localStorage.setItem('cookie-consent', 'accepted');
  setVisible(false);
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    });
  }
};
```

Delete the `enableAnalytics()` function entirely — the script is now loaded by `layout.tsx`.

### 1e. Confirm sitemap and robots.txt

The `next-sitemap` package is already wired to the `postbuild` script in `package.json` (`"postbuild": "next-sitemap"`). This generates `sitemap.xml` and `robots.txt` into the `/public` directory on every build, which Vercel serves correctly.

Verify that `next-sitemap.config.js` is present at the project root (it is, per audit) and that `siteUrl` is set to `https://www.thereachcommunity.com`. No additional changes needed — `next-sitemap` handles both files automatically.

---

## Section 2: Merge to `main`

- Merge `feature/nextjs-migration` into `main`
- Delete orphaned static files from root after merge (Next.js routing replaces them):
  - Static HTML: `index.html`, `about.html`, `get-support.html`, `volunteer.html`, `faq.html`, `blog.html`, `community.html`, `code-of-conduct.html`, `privacy.html`, `terms.html`, `404.html`, and all `/blog/*.html`
  - Static assets no longer referenced: `/scripts/*.js`, `/assets/styles.css`
- Keep: `CNAME`, `BingSiteAuth.xml`, `docs/`, `CLAUDE.md`

---

## Section 3: Vercel Configuration

- Confirm Vercel production deployment is set to `main` branch (not `feature/nextjs-migration`)
- Add custom domain `thereachcommunity.com` and `www.thereachcommunity.com` in Vercel dashboard → Project Settings → Domains
- Vercel auto-provisions SSL via Let's Encrypt
- Verify environment variables in Vercel (Settings → Environment Variables):
  - `RESEND_API_KEY` — already set ✅
  - `VOLUNTEER_NOTIFY_EMAIL` — confirm set (fallback is `projectreachplatform@gmail.com` if missing; must be explicitly set to avoid silent misdirection)
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` — set if available; static fallbacks serve otherwise
  - `NEXT_PUBLIC_SANITY_DATASET` — set if available

## Section 3.5: Pre-Cutover Smoke Test (on Vercel preview URL)

Before switching DNS, verify on the Vercel preview URL:

- [ ] Crisis resources (988, Crisis Text Line, +1 (901) 492-1712) visible on `/get-support`
- [ ] `/donate` redirects to `/get-support` with 301
- [ ] A legacy `.html` URL (e.g., `/about.html`) redirects to `/about` with 301
- [ ] Volunteer form submits successfully (check Resend dashboard for delivery)
- [ ] Tawk.to chat widget appears and opens
- [ ] Dark mode toggle works
- [ ] `/` homepage loads with no console errors
- [ ] SSL active on the preview URL (https)

---

## Section 4: DNS Switch at GoDaddy

In GoDaddy DNS management for `thereachcommunity.com`:

- Set the `@` (root) **A record** to `76.76.21.21` (Vercel's anycast IP — root domains cannot use CNAME)
- Set the `www` **CNAME** to `cname.vercel-dns.com`
- Remove or update the existing GitHub Pages A records / CNAME

> Vercel's dashboard (Project Settings → Domains) will show the exact target values to use. Use those if they differ from above.

DNS propagation: typically 5–30 minutes.

**After DNS propagates:**
- Disable GitHub Pages in the GitHub repository settings (Settings → Pages → Source: None). GitHub Pages must be disabled or it will attempt to rebuild on every push to `main` and conflict with Vercel serving the domain.

---

## Out of Scope

- Mailchimp newsletter integration (no account; replaced with social prompt)
- Give Lively donation widget (no account; `/donate` page removed)
- Sanity CMS content management (static fallbacks sufficient for launch; can be enabled post-launch)
- New page content or feature additions

---

## Success Criteria

- `thereachcommunity.com` serves the Next.js app via Vercel with SSL active
- All legacy `.html` URLs redirect to clean URLs (301 permanent)
- `/donate` redirects to `/get-support` (301 permanent)
- GA4 tracks pageviews from first load (consent mode, defaulting to denied)
- Volunteer form sends email notifications via Resend
- Crisis resources (988, Crisis Text Line, +1 (901) 492-1712) visible on all support-facing pages
- Newsletter form replaced with social media follow prompt
- All branding reads "Project Reach" (not "Reach Collective")
- GitHub Pages disabled — Vercel is the sole host
- Lighthouse score: LCP < 2.5s, CLS < 0.1
- No mixed-content warnings
