import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-7xl font-bold text-primary mb-2">404</h1>
        <p className="text-xl text-text-muted mb-3">Page not found</p>
        <p className="text-text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. But we&apos;re still here for you.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            Back to Home
          </Link>
          <Link href="/get-support" className="inline-block border border-border text-text-base font-semibold px-6 py-2.5 rounded-lg hover:bg-surface transition-colors">
            Get Support
          </Link>
        </div>
      </div>
    </main>
  )
}
