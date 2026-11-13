import { products, services, site } from './content';
import { servicePages, type ServicePageContent } from './servicePages';

export type PageMeta = {
  /** Short page name; becomes "<title> | Recon Managed Services" unless `titleTag` is set. */
  title: string;
  /** Full <title> override, for pages where the brand suffix would repeat or crowd out keywords. */
  titleTag?: string;
  /** Meta description: aim for ~140–160 characters with the page's main keyword and a reason to click. */
  description: string;
  /** Canonical path. Pages end in "/" to match the URLs Google indexed on the old WordPress site. */
  path: string;
  /** Extra schema.org nodes for this page, added to the site-wide graph. */
  schema?: Record<string, unknown>[];
};

const orgId = `${site.url}/#organization`;

/** Metadata + Service/BreadcrumbList structured data for a dedicated service page. */
function servicePageMeta(page: ServicePageContent): PageMeta {
  const url = `${site.url}${page.path}`;
  return {
    title: page.shortName,
    titleTag: page.titleTag,
    description: page.description,
    path: page.path,
    schema: [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.serviceType,
        serviceType: page.serviceType,
        description: page.description,
        url,
        provider: { '@id': orgId },
        areaServed: [
          { '@type': 'City', name: 'Beaumont, TX' },
          { '@type': 'AdministrativeArea', name: 'Southeast Texas' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services/` },
          { '@type': 'ListItem', position: 3, name: page.shortName, item: url },
        ],
      },
    ],
  };
}

/** Per-route metadata, shared by the client <Seo> component and the build-time prerenderer. */
export const pageMeta = {
  home: {
    title: 'IT Support in Beaumont, TX',
    // Brand-first so the home page doesn't compete with /managed/ for "managed IT services".
    titleTag: 'Recon Managed Services | IT Support in Beaumont, TX',
    description:
      'Beaumont-based managed IT services for Southeast Texas. Get responsive IT support, proactive cybersecurity, co-managed IT, and practical technology strategy.',
    path: '/',
  },
  services: {
    title: 'IT Services in Beaumont, TX',
    // Broad "IT services" hub; each service has its own page targeting its specific keyword.
    description:
      'Managed IT, co-managed IT, cybersecurity, and managed AI services for Southeast Texas organizations from a local Beaumont team. Talk through your needs.',
    path: '/services/',
  },
  managed: servicePageMeta(servicePages.managed),
  comanaged: servicePageMeta(servicePages.comanaged),
  cybersecurity: servicePageMeta(servicePages.cybersecurity),
  ai: servicePageMeta(servicePages.ai),
  products: {
    title: 'Business Technology Products',
    titleTag: 'Business Computers, Security Cameras & VoIP in Beaumont, TX',
    description:
      'Business computers, servers, security cameras, access control, and VoIP phone systems, selected, installed, and supported by Recon in Beaumont, Texas.',
    path: '/products/',
  },
  about: {
    title: 'About Recon Managed Services',
    titleTag: 'About Recon Managed Services | Beaumont, TX IT Company',
    description:
      'Meet the Beaumont-based managed IT team helping Southeast Texas organizations simplify technology, strengthen security, and plan with confidence.',
    path: '/about/',
  },
  contact: {
    title: 'Contact Recon Managed Services',
    titleTag: 'Contact Recon Managed Services | IT Support in Beaumont, TX',
    description:
      'Contact Recon Managed Services in Beaumont, TX. Call (409) 757-8115 or send a message about managed IT, cybersecurity, or co-managed IT support.',
    path: '/contact/',
  },
  terms: {
    title: 'Terms of Use',
    description: 'The terms that govern your access to and use of the Recon Managed Services website, reconms.com.',
    path: '/terms/',
  },
  privacy: {
    title: 'Privacy Policy',
    description:
      'How Recon Managed Services collects, uses, discloses, retains, and protects personal information submitted through reconms.com.',
    path: '/privacy-policy/',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you requested could not be found.',
    path: '/404',
  },
} satisfies Record<string, PageMeta>;

export const fullTitle = (meta: PageMeta) => meta.titleTag ?? `${meta.title} | ${site.name}`;
export const canonicalUrl = (meta: PageMeta) => `${site.url}${meta.path}`;
export const isNotFound = (meta: PageMeta) => meta.path === '/404';

export const socialImage = {
  url: `${site.url}/assets/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'Recon Managed Services: managed IT, cybersecurity, and technology strategy in Beaumont, Texas',
};

/** schema.org structured data describing the business, embedded on every page at build time. */
export function structuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': orgId,
      name: site.name,
      legalName: 'Recon Managed Services LLC',
      url: `${site.url}/`,
      logo: `${site.url}/assets/recon-logo.png`,
      image: socialImage.url,
      description:
        'Managed IT services, cybersecurity, co-managed IT, and technology strategy for organizations across Southeast Texas.',
      telephone: '+1-409-757-8115',
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address[0],
        addressLocality: 'Beaumont',
        addressRegion: 'TX',
        postalCode: '77702',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Beaumont, TX' },
        { '@type': 'AdministrativeArea', name: 'Southeast Texas' },
      ],
      sameAs: [site.linkedIn, 'https://www.facebook.com/reconms'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'IT services and business technology',
        itemListElement: [...services, ...products].map((item) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.title,
            description: item.text,
            ...('path' in item ? { url: `${site.url}${item.path}` } : {}),
          },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      publisher: { '@id': orgId },
    },
  ];
}
