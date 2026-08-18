import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import OrganizationJsonLd from '@/components/OrganizationJsonLd';

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gd-abrasives.ru';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'GD-Abrasives — премиальные шлифовальные круги для металлургии',
    template: '%s | GD-Abrasives',
  },
  description:
    'Официальный представитель Jiangsu Grinding Doctor Abrasives (GD-Abrasives) в России и СНГ. Шлифовальные круги для прокатных валков, отрезные круги большого диаметра, зубошлифование. Подбор спецификации, поставка 1-3 месяца.',
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
    title: 'GD-Abrasives — премиальные шлифовальные круги для металлургии',
    description:
      'Официальный представитель GD-Abrasives в России. Круги для валков, отрезные круги, подбор спецификации под задачу.',
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
    title: 'GD-Abrasives — премиальные шлифовальные круги',
    description:
      'Круги для прокатных валков, отрезные круги, зубошлифование. Официальный представитель в РФ и СНГ.',
    images: ['/images/og-cover.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
