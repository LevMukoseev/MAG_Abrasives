import { SITE_URL } from '@/lib/siteMetadata';

export default function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GD-Abrasives',
    legalName: 'ООО «ГД-Абрэзивс РУС»',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.jpg`,
    taxID: '6670531625',
    address: {
      '@type': 'PostalAddress',
      postalCode: '620078',
      addressCountry: 'RU',
      addressLocality: 'Екатеринбург',
      streetAddress: 'ул. Студенческая, 42а',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-912-285-51-11',
      contactType: 'sales',
      email: 'thebestgrindingwheels@yandex.ru',
      areaServed: ['RU'],
      availableLanguage: ['Russian'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
