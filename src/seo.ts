import { products, services, site } from './content';
import { postPath, posts, type PostMeta } from './blog';
import { productPages } from './productPages';
import { servicePages, type DetailPageContent } from './servicePages';

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
  /** Open Graph type; defaults to "website". */
  ogType?: 'website' | 'article';
  /** Articles: ISO publish / last-modified dates (also used as sitemap <lastmod>). */
  published?: string;
  modified?: string;
  /** Page-specific share image (absolute URL); defaults to the site-wide social image. */
  image?: { url: string; alt: string };
};

const orgId = `${site.url}/#organization`;

/** The towns and counties Recon serves, for schema.org areaServed. */
const serviceAreaSchema = [
  ...site.serviceArea.cities.map((city) => ({ '@type': 'City', name: `${city}, TX` })),
  ...site.serviceArea.counties.map((county) => ({ '@type': 'AdministrativeArea', name: `${county}, TX` })),
];

const sectionCrumbs = {
  service: { name: 'Services', path: '/services/' },
  product: { name: 'Products', path: '/products/' },
};

/** Metadata + Service/BreadcrumbList structured data for a dedicated service or product page. */
function detailPageMeta(page: DetailPageContent, kind: keyof typeof sectionCrumbs): PageMeta {
  const parent = sectionCrumbs[kind];
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
        areaServed: serviceAreaSchema,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: parent.name, item: `${site.url}${parent.path}` },
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
  managed: detailPageMeta(servicePages.managed, 'service'),
  comanaged: detailPageMeta(servicePages.comanaged, 'service'),
  cybersecurity: detailPageMeta(servicePages.cybersecurity, 'service'),
  ai: detailPageMeta(servicePages.ai, 'service'),
  products: {
    title: 'Business Technology Products',
    // Broad hub title; each product has its own page targeting its specific keyword.
    titleTag: 'Business Technology Products in Beaumont, TX | Recon Managed Services',
    description:
      'Business computers, servers, security cameras, access control, and VoIP phone systems, selected, installed, and supported by Recon in Beaumont, Texas.',
    path: '/products/',
  },
  hardware: detailPageMeta(productPages.hardware, 'product'),
  cameras: detailPageMeta(productPages.cameras, 'product'),
  accessControl: detailPageMeta(productPages.accessControl, 'product'),
  voip: detailPageMeta(productPages.voip, 'product'),
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
  blogIndex: {
    title: 'Blog',
    titleTag: 'IT & Cybersecurity Blog | Recon Managed Services',
    description:
      'Practical IT, cybersecurity, and technology advice for Southeast Texas organizations from the team at Recon Managed Services in Beaumont.',
    path: '/blog/',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you requested could not be found.',
    path: '/404',
  },
} satisfies Record<string, PageMeta>;

/** Metadata + BlogPosting/BreadcrumbList structured data for a blog post. */
export function postPageMeta(post: PostMeta): PageMeta {
  const path = postPath(post);
  const url = `${site.url}${path}`;
  const image = post.image ? { url: `${site.url}${post.image}`, alt: post.imageAlt ?? post.title } : undefined;
  return {
    title: post.title,
    description: post.description,
    path,
    ogType: 'article',
    published: post.date,
    modified: post.updated ?? post.date,
    image,
    schema: [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        url,
        mainEntityOfPage: url,
        image: image?.url ?? `${site.url}/assets/og-image.png`,
        ...(post.category ? { articleSection: post.category } : {}),
        author: { '@id': orgId },
        publisher: { '@id': orgId },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

/** Every page to prerender: the fixed pages plus one per published blog post. */
export function allPages(): PageMeta[] {
  const fixed = Object.values(pageMeta).filter((meta) => meta.path !== '/blog/' || posts.length > 0);
  return [...fixed, ...posts.map(postPageMeta)];
}

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
      areaServed: serviceAreaSchema,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
      hasMap: site.directionsUrl,
      sameAs: [site.linkedIn, site.facebook],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'IT services and business technology',
        itemListElement: [...services, ...products].map((item) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.title,
            description: item.text,
            url: `${site.url}${item.path}`,
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
