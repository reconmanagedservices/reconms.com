import type { IconName } from './components/Icon';
import { posts } from './blog';

export const site = {
  name: 'Recon Managed Services',
  url: 'https://reconms.com',
  phone: '(409) 757-8115',
  phoneHref: 'tel:+14097578115',
  email: 'hello@reconms.com',
  address: ['2590 Calder Ave.', 'Beaumont, TX 77702'],
  customerPortal: 'https://portal.reconms.com',
  careers: 'https://my.reconms.com',
  /** Texas Private Security license, shown in the footer on every page. */
  securityLicense: 'TX Private Security License #B30823401',
  linkedIn: 'https://www.linkedin.com/company/reconms/',
  facebook: 'https://www.facebook.com/reconms',
};

export const navItems: [label: string, path: string][] = [
  ['Services', '/services/'],
  ['Products', '/products/'],
  ['Why Recon', '/about/'],
  // Blog appears once there is at least one published post in content/blog/.
  ...(posts.length > 0 ? ([['Blog', '/blog/']] as [string, string][]) : []),
  ['Contact', '/contact/'],
];

export type Service = {
  icon: IconName;
  title: string;
  /** Short name used in link text, e.g. "Explore Managed IT". */
  shortName: string;
  /** URL of the dedicated service page (see src/servicePages.ts). */
  path: string;
  text: string;
  points: string[];
};

export const services: Service[] = [
  {
    icon: 'headset',
    title: 'Managed IT Services',
    shortName: 'Managed IT',
    path: '/managed/',
    text: 'Complete, proactive management for your people, devices, network, and cloud—backed by responsive experts who know your environment.',
    points: [
      'Proactive monitoring and support',
      'Help desk and device management',
      'Backup and business continuity',
      'Vendor and license coordination',
    ],
  },
  {
    icon: 'network',
    title: 'Co-Managed IT',
    shortName: 'Co-Managed IT',
    path: '/comanaged/',
    text: 'Give your internal IT team the tools, capacity, and specialized expertise they need to focus on strategic work.',
    points: [
      'Flexible team augmentation',
      'Advanced tools and automation',
      'Project and escalation support',
      'Shared documentation and planning',
    ],
  },
  {
    icon: 'shield',
    title: 'Cybersecurity',
    shortName: 'Cybersecurity',
    path: '/cybersecurity/',
    text: 'Layered protection designed to reduce risk, secure your data, and keep your team ready for evolving threats.',
    points: [
      'Endpoint and identity protection',
      'Security monitoring',
      'Employee security training',
      'Risk and readiness reviews',
    ],
  },
  {
    icon: 'spark',
    title: 'Managed AI Services',
    shortName: 'Managed AI',
    path: '/ai/',
    text: 'Prepare, implement, and optimize practical AI solutions that create measurable value without adding unnecessary risk.',
    points: [
      'AI readiness planning',
      'Secure implementation',
      'Workflow optimization',
      'Governance and adoption support',
    ],
  },
];

export type Product = {
  icon: IconName;
  title: string;
  /** Short name used in link text and breadcrumbs. */
  shortName: string;
  /** URL of the dedicated product page (see src/productPages.ts). */
  path: string;
  text: string;
  items: string[];
};

export const products: Product[] = [
  {
    icon: 'server',
    title: 'Computer Hardware',
    shortName: 'Computer Hardware',
    path: '/products/computer-hardware/',
    text: 'Business-ready computers, servers, and infrastructure selected, configured, and supported for the way your team works.',
    items: [
      'Desktops and laptops',
      'Servers and storage',
      'Workstations and peripherals',
      'Deployment and lifecycle planning',
    ],
  },
  {
    icon: 'camera',
    title: 'Security Cameras',
    shortName: 'Security Cameras',
    path: '/products/security-cameras/',
    text: 'Clear, reliable video surveillance that helps you monitor facilities, investigate events, and protect the people and property that matter.',
    items: [
      'Indoor and outdoor cameras',
      'Remote viewing',
      'Video retention planning',
      'Professional installation',
    ],
  },
  {
    icon: 'door',
    title: 'Access Control',
    shortName: 'Access Control',
    path: '/products/access-control/',
    text: 'Modern entry systems that make it easier to manage who can access your property, sensitive rooms, and critical areas.',
    items: [
      'Card and mobile credentials',
      'Door controllers and readers',
      'Centralized access management',
      'Entry activity reporting',
    ],
  },
  {
    icon: 'phone',
    title: 'VoIP Phone Systems',
    shortName: 'VoIP Phone Systems',
    path: '/products/voip-phone-systems/',
    text: 'Flexible business phone systems that keep your team connected in the office, on the road, and across multiple locations.',
    items: [
      'Desk and conference phones',
      'Mobile and desktop apps',
      'Auto attendants and call routing',
      'Number porting and setup',
    ],
  },
];

export const faqs = [
  {
    question: 'What does a managed IT services provider handle?',
    answer:
      'Recon can manage day-to-day support, devices, networks, Microsoft 365, cybersecurity, backups, vendors, and long-term technology planning. Your exact plan is shaped around your team and business goals.',
  },
  {
    question: 'Can Recon work with our existing IT employee or department?',
    answer:
      'Yes. Our co-managed IT model adds specialized expertise, responsive help desk capacity, enterprise-grade tools, and project support while your internal team retains control and focuses on strategic priorities.',
  },
  {
    question: 'Do you provide IT support outside Beaumont?',
    answer:
      'Recon is based in Beaumont and serves organizations throughout Southeast Texas. Contact our team to discuss your locations, remote workforce, and on-site support needs.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Start with a brief conversation about your current environment, recurring issues, risks, and goals. We will recommend a practical next step and a support approach tailored to your organization.',
  },
];
