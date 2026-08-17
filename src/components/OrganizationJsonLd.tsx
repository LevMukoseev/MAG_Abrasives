const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gd-abrasives.ru';

export default function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GD-Abrasives',
    legalName: 'ООО «ГД-Абрэзивс РУС»',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.jpg`,
    taxID: '6670531625',
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
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
