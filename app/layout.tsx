import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700", "800"],
  style: ["normal", "italic"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thereachcommunity.com'),
  ...buildMetadata({
    title: 'Project Reach | Free Peer Support',
    description: 'Free, anonymous peer support via live chat and SMS. No waitlist, no cost — real humans who care.',
    canonical: 'https://www.thereachcommunity.com',
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lora.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          {children}
          <Footer />
          <CookieConsent />
        </ThemeProvider>
        {/* GA4 — loads immediately with consent denied by default */}
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
        {/* Tawk.to is loaded conditionally by CookieConsent after user accepts cookies */}
      </body>
    </html>
  );
}
