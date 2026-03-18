# Project Reach — Full Site Audit Report

**Date:** 2026-03-17
**Auditor:** Claude (AI-assisted)
**Site:** [thereachcommunity.com](https://thereachcommunity.com) (GitHub Pages)
**Branch:** `main`

---

## Table of Contents

1. [Site Inventory](#1-site-inventory)
2. [Technical Performance](#2-technical-performance)
3. [Accessibility Audit](#3-accessibility-audit)
4. [SEO Audit](#4-seo-audit)
5. [UX / Conversion Audit](#5-ux--conversion-audit)
6. [Prioritized Remediation Plan](#6-prioritized-remediation-plan)

---

## 1. Site Inventory

### Pages (8 HTML + 2 partials)

| Page | URL Path | `<title>` Tag |
|------|----------|---------------|
| `index.html` | `/` | Project Reach -- Peer Support |
| `about.html` | `/about` | About Us -- Project Reach |
| `get-support.html` | `/get-support` | Get Support -- Project Reach |
| `volunteer.html` | `/volunteer` | Volunteer -- Project Reach |
| `faq.html` | `/faq` | FAQ -- Project Reach |
| `code-of-conduct.html` | `/code-of-conduct` | Code of Conduct -- Project Reach |
| `privacy.html` | `/privacy` | Privacy Policy -- Project Reach |
| `terms.html` | `/terms` | Terms of Service -- Project Reach |
| `assets/partials/header.html` | *(partial)* | Nav bar loaded via `fetch()` |
| `assets/partials/footer.html` | *(partial)* | Footer loaded via `fetch()` |

### Scripts (6 JS files)

| File | Purpose |
|------|---------|
| `scripts/nav.js` | Mobile nav toggle, dropdown menus, keyboard support |
| `scripts/dark_mode.js` | Theme toggle with `localStorage` persistence |
| `scripts/animations.js` | `IntersectionObserver` for fade-in-up + floating CTA |
| `scripts/carousel.js` | Testimonial carousel with auto-advance, respects `prefers-reduced-motion` |
| `scripts/toast.js` | Toast notification system |
| `scripts/volunteer-form.js` | Multi-step form wizard with Formspree submission |

### External Services

| Service | Identifier / Usage |
|---------|--------------------|
| Google Analytics 4 | `G-S8M7YHYFMV` (all pages) |
| Tawk.to chat widget | `index.html` and `get-support.html` |
| Formspree | Volunteer form submission endpoint |
| Google Fonts | Playfair Display + Lora (`display=swap`) |

### Typography & Color Palette (current redesigned state)

**Fonts:** Playfair Display (headings), Lora (body), Georgia (fallback)

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Background | `#FAF7F2` (ivory) | `#141210` (espresso) |
| Primary | `#2D4A3E` (forest green) | `#6BAF96` (green) |
| Accent | `#C4622D` (terracotta) | `#D4895A` (amber) |

---

## 2. Technical Performance

### Render-Blocking Resources -- GOOD

- `normalize.css` via CDN (small, acceptable)
- Google Fonts with `display=swap` (correct)
- `styles.css` (necessary)
- All JS files deferred to end of `<body>`
- Dark mode FOUC prevention: inline `<script>` in `<head>` sets `.dark` class from `localStorage` before paint (correct)

### Image Optimization -- NEEDS WORK

The site uses only 2 raster images (the `reach-logo.png` in header and footer).

| Issue | Severity | Details |
|-------|----------|---------|
| Missing `loading="lazy"` | LOW | Logo is above-the-fold so `lazy` isn't critical, but should be set on footer logo |
| Missing `width`/`height` attributes | HIGH | Causes CLS (Cumulative Layout Shift) as image dimensions are unknown until loaded |
| No WebP format | LOW | Single small logo; marginal benefit |
| No `srcset` for responsive sizes | LOW | Logo is small and fixed-size |

SVGs are used inline throughout the site (decorative icons) -- this is appropriate.

### Font Loading -- GOOD

- Google Fonts loaded with `display=swap` parameter
- Serif fallbacks (`Georgia`) specified in CSS custom properties
- Only needed weights loaded (Playfair 700/800/italic-400, Lora 400/600/italic-400)

### Missing Infrastructure

| Item | Status | Impact |
|------|--------|--------|
| `robots.txt` | **Missing (404)** | CRITICAL -- crawlers have no directives |
| `sitemap.xml` | **Missing (404)** | CRITICAL -- search engines can't discover pages |
| Service worker / PWA manifest | Missing | LOW -- not essential for this site type |
| Custom 404 page | Missing | MEDIUM -- users hitting bad URLs see GitHub's default 404 |

---

## 3. Accessibility Audit

### 3.1 Color Contrast

| Pairing | Approx. Ratio | WCAG AA (4.5:1) | Status |
|---------|---------------|-----------------|--------|
| `#1A1714` on `#FAF7F2` (body text on bg) | ~11.8:1 | PASS | OK |
| `#6B6156` on `#FAF7F2` (muted text on bg) | ~4.8:1 | PASS | OK |
| `#6B6156` on `#FFFFFF` (muted text on white surface) | ~4.2:1 | **FAIL** | **HIGH** |
| `#C4622D` on `#FFFFFF` (accent on white) | ~4.8:1 | PASS | OK |
| `#FFFFFF` on `#C4622D` (button text on accent) | ~6.1:1 | PASS | OK |
| Dark: `#EDE5D8` on `#141210` | ~12.3:1 | PASS | OK |
| Dark: `#9E9286` on `#141210` | ~5.4:1 | PASS | OK |

**Finding [HIGH]:** `--color-text-muted` (`#6B6156`) fails WCAG AA when rendered on white surface backgrounds (cards, modals). Needs to be darkened to ~`#5E5449` or similar when on white.

### 3.2 Focus States -- CRITICAL GAP

**Present:**
- Form inputs (`input`, `textarea`, `select`) have `box-shadow: 0 0 0 3px` on `:focus`
- Skip link (`.skip-link:focus`) visible on focus
- FAQ search input has focus style

**Missing focus-visible styles on:**
- Nav links and dropdown toggle
- Primary and secondary buttons (`.btn-primary`, `.btn-secondary`)
- Carousel prev/next buttons and dots
- Theme toggle button
- FAQ accordion buttons (`.faq-question`)
- Floating CTA button

> **Severity: CRITICAL.** Keyboard-only users cannot see where focus is on the majority of interactive elements.

### 3.3 ARIA Attributes

**Present and correct:**
- Skip link targets `#main-content`
- `role="alert"` on disclaimer banners
- `aria-expanded` on mobile nav toggle and dropdown
- `aria-expanded` on FAQ accordion buttons (toggled via JS)
- `aria-hidden="true"` on decorative SVGs and asterisks
- `aria-label` on floating CTA, carousel buttons

**Missing:**
| Element | Missing Attribute | Severity |
|---------|-------------------|----------|
| Volunteer form steps | `aria-current="step"` on active step | HIGH |
| Testimonial carousel | `role="region"` + `aria-label` | HIGH |

### 3.4 Keyboard Navigation -- PARTIAL

**Working:**
- `Escape` closes dropdown and mobile menu (`nav.js`)
- Click-outside closes dropdown

**Missing:**
| Feature | Severity |
|---------|----------|
| Arrow key navigation in carousel | MEDIUM |
| Arrow key navigation in dropdown menu | MEDIUM |
| `Escape` key support in FAQ accordion (close open item) | LOW |

### 3.5 `prefers-reduced-motion` -- PARTIAL

**Wrapped correctly:**
- Fade-in-up animations (`.animate-on-scroll`) inside `@media (prefers-reduced-motion: no-preference)`
- Carousel auto-advance disabled when motion reduced (in `carousel.js`)

**NOT wrapped:**
- Form step slide transitions
- Floating CTA entrance/pulse animation
- Toast notification slide-in
- Mobile menu open/close transition

> **Severity: MEDIUM.** Users who opt out of motion still see several animations.

### 3.6 Tap Targets

| Element | Size | Status |
|---------|------|--------|
| Buttons (`.btn-primary`, etc.) | >= 44px height | OK |
| Carousel dots (`.carousel-dot`) | **6px x 6px** (20px when active) | **FAIL** -- min 44px recommended |
| FAQ filter pills | May be < 44px on small screens | WARNING |

---

## 4. SEO Audit

### 4.1 Indexing Status -- CRITICAL

- **`site:thereachcommunity.com` returns ZERO results** -- site is not indexed by Google.
- **`site:michjt19.github.io/Project-Reach` returns ZERO results.**
- No `robots.txt` file exists (404 response).
- No `sitemap.xml` file exists (404 response).
- All canonical URLs point to `michjt19.github.io` instead of `thereachcommunity.com`.

> **This is the single most impactful SEO issue.** The site is invisible to search engines.

### 4.2 Meta Tags -- PRESENT but misconfigured

All 8 pages include: `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, and Twitter Card tag.

| Issue | Affected Pages | Severity |
|-------|---------------|----------|
| Canonical URLs reference `michjt19.github.io` instead of `thereachcommunity.com` | ALL 8 pages | CRITICAL |
| No `<meta name="theme-color">` | ALL 8 pages | HIGH |
| Title tags are generic, not keyword-targeted | ALL 8 pages | HIGH |
| Meta descriptions on legal pages are minimal | `privacy.html`, `terms.html`, `code-of-conduct.html` | MEDIUM |

**Example canonical issue** (`index.html` line 14):
```html
<link rel="canonical" href="https://michjt19.github.io/Project-Reach/index.html" />
<!-- Should be: -->
<link rel="canonical" href="https://thereachcommunity.com/" />
```

### 4.3 Heading Hierarchy

| Page | Structure | Status |
|------|-----------|--------|
| `index.html` | H1 -> H2 -> H3 | OK |
| `about.html` | H1 -> H2 -> H3 | OK |
| `faq.html` | H1 -> H2 -> H3 | OK |
| `code-of-conduct.html` | H1 -> H2 -> H3 | OK |
| `privacy.html` | H1 -> H2 -> H3 | OK |
| `terms.html` | H1 -> H2 -> H3 | OK |
| **`get-support.html`** | H1 -> **H3** (skips H2) | **FAIL** |
| **`volunteer.html`** | H1 -> **H3** (skips H2) | **FAIL** |

`get-support.html` has H3 elements ("Live Chat", "Text / SMS", "What to Expect") before the first H2 ("Emergency & Helpful Resources"). `volunteer.html` has H3 form step headings with no parent H2.

### 4.4 Structured Data (Schema Markup) -- NONE

No JSON-LD structured data exists on any page. Missing schemas:

| Schema | Recommended Page | Priority |
|--------|-----------------|----------|
| `Organization` | `index.html` | CRITICAL |
| `WebSite` (with `SearchAction`) | `index.html` | CRITICAL |
| `FAQPage` | `faq.html` | CRITICAL |
| `ContactPoint` | `get-support.html` | HIGH |
| `BreadcrumbList` | All inner pages | LOW |

### 4.5 Internal Linking -- GOOD

- No orphaned pages -- all pages are linked from nav and footer.
- Cross-page links present (Get Support -> About, FAQ; About -> Get Support; etc.).
- Floating CTA on all pages links to `get-support.html`.

---

## 5. UX / Conversion Audit

### 5.1 Homepage Journey -- STRONG

**Content flow:** Disclaimer -> Hero (CTA) -> Trust Bar -> How It Works -> Resources -> Volunteer CTA

| Strength | Detail |
|----------|--------|
| Primary CTA immediately visible | "Get Support Now" button in hero section |
| Trust signals | "100% Free", "No Waitlist", "Real Humans", "24/7 Available" pills |
| Dual audience served | Support seekers (hero CTA) + volunteers (bottom CTA) |

| Gap | Severity |
|-----|----------|
| No testimonial on homepage (only on About page) | MEDIUM |
| Disclaimer banner at very top may frame the experience as cautionary before the user engages | LOW |

### 5.2 Get Support Page -- STRONG

**Three parallel channels:** Live Chat (Tawk), SMS (clickable link), What to Expect.

| Strength | Detail |
|----------|--------|
| Anxiety-reducing "What to Expect" section | Sets expectations before first contact |
| Reassurance strip below channels | Reinforces safety and privacy |
| "Not ready to talk?" fallback | Links to About and FAQ as lower-commitment alternatives |

| Gap | Severity |
|-----|----------|
| Tawk fallback is `alert()` if widget hasn't loaded | MEDIUM |
| No "What will I say?" conversation starter guide | LOW |

**Tawk fallback code** (`get-support.html` line 58):
```html
onclick="if(typeof Tawk_API!=='undefined')Tawk_API.toggle();else alert('Chat is loading...');"
```
An `alert()` dialog is jarring UX, especially for an anxious user. Should be replaced with an inline message or toast.

### 5.3 Volunteer Page -- STRONG

| Strength | Detail |
|----------|--------|
| Expectations stated upfront | "2 hrs/week", "training provided", "fully remote" chips |
| 3-step form reduces cognitive load | Progressive disclosure pattern |
| Real-time validation per step | Prevents submission errors |
| Code of Conduct linked in form | Sets behavioral expectations |

| Gap | Severity |
|-----|----------|
| Post-submission shows only generic toast ("We'll be in touch soon") -- no timeline or next steps | MEDIUM |
| No volunteer testimonial on form page | LOW |

### 5.4 FAQ Page -- GOOD

- 3 filter tabs (All / Seekers / Volunteers) + search with debounce
- 9 questions covering both audiences

| Gap | Severity |
|-----|----------|
| Anxiety-reducing questions not surfaced first (buried in middle of list) | LOW |

### 5.5 Global UX Elements

| Element | Status |
|---------|--------|
| "Get Support" nav link has distinct styling (`.nav-support-link`) | OK |
| Floating "Need help?" CTA on all pages | OK |
| Footer has all links + SMS number + 988 reference | OK |
| **Footer copyright says "2025"** | **Outdated** (should be 2026) |

---

## 6. Prioritized Remediation Plan

### CRITICAL -- Must fix first

| # | Issue | Affected | Effort |
|---|-------|----------|--------|
| 1 | Create `robots.txt` -- allow all crawlers, reference sitemap | Site-wide | Small |
| 2 | Create `sitemap.xml` -- all 8 pages with `lastmod` dates | Site-wide | Small |
| 3 | Fix canonical URLs -- change from `michjt19.github.io` to `thereachcommunity.com` on all pages (also fix OG URLs and OG image URLs) | All 8 pages | Medium |
| 4 | Add JSON-LD structured data -- `Organization` + `WebSite` on homepage, `FAQPage` on `faq.html` | `index.html`, `faq.html` | Medium |
| 5 | Add visible `:focus-visible` styles on all interactive elements (nav links, buttons, carousel controls, theme toggle, FAQ accordion buttons) | `styles.css` | Medium |

### HIGH -- Significant impact

| # | Issue | Affected | Effort |
|---|-------|----------|--------|
| 6 | Optimize `<title>` tags -- keyword-targeted, conversion-oriented | All 8 pages | Small |
| 7 | Expand `<meta name="description">` -- especially on legal/utility pages | `privacy.html`, `terms.html`, `code-of-conduct.html` | Small |
| 8 | Fix heading hierarchy -- change H3s to H2s or add parent H2s | `get-support.html`, `volunteer.html` | Small |
| 9 | Fix `--color-text-muted` contrast on white surfaces -- darken to meet WCAG AA 4.5:1 | `styles.css` | Small |
| 10 | Add `<meta name="theme-color">` | All 8 pages | Small |
| 11 | Add `width`/`height` attributes to logo images to prevent CLS | `header.html`, `footer.html` | Small |
| 12 | Add `aria-current="step"` to active volunteer form step | `volunteer-form.js` | Small |

### MEDIUM -- Meaningful improvement

| # | Issue | Affected | Effort |
|---|-------|----------|--------|
| 13 | Add arrow key navigation to carousel | `carousel.js` | Medium |
| 14 | Wrap remaining animations in `prefers-reduced-motion` (form slides, floating CTA, toast, mobile menu) | `styles.css` | Medium |
| 15 | Increase carousel dot tap targets to >= 44px | `styles.css` | Small |
| 16 | Improve Tawk fallback -- replace `alert()` with inline message or toast | `get-support.html` | Small |
| 17 | Add homepage testimonial section | `index.html` | Medium |
| 18 | Create custom 404 page | `404.html` | Medium |
| 19 | Add `role="region"` + `aria-label` to testimonial carousel | `about.html` | Small |

### LOW -- Polish

| # | Issue | Affected | Effort |
|---|-------|----------|--------|
| 20 | Add `BreadcrumbList` schema on inner pages | All inner pages | Medium |
| 21 | Update footer copyright to 2026 | `footer.html` | Small |
| 22 | Add volunteer testimonial to volunteer page | `volunteer.html` | Medium |
| 23 | Surface anxiety-reducing FAQ questions first | `faq.html` | Small |
| 24 | Add "What will I say?" conversation starter section | `get-support.html` | Medium |

---

## Corrections from Initial Plan

During verification against the actual codebase, the following discrepancy was found:

- **FAQ `aria-expanded`**: The initial plan flagged this as missing. **Actual finding: `aria-expanded` IS present** on all 9 FAQ question buttons and is correctly toggled via inline JS. This has been removed from the remediation list.

---

## Methodology

This audit was conducted by reading all HTML, CSS, and JS source files in the repository and cross-referencing against:

- WCAG 2.1 AA guidelines
- Google's SEO best practices
- Core Web Vitals metrics (CLS, LCP, FID)
- Mobile-first UX heuristics

No automated lighthouse or axe scans were run -- findings are based on manual code review. A follow-up automated scan is recommended to catch any issues missed in manual review.

---

*Report generated 2026-03-17. Review and approve before proceeding to remediation.*
