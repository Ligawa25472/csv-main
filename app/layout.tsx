import type { Metadata } from 'next';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';
import { SITE } from '@/lib/site.config';

export const metadata: Metadata = {
  title: `${SITE.name} | Expert Bookkeeping & Accounting Services`,
  description: SITE.tagline,
  keywords: 'accountant, bookkeeping, accountancy, VAT, tax, Birmingham, West Midlands',
  openGraph: {
    title: `${SITE.name} | Expert Bookkeeping & Accounting Services`,
    description: SITE.tagline,
    type: 'website',
    locale: 'en_GB',
  },
  robots: 'index, follow',
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a2a3a" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
