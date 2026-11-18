import type { IconName } from './components/Icon';
import { posts } from './blog';

export const site = {
  name: 'Recon Managed Services',
  url: 'https://reconms.com',
  phone: '(409) 757-8115',
  phoneHref: 'tel:+14097578115',
  email: 'hello@reconms.com',
  address: ['2590 Calder Ave.', 'Beaumont, TX 77702'],
  /** Office hours (support availability for managed clients is described on the service pages). */
  hours: {
    label: 'Monday–Friday, 8:00 AM–5:00 PM',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Recon%20Managed%20Services%2C%202590%20Calder%20Ave.%2C%20Beaumont%2C%20TX%2077702',
  serviceArea: {
    cities: [
      'Beaumont',
      'Lumberton',
      'Nederland',
      'Port Neches',
      'Port Arthur',
      'Groves',
      'Sour Lake',
      'Silsbee',
      'Kountze',
      'Orange',
      'Bridge City',
      'Vidor',
      'Crystal Beach',
      'Liberty',
      'Winnie',
    ],
    counties: ['Jefferson County', 'Hardin County', 'Orange County'],
  },
  customerPortal: 'https://portal.reconms.com',
  careers: 'https://my.reconms.com',
  /** Online scheduling for a discovery call (opens in a new tab). */
  bookingUrl: 'https://crm.reconms.com/book/discovery-call-mkq8373wd9',
  /** Texas Private Security license, shown in the footer on every page. */
  securityLicense: 'TX Private Security License #B30823401',
  linkedIn: 'https://www.linkedin.com/company/reconms/',
  facebook: 'https://www.facebook.com/reconms',
};

export const navItems: [label: string, path: string][] = [
  ['Services', '/services/'],
  ['Products', '/products/'],
  ['Industries', '/industries/'],
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
    icon: 'clipboard',
    title: 'Security Risk & Compliance',
    shortName: 'Risk & Compliance',
    path: '/security-risk-compliance/',
    text: 'Assess your risks, close the gaps that matter most, and document the controls clients, insurers, and regulators expect.',
    points: [
      'Security risk assessments',
      'Policies and procedures',
      'Framework and requirement alignment',
      'Questionnaire and insurance support',
    ],
  },
  {
    icon: 'chart',
    title: 'Business Intelligence',
    shortName: 'Business Intelligence',
    path: '/business-intelligence/',
    text: 'Connect the data spread across your systems and turn it into clear, secure dashboards that support better decisions.',
    points: [
      'Metrics and reporting planning',
      'Data connections and preparation',
      'Interactive dashboards',
      'Secure sharing and training',
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

export type Industry = {
  icon: IconName;
  title: string;
  /** Short name used in link text and breadcrumbs. */
  shortName: string;
  /** URL of the industry page (see src/industryPages.ts). */
  path: string;
  text: string;
};

export const industries: Industry[] = [
  {
    icon: 'factory',
    title: 'Manufacturing',
    shortName: 'Manufacturing',
    path: '/industries/manufacturing/',
    text: 'Reliable networks, security, and support that keep production moving.',
  },
  {
    icon: 'hardhat',
    title: 'Construction & Industrial Contractors',
    shortName: 'Construction & Industrial',
    path: '/industries/construction-industrial-contractors/',
    text: 'Connected job sites, secure field devices, and help meeting client security requirements.',
  },
  {
    icon: 'truck',
    title: 'Transportation & Logistics',
    shortName: 'Transportation & Logistics',
    path: '/industries/transportation-logistics/',
    text: 'Dependable connectivity and security for fleets, ports, warehouses, and yards.',
  },
  {
    icon: 'briefcase',
    title: 'Professional Services',
    shortName: 'Professional Services',
    path: '/industries/professional-services/',
    text: 'Secure, dependable technology for firms entrusted with client information.',
  },
  {
    icon: 'banknote',
    title: 'Financial Services',
    shortName: 'Financial Services',
    path: '/industries/financial-services/',
    text: 'Layered security and documentation for banks, credit unions, and agencies.',
  },
  {
    icon: 'medical',
    title: 'Healthcare',
    shortName: 'Healthcare',
    path: '/industries/healthcare/',
    text: 'Protected patient information and reliable systems for clinics and practices.',
  },
  {
    icon: 'heart',
    title: 'Nonprofits',
    shortName: 'Nonprofits',
    path: '/industries/nonprofits/',
    text: 'Dependable, budget-conscious IT that keeps the focus on the mission.',
  },
  {
    icon: 'landmark',
    title: 'Local Government',
    shortName: 'Local Government',
    path: '/industries/local-government/',
    text: 'Secure, resilient technology for cities, counties, and public entities.',
  },
  {
    icon: 'siren',
    title: 'Public Safety',
    shortName: 'Public Safety',
    path: '/industries/public-safety/',
    text: 'Around-the-clock reliability and protected data for police, fire, EMS, and dispatch.',
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

export type Leader = {
  name: string;
  /** Professional credential shown after the name, e.g. "PMP". */
  credential?: string;
  title: string;
  /** 1200x960 WebP in public/assets/team/. */
  photo: string;
  bio: string[];
  contact?: { label: string; href: string };
  /** Languages spoken, for schema.org knowsLanguage. */
  languages?: string[];
};

/** Leadership shown on the Why Recon page (src/pages/AboutPage.tsx). */
export const leadership: Leader[] = [
  {
    name: 'Justin Hidalgo',
    credential: 'PMP',
    title: 'Chief Technology Officer',
    photo: '/assets/team/justin-hidalgo.webp',
    bio: [
      'Justin has worked in enterprise IT for nearly 20 years, including leadership roles in local government across Southeast Texas. He specializes in public safety technology and brings a first responder’s perspective to it: he served as a volunteer firefighter for nearly 15 years and has served as a law enforcement officer since 2017, where he remains active today.',
      'At Recon, Justin leads the technical team and drives the innovation behind how we support and protect our clients. He is a certified Project Management Professional (PMP) and holds dozens of IT certifications.',
      'Justin has also served in emergency management leadership for a municipality, and has founded and served on the boards of several nonprofits focused on emergency management. He has been a partner at First Baptist Church of Beaumont since 2011.',
      'Justin and his wife are both from Beaumont, where they live with their three kids. His wife teaches at Legacy Christian Academy in Beaumont, where their kids also go to school.',
    ],
    contact: { label: site.email, href: `mailto:${site.email}` },
  },
  {
    name: 'Betsy Elizondo',
    title: 'Client Services Coordinator',
    languages: ['English', 'Spanish'],
    photo: '/assets/team/betsy-elizondo.webp',
    bio: [
      'Betsy has been building relationships since she was 12, when she started working alongside her mother at a school. She went on to become the school’s manager, running its day-to-day operations. She has also held leadership roles in insurance claims adjusting, leading teams of adjusters.',
      'Betsy joined Recon in 2025 and manages our client relationships. She’s often the voice you’ll hear when you call for support, and she makes sure you’re happy with Recon every day. Betsy is bilingual and fluent in Spanish, so she can help clients in English or Spanish.',
      'Betsy is a member of La Iglesia Apostólica in Beaumont, where she started and leads the translation team. She lives in Beaumont with her husband and their two children, who also go to school in Beaumont.',
    ],
    contact: { label: site.phone, href: site.phoneHref },
  },
];
