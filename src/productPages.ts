import type { DetailPageContent } from './servicePages';

/**
 * Content for the dedicated product pages under /products/. Copy is grounded in the product
 * descriptions on the site and Recon's Plan → Source → Install → Support process; avoid adding
 * brands, specs, prices or timelines that aren't confirmed. Each page is registered in
 * src/seo.ts and src/App.tsx.
 */
export type ProductPageKey = 'hardware' | 'cameras' | 'accessControl' | 'voip';

export type ProductPageContent = DetailPageContent & { key: ProductPageKey };

const process = (steps: [plan: string, source: string, install: string, support: string]) => ({
  eyebrow: 'How it works',
  title: 'From selection to support.',
  steps: [
    { title: 'Plan', text: steps[0] },
    { title: 'Source', text: steps[1] },
    { title: 'Install', text: steps[2] },
    { title: 'Support', text: steps[3] },
  ],
});

export const productPages: Record<ProductPageKey, ProductPageContent> = {
  hardware: {
    key: 'hardware',
    path: '/products/computer-hardware/',
    shortName: 'Computer Hardware',
    serviceType: 'Business computer and server hardware',
    titleTag: 'Business Computers & Servers in Beaumont, TX | Recon Managed Services',
    description:
      'Business desktops, laptops, servers, and workstations selected, configured, and supported by Recon in Beaumont, Texas, with deployment and lifecycle planning.',
    hero: {
      title: 'Business computers and servers, ready to work.',
      text: 'Desktops, laptops, servers, and infrastructure selected, configured, and supported for the way your team works.',
    },
    intro: {
      eyebrow: 'The right equipment',
      title: 'Hardware chosen for your work, not from a catalog.',
      paragraphs: [
        'Recon recommends computers and servers based on your environment, goals, and long-term support needs. We look at what your people actually do, the software they rely on, and how the equipment will be managed and secured.',
        'Because the same team that recommends your hardware also configures and supports it, new equipment reaches your people ready to use: set up, secured, and connected to the systems your team relies on.',
        'We coordinate procurement so specifications, warranties, and timelines stay clear, and we help you plan replacements before aging equipment starts costing you time.',
      ],
    },
    included: {
      eyebrow: 'What we provide',
      title: 'Computer hardware for every role.',
      items: [
        {
          icon: 'laptop',
          title: 'Desktops and laptops',
          text: 'Business-grade computers sized for each role, from front-desk workstations to laptops for people on the move.',
        },
        {
          icon: 'server',
          title: 'Servers and storage',
          text: 'Servers and storage for the applications, files, and backups that need to stay close to your team.',
        },
        {
          icon: 'layers',
          title: 'Workstations and peripherals',
          text: 'Higher-performance workstations plus monitors, docks, printers, and the accessories that make a desk productive.',
        },
        {
          icon: 'strategy',
          title: 'Deployment and lifecycle planning',
          text: 'A replacement schedule and budget, so equipment is refreshed on your timeline instead of when it fails.',
        },
        {
          icon: 'shield',
          title: 'Secured from day one',
          text: 'Devices configured with protection, updates, and management in place before they reach your team.',
        },
        {
          icon: 'headset',
          title: 'Ongoing support',
          text: 'One partner to call when equipment, software, or connectivity needs attention.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Planning a refresh?',
      title: 'Replace equipment on your schedule, not when it fails.',
      paragraphs: [
        'Aging computers slow people down, and failures tend to come at the worst possible time. A lifecycle plan spreads replacements over time, keeps your budget predictable, and gets ahead of operating systems that are reaching the end of support.',
      ],
      points: ['A clear view of your current equipment', 'A prioritized replacement schedule', 'A budget you can plan around'],
    },
    process: process([
      'We match equipment to your actual requirements, environment, and budget.',
      'We coordinate procurement so specifications, warranties, and timelines stay clear.',
      'Our team configures and deploys each device with your network and operations in mind.',
      'You have one partner to call when equipment, software, or connectivity needs attention.',
    ]),
    faqs: [
      {
        question: 'Can you work with the computers we already have?',
        answer:
          'Yes. We start by reviewing what you have, then recommend replacements only where they make sense for performance, security, or support.',
      },
      {
        question: 'Do new computers arrive ready to use?',
        answer:
          'That’s the goal. Our team configures and deploys new equipment with your network and operations in mind, so it’s ready to work when it reaches your people.',
      },
      {
        question: 'How often should business computers be replaced?',
        answer:
          'It depends on the device and how it’s used. We track the age, condition, and support status of your equipment and recommend replacements as part of a lifecycle plan.',
      },
      {
        question: 'Do you provide servers as well as computers?',
        answer:
          'Yes. We help select, install, and support servers and storage, and we’ll talk through whether a cloud service is a better fit for a given workload.',
      },
    ],
  },

  cameras: {
    key: 'cameras',
    path: '/products/security-cameras/',
    shortName: 'Security Cameras',
    serviceType: 'Security camera system installation',
    titleTag: 'Security Camera Installation in Beaumont, TX | Recon Managed Services',
    description:
      'Business security camera systems for Southeast Texas: indoor and outdoor cameras, remote viewing, video retention planning, and professional installation.',
    hero: {
      title: 'Security camera systems for your business.',
      text: 'Clear, reliable video surveillance that helps you monitor facilities, investigate events, and protect the people and property that matter.',
    },
    intro: {
      eyebrow: 'Designed for your site',
      title: 'Coverage planned around what matters.',
      paragraphs: [
        'A useful camera system starts with a plan: which entrances, parking areas, and workspaces need coverage, how clearly you need to see them, and how long footage should be kept. Recon designs around those answers instead of guessing.',
        'We install and configure your cameras and recording, connect them securely to your network, and set up remote viewing so authorized people can check in from a phone or computer.',
        'Cameras are network devices, so we treat them like the rest of your IT, keeping them updated and protected so they don’t become a weak point.',
      ],
    },
    included: {
      eyebrow: 'What’s included',
      title: 'A complete camera system, installed and supported.',
      items: [
        {
          icon: 'camera',
          title: 'Indoor and outdoor cameras',
          text: 'Cameras chosen for each location, from entrances and lobbies to parking lots and loading areas.',
        },
        {
          icon: 'laptop',
          title: 'Remote viewing',
          text: 'Secure access to live and recorded video from your phone or computer, wherever you are.',
        },
        {
          icon: 'server',
          title: 'Video retention planning',
          text: 'Recording sized to keep footage as long as you need it, with a retention plan that fits your requirements.',
        },
        {
          icon: 'strategy',
          title: 'Site planning',
          text: 'Camera placement planned around coverage, lighting, and the views you need, before anything is mounted.',
        },
        {
          icon: 'shield',
          title: 'Network security',
          text: 'Cameras and recorders configured securely and kept updated, so they don’t open a door into your network.',
        },
        {
          icon: 'headset',
          title: 'Professional installation',
          text: 'Installation by our team, and one partner to call when a camera, recorder, or connection needs attention.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Pair it with access control',
      title: 'See what happened, and control who gets in.',
      paragraphs: [
        'Cameras show you what happened. Access control decides who can get in to begin with. Planned together, they give you a clearer, more complete picture of activity at your doors.',
      ],
      points: ['Coverage of key entrances and exits', 'Footage and entry records to review together', 'One partner for both systems'],
    },
    process: process([
      'We review your site and goals to plan camera placement, coverage, and video retention.',
      'We recommend and order equipment that fits your site and budget, with clear specifications and warranties.',
      'Our team mounts, cables, and configures your cameras and recording, then sets up remote viewing.',
      'We keep the system updated and are one call away when something needs attention.',
    ]),
    faqs: [
      {
        question: 'Can I view my cameras from my phone?',
        answer:
          'Yes. We set up secure remote viewing so authorized people can see live and recorded video from a phone or computer.',
      },
      {
        question: 'How long is video kept?',
        answer:
          'That depends on how much footage you need to keep and for how long. We plan retention with you up front and size recording to match.',
      },
      {
        question: 'Do you install outdoor cameras?',
        answer: 'Yes. We install indoor and outdoor cameras and plan placement around coverage and lighting.',
      },
      {
        question: 'Can you work with an existing camera system?',
        answer:
          'We can review what you have and recommend whether to keep, expand, or replace it based on coverage, image quality, and security.',
      },
    ],
  },

  accessControl: {
    key: 'accessControl',
    path: '/products/access-control/',
    shortName: 'Access Control',
    serviceType: 'Access control system installation',
    titleTag: 'Access Control Systems in Beaumont, TX | Recon Managed Services',
    description:
      'Business access control systems for Southeast Texas: card and mobile credentials, door readers, centralized access management, and entry activity reporting.',
    hero: {
      title: 'Access control that keeps the right people in.',
      text: 'Modern entry systems that make it easier to manage who can access your property, sensitive rooms, and critical areas.',
    },
    intro: {
      eyebrow: 'Beyond keys',
      title: 'Stop worrying about who has a key.',
      paragraphs: [
        'Physical keys get copied, lost, and never returned. With an access control system, each person has their own credential, and you decide which doors they can open.',
        'When someone leaves or loses a card, you remove their access instead of rekeying locks. Every entry is recorded, so you know who came through which door and when.',
        'Recon designs, installs, and supports access control alongside the rest of your technology, so it’s secured, maintained, and easy for your team to manage.',
      ],
    },
    included: {
      eyebrow: 'What’s included',
      title: 'Everything you need to secure your doors.',
      items: [
        {
          icon: 'lock',
          title: 'Card and mobile credentials',
          text: 'Key cards or phone-based credentials, issued to each person and easy to change or revoke.',
        },
        {
          icon: 'door',
          title: 'Door controllers and readers',
          text: 'Readers and controllers for exterior entrances, interior doors, and sensitive rooms.',
        },
        {
          icon: 'laptop',
          title: 'Centralized access management',
          text: 'Add people, change permissions, and manage every door from one place.',
        },
        {
          icon: 'clipboard',
          title: 'Entry activity reporting',
          text: 'A record of who entered where and when, for investigations, audits, and peace of mind.',
        },
        {
          icon: 'users',
          title: 'Access by person and area',
          text: 'Different access for employees, managers, vendors, and visitors, so people only enter where they should.',
        },
        {
          icon: 'headset',
          title: 'Installation and support',
          text: 'Professional installation, and one partner to call when a door, reader, or credential needs attention.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Pair it with cameras',
      title: 'A clearer picture of every entrance.',
      paragraphs: [
        'Access control records who came through a door. Security cameras show what happened there. Planned together, they give you stronger protection and better answers when you need to look back.',
      ],
      points: ['Entry records and video for key doors', 'One plan for physical security', 'One partner for both systems'],
    },
    process: process([
      'We identify the doors and areas to secure and who needs access to each.',
      'We recommend readers, controllers, and credentials that fit your building and budget.',
      'Our team installs and configures the system, then sets up your people and permissions.',
      'We keep the system maintained and help with changes, additions, and troubleshooting.',
    ]),
    faqs: [
      {
        question: 'Can employees use their phones instead of cards?',
        answer: 'Yes. Access control systems can use card or mobile credentials, so you can choose what works best for your team.',
      },
      {
        question: 'What happens when an employee leaves?',
        answer:
          'Their access is removed in the management system and their credential stops working. There are no locks to rekey and no keys to chase down.',
      },
      {
        question: 'Can we restrict access to certain rooms?',
        answer:
          'Yes. Access is set per person and per door, so sensitive rooms and critical areas can be limited to the people who need them.',
      },
      {
        question: 'Can we see who entered a room?',
        answer: 'Yes. Entry activity reporting shows which credential opened which door and when.',
      },
    ],
  },

  voip: {
    key: 'voip',
    path: '/products/voip-phone-systems/',
    shortName: 'VoIP Phone Systems',
    serviceType: 'VoIP business phone systems',
    titleTag: 'VoIP Business Phone Systems in Beaumont, TX | Recon Managed Services',
    description:
      'VoIP business phone systems for Southeast Texas: desk and conference phones, mobile and desktop apps, auto attendants, call routing, and number porting.',
    hero: {
      title: 'Business phone systems that go where you go.',
      text: 'Flexible VoIP phone systems that keep your team connected in the office, on the road, and across multiple locations.',
    },
    intro: {
      eyebrow: 'Modern business phones',
      title: 'One phone system for every location.',
      paragraphs: [
        'VoIP phone systems run over your internet connection, so your business number can ring on a desk phone, a computer, or a mobile app. Your team stays reachable at the front desk, at home, or out in the field.',
        'Recon sets up your system around how calls should flow: who answers first, what callers hear after hours, and how calls move between people and locations.',
        'We handle the details, from moving your existing numbers to configuring phones and apps, and we support the system afterward, so you have one partner to call.',
      ],
    },
    included: {
      eyebrow: 'What’s included',
      title: 'Everything your phones need to do.',
      items: [
        {
          icon: 'phone',
          title: 'Desk and conference phones',
          text: 'Business desk phones and conference room phones, configured and ready to use.',
        },
        {
          icon: 'laptop',
          title: 'Mobile and desktop apps',
          text: 'Make and take business calls from a phone or computer using your company number.',
        },
        {
          icon: 'network',
          title: 'Auto attendants and call routing',
          text: 'Greetings, menus, ring groups, and after-hours rules, so every call reaches the right person.',
        },
        {
          icon: 'clipboard',
          title: 'Number porting and setup',
          text: 'We move your existing phone numbers to the new system and handle the setup.',
        },
        {
          icon: 'users',
          title: 'Multiple locations',
          text: 'One phone system across offices, remote workers, and people in the field.',
        },
        {
          icon: 'headset',
          title: 'Ongoing support',
          text: 'Changes, additions, and troubleshooting handled by one partner.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Before you switch',
      title: 'Clear calls start with a solid network.',
      paragraphs: [
        'Call quality depends on a reliable internet connection and a network set up to handle voice traffic. Because Recon manages networks too, we look at the whole picture, so your calls sound clear from the start.',
      ],
      points: ['Network readiness review', 'Keep your existing numbers', 'One partner for phones and network'],
    },
    process: process([
      'We map how calls should flow and review your network and internet connection.',
      'We recommend phones, apps, and features that fit your team and budget.',
      'Our team ports your numbers, configures phones and call routing, and gets everyone set up.',
      'We handle changes, additions, and troubleshooting as your team grows.',
    ]),
    faqs: [
      {
        question: 'Can we keep our current phone numbers?',
        answer: 'In most cases, yes. Number porting moves your existing numbers to the new system, and we handle the process for you.',
      },
      {
        question: 'Can employees use their cell phones?',
        answer: 'Yes. Mobile apps let your team make and receive calls on their own phones using the business number.',
      },
      {
        question: 'What do we need to switch to VoIP?',
        answer:
          'A reliable internet connection and a network that can handle voice traffic. We review your setup first and recommend any changes before you switch.',
      },
      {
        question: 'Do you support multiple locations?',
        answer: 'Yes. One VoIP system can connect several offices, remote workers, and people in the field.',
      },
    ],
  },
};

export const productPageList = Object.values(productPages);
