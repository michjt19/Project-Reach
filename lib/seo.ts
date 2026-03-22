import type { Metadata } from 'next'

interface SeoProps {
  title: string
  description: string
  canonical: string
  ogImage?: string
  schema?: object | object[]
}

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage,
}: Omit<SeoProps, 'schema'>): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Project Reach',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : ['/og-image.jpg'],
    },
  }
}
