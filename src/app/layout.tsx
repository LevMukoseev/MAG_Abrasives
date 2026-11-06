import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import OrganizationJsonLd from '@/components/OrganizationJsonLd';
import { SITE_URL, indexingMetadata } from '@/lib/siteMetadata';

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'GD-Abrasives — абразивный инструмент, станки и прокатные валки',
    template: '%s | GD-Abrasives',
  },
  description:
    'Абразивный инструмент, отрезные и зачистные станки, прокатные валки и оборудование для металлографии. Подбор спецификации и поставки в Россию и СНГ.',
  keywords: [
    'шлифовальные круги',
    'абразивные круги',
    'шлифовка прокатных валков',
    'отрезные круги большого диаметра',
    'GD-Abrasives',
    'абразивный инструмент купить',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: 'GD-Abrasives',
    title: 'GD-Abrasives — абразивный инструмент, станки и прокатные валки',
    description:
      'Инструмент и оборудование для обработки металла, прокатные валки и металлография. Подбор под вашу задачу.',
    images: [
      {
        url: '/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GD-Abrasives — шлифовальные круги',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GD-Abrasives — инструмент и оборудование для обработки металла',
    description:
      'Абразивный инструмент, станки, прокатные валки и металлография. Подбор спецификации, поставки в Россию и СНГ.',
    images: ['/images/og-cover.jpg'],
  },
  robots: indexingMetadata,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={nunito.variable}>
      <body className="font-sans bg-paper text-ink antialiased">
        <OrganizationJsonLd />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
