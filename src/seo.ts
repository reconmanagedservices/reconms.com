import { site } from './content';

export type PageMeta = { title: string; description: string; path: string };

/** Per-route metadata, shared by the client <Seo> component and the build-time prerenderer. */
export const pageMeta = {
  home: {
    title: 'Managed IT Services in Beaumont, TX',
    description:
      'Responsive managed IT, cybersecurity, co-managed IT, and technology strategy for organizations across Southeast Texas.',
    path: '/',
  },
  services: {
    title: 'Managed IT and Cybersecurity Services',
    description:
      'Explore managed IT, co-managed IT, cybersecurity, and managed AI services from Recon Managed Services in Beaumont, Texas.',
    path: '/services',
  },
  products: {
    title: 'Business Technology Products',
    description:
      'Business computers, servers, security cameras, access control, and VoIP phone systems from Recon Managed Services in Beaumont, Texas.',
    path: '/products',
  },
  about: {
    title: 'About Recon Managed Services',
    description:
      'Meet the Beaumont-based managed IT team helping Southeast Texas organizations simplify technology and plan with confidence.',
    path: '/about',
  },
  contact: {
    title: 'Contact Recon Managed Services',
    description:
      'Talk with Recon Managed Services about managed IT, cybersecurity, co-managed support, or technology planning in Southeast Texas.',
    path: '/contact',
  },
  terms: {
    title: 'Terms of Use',
    description:
      'The terms that govern your access to and use of the Recon Managed Services website, reconms.com.',
    path: '/terms',
  },
  privacy: {
    title: 'Privacy Policy',
    description:
      'How Recon Managed Services collects, uses, discloses, retains, and protects personal information submitted through reconms.com.',
    path: '/privacy-policy',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you requested could not be found.',
    path: '/404',
  },
} satisfies Record<string, PageMeta>;

export const fullTitle = (meta: PageMeta) => `${meta.title} | ${site.name}`;
export const canonicalUrl = (meta: PageMeta) => `${site.url}${meta.path}`;
