import type { DetailPageContent } from './servicePages';

/**
 * Content for the industry pages under /industries/. Copy describes Recon's approach for each
 * sector using services described elsewhere on the site. Avoid adding claims that aren't
 * confirmed: named clients, certifications, special pricing, signed agreements (e.g. HIPAA BAAs),
 * or compliance guarantees. Each page is registered in src/seo.ts and src/App.tsx.
 */
export type IndustryPageKey = 'manufacturing' | 'professionalServices' | 'healthcare' | 'nonprofits' | 'localGovernment';

export type IndustryPageContent = DetailPageContent & { key: IndustryPageKey };

const steps = (consultation: string, onboarding: string, ongoing: string) => [
  { title: 'Consultation', text: consultation },
  { title: 'Onboarding', text: onboarding },
  { title: 'Ongoing success', text: ongoing },
];

export const industryPages: Record<IndustryPageKey, IndustryPageContent> = {
  manufacturing: {
    key: 'manufacturing',
    path: '/industries/manufacturing/',
    shortName: 'Manufacturing',
    serviceType: 'Managed IT services for manufacturers',
    titleTag: 'Manufacturing IT Services in Beaumont, TX | Recon Managed Services',
    description:
      'Managed IT, cybersecurity, and network support for manufacturers in Beaumont and Southeast Texas, planned around your production schedule.',
    hero: {
      title: 'Manufacturing IT that keeps production moving.',
      text: 'Reliable networks, secure systems, and responsive support for manufacturers across Southeast Texas, so a technology problem doesn’t become a production problem.',
    },
    intro: {
      eyebrow: 'From the office to the floor',
      title: 'Downtime costs more on a production schedule.',
      paragraphs: [
        'Manufacturers depend on technology in places most businesses don’t: production and inventory systems, connected equipment, shipping and receiving, and the offices that schedule and bill the work. When one of those systems stops, the impact reaches the whole operation.',
        'Recon helps manufacturers in Beaumont, Port Arthur, Orange, and across Southeast Texas keep those systems reliable, secure, and supported, with proactive monitoring, practical cybersecurity, and planning that respects your production schedule.',
        'We plan maintenance and changes around your operation, and we work alongside equipment vendors and your internal team where systems overlap.',
      ],
    },
    reasons: {
      eyebrow: 'Why manufacturers choose Recon',
      title: 'Support built around production.',
      items: [
        { title: 'Uptime first', text: 'Proactive monitoring and maintenance planned around production, not in the middle of it.' },
        {
          title: 'Security for connected operations',
          text: 'Layered protection for the office network and the systems that connect to the shop floor.',
        },
        {
          title: 'One accountable partner',
          text: 'Support, security, hardware, cameras, and phones from one team that knows your environment.',
        },
      ],
    },
    included: {
      eyebrow: 'What we support',
      title: 'IT for every part of the operation.',
      items: [
        {
          icon: 'network',
          title: 'Network design and monitoring',
          text: 'Reliable, segmented networks for offices, warehouses, and production areas, monitored so issues are caught early.',
        },
        {
          icon: 'shield',
          title: 'Cybersecurity and ransomware protection',
          text: 'Endpoint protection, email security, and backups designed to keep an attack from stopping production.',
        },
        {
          icon: 'server',
          title: 'Production and business systems',
          text: 'Support for the servers, workstations, and connections behind your ERP, inventory, and scheduling software.',
        },
        {
          icon: 'cloud',
          title: 'Backup and disaster recovery',
          text: 'Monitored backups and a recovery plan, so you can restore critical systems quickly after a failure or attack.',
        },
        {
          icon: 'camera',
          title: 'Security cameras and access control',
          text: 'Video coverage and controlled entry for facilities, yards, and loading areas.',
        },
        {
          icon: 'strategy',
          title: 'Hardware lifecycle planning',
          text: 'Planned replacement of computers and network equipment, so aging hardware doesn’t catch you off guard.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Separate where it matters',
      title: 'Keep a problem in the office from reaching the floor.',
      paragraphs: [
        'Many manufacturers run office computers, guest devices, and production equipment on the same network. Separating them limits how far a compromised laptop or misbehaving device can reach, and makes the whole network easier to manage.',
      ],
      points: ['Segmented office, guest, and production networks', 'Controlled remote access for vendors', 'Monitored backups of critical systems'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'Getting started without disrupting production.',
      steps: steps(
        'We walk through your operation, systems, and pain points, including what can’t go down and when.',
        'We document your environment and plan changes around your production schedule.',
        'Proactive monitoring, responsive support, and regular planning as your operation grows.',
      ),
    },
    faqs: [
      {
        question: 'Can you work around our production schedule?',
        answer:
          'Yes. We plan maintenance, updates, and changes around your operation, and agree in advance on what can happen during working hours and what should wait.',
      },
      {
        question: 'Do you support the computers on the shop floor?',
        answer:
          'Yes. We support the workstations, networks, and connections your production and inventory systems rely on, and coordinate with equipment and software vendors when their systems are involved.',
      },
      {
        question: 'How do you protect us from ransomware?',
        answer:
          'With layers: endpoint protection, email security, multi-factor authentication, network segmentation, employee training, and monitored backups with a recovery plan. No single tool stops every attack, so we plan for recovery too.',
      },
      {
        question: 'Do you serve manufacturers outside Beaumont?',
        answer:
          'Yes. We serve manufacturers throughout Jefferson, Hardin, and Orange Counties, including Port Arthur, Orange, Nederland, Vidor, and Silsbee.',
      },
    ],
  },

  professionalServices: {
    key: 'professionalServices',
    path: '/industries/professional-services/',
    shortName: 'Professional Services',
    serviceType: 'Managed IT services for professional services firms',
    titleTag: 'IT Support for Professional Services Firms in Beaumont, TX',
    description:
      'Secure, responsive IT for law, accounting, engineering, and other professional firms in Southeast Texas: Microsoft 365, cybersecurity, and help desk support.',
    hero: {
      title: 'IT support for professional services firms.',
      text: 'Secure, dependable technology for law, accounting, engineering, insurance, consulting, and other professional firms across Southeast Texas.',
    },
    intro: {
      eyebrow: 'Your reputation runs on trust',
      title: 'Protect client data and billable time.',
      paragraphs: [
        'Professional firms are trusted with sensitive client information, and every hour lost to a technology problem is an hour that can’t be billed. Your systems need to be secure, available, and easy for your team to use in the office or on the go.',
        'Recon supports professional services firms across Southeast Texas with responsive help desk support, layered cybersecurity, Microsoft 365 management, and planning that fits the way your practice works.',
        'We focus on the details that matter to firms: protecting email and documents, controlling who can access client files, and keeping remote work secure.',
      ],
    },
    reasons: {
      eyebrow: 'Why firms choose Recon',
      title: 'Technology your clients can trust.',
      items: [
        {
          title: 'Client confidentiality',
          text: 'Access controls, encryption, and email protection designed around sensitive client information.',
        },
        { title: 'Fewer interruptions', text: 'Proactive maintenance and quick help, so your team stays focused on clients.' },
        { title: 'Secure from anywhere', text: 'Protected devices and remote access for work in the office, at home, or with clients.' },
      ],
    },
    included: {
      eyebrow: 'What we support',
      title: 'Technology that supports the practice.',
      items: [
        {
          icon: 'mail',
          title: 'Email and Microsoft 365 security',
          text: 'Protection against phishing, impersonation, and account takeover in the email your clients rely on.',
        },
        {
          icon: 'lock',
          title: 'Access control for client files',
          text: 'The right people reach the right documents, with multi-factor authentication and permissions that are reviewed regularly.',
        },
        {
          icon: 'headset',
          title: 'Responsive help desk',
          text: 'Quick help for professionals and staff from technicians who know your systems.',
        },
        {
          icon: 'laptop',
          title: 'Secure remote work',
          text: 'Managed laptops and secure connections for working from home, in the field, or at a client’s office.',
        },
        {
          icon: 'cloud',
          title: 'Backup and recovery',
          text: 'Monitored backups of documents, email, and practice data, with a plan to restore them quickly.',
        },
        {
          icon: 'phone',
          title: 'Phones and communication',
          text: 'VoIP phone systems with call routing and mobile apps, so clients reach the right person.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Built for client trust',
      title: 'When clients ask how you protect their data, have an answer.',
      paragraphs: [
        'Clients, insurers, and partners increasingly ask firms about their security practices. Recon helps you put sensible protections in place and document them, so you can respond to security questionnaires and cyber insurance applications with confidence.',
      ],
      points: ['Clear documentation of your protections', 'Input on security questionnaires', 'Controls insurers commonly ask about'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'A smooth start for a busy practice.',
      steps: steps(
        'We learn how your firm works, which systems client work depends on, and where the risks are.',
        'We document your environment and make changes with as little disruption to client work as possible.',
        'Responsive support, proactive maintenance, and regular planning as your practice grows.',
      ),
    },
    faqs: [
      {
        question: 'Can you help us meet our clients’ security requirements?',
        answer:
          'We can help put common security controls in place, such as multi-factor authentication, encryption, and backups, and document them so you can respond to client and insurer questions. Recon doesn’t provide legal advice or certifications, so we work alongside your advisers where needed.',
      },
      {
        question: 'Do you support practice-management and accounting software?',
        answer:
          'We support the computers, servers, networks, and Microsoft 365 environment those applications depend on, and coordinate with the software vendors for application-specific issues.',
      },
      {
        question: 'Can our team work securely from home?',
        answer:
          'Yes. We manage and protect laptops, secure remote access, and set up Microsoft 365 so files and email stay protected outside the office.',
      },
      {
        question: 'We’re a small office. Is managed IT worth it?',
        answer:
          'Small firms often benefit most, because they rarely have in-house IT. Predictable, flat-rate support gives you proactive care and help when you need it, without hiring.',
      },
    ],
  },

  healthcare: {
    key: 'healthcare',
    path: '/industries/healthcare/',
    shortName: 'Healthcare',
    serviceType: 'Managed IT services for healthcare organizations',
    titleTag: 'Healthcare IT Services in Beaumont, TX | Recon Managed Services',
    description:
      'Managed IT and cybersecurity for clinics and medical practices in Southeast Texas: protected patient information, reliable systems, and backup and recovery.',
    hero: {
      title: 'Healthcare IT that protects patient information.',
      text: 'Secure, reliable technology for clinics, practices, and healthcare organizations across Southeast Texas, so your staff can focus on patients.',
    },
    intro: {
      eyebrow: 'Patient care depends on it',
      title: 'Reliable systems, protected information.',
      paragraphs: [
        'Healthcare organizations rely on technology at every step of a visit, from scheduling and check-in to records, imaging, and billing. They also hold some of the most sensitive information there is, which makes them a frequent target for attackers.',
        'Recon helps clinics and practices across Southeast Texas keep systems available and patient information protected, with proactive support, layered cybersecurity, and backup and recovery planning.',
        'We help you put technical safeguards in place that support your HIPAA security responsibilities, and document what’s in place. Compliance remains your organization’s responsibility, so we work alongside your compliance lead or advisers.',
      ],
    },
    reasons: {
      eyebrow: 'Why practices choose Recon',
      title: 'Technology that supports patient care.',
      items: [
        {
          title: 'Protect patient information',
          text: 'Access controls, encryption, email security, and monitoring around the systems that hold patient data.',
        },
        { title: 'Keep the practice running', text: 'Proactive maintenance and responsive help, so technology doesn’t slow down care.' },
        { title: 'Ready to recover', text: 'Monitored backups and a recovery plan, so a failure or ransomware attack doesn’t close your doors.' },
      ],
    },
    included: {
      eyebrow: 'What we support',
      title: 'IT support for clinics and practices.',
      items: [
        {
          icon: 'shield',
          title: 'Layered cybersecurity',
          text: 'Endpoint protection, multi-factor authentication, email security, and monitoring for the systems that hold patient data.',
        },
        {
          icon: 'lock',
          title: 'Access and identity management',
          text: 'Each staff member gets the access their role needs, and accounts are removed promptly when people leave.',
        },
        {
          icon: 'cloud',
          title: 'Backup and disaster recovery',
          text: 'Monitored backups and a recovery plan for restoring systems after an outage or attack.',
        },
        {
          icon: 'headset',
          title: 'Help desk for busy staff',
          text: 'Quick, friendly help for front desk, clinical, and billing staff from technicians who know your setup.',
        },
        {
          icon: 'laptop',
          title: 'Workstation and device management',
          text: 'Computers and devices configured, updated, and secured consistently across exam rooms and offices.',
        },
        {
          icon: 'clipboard',
          title: 'Risk reviews and documentation',
          text: 'Regular reviews of your technical safeguards, with prioritized recommendations you can share with your compliance lead.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Shared responsibility',
      title: 'Technical safeguards that support your compliance program.',
      paragraphs: [
        'The HIPAA Security Rule calls for administrative, physical, and technical safeguards for electronic patient information. Recon focuses on the technical side, such as access controls, encryption, security monitoring, and documentation of what’s in place, so your compliance lead has what they need.',
        'Recon doesn’t provide legal advice or compliance certifications; we work alongside the people responsible for your compliance program.',
      ],
      points: ['Access controls and multi-factor authentication', 'Encryption for devices and data', 'Documentation of technical safeguards'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'A careful start for a busy practice.',
      steps: steps(
        'We learn how your practice works, which systems patient care depends on, and where the risks are.',
        'We document your environment, address the most important security gaps first, and keep disruption to patient schedules to a minimum.',
        'Proactive monitoring, responsive support, and regular reviews of your safeguards as the practice grows.',
      ),
    },
    faqs: [
      {
        question: 'Can you make us HIPAA compliant?',
        answer:
          'No IT provider can make an organization compliant on its own, because compliance includes policies, training, and administrative practices. Recon helps with the technical safeguards and documentation, and works alongside your compliance lead or advisers.',
      },
      {
        question: 'Do you support electronic health record systems?',
        answer:
          'We support the computers, networks, servers, and accounts your EHR and practice-management software depend on, and coordinate with the software vendor for application issues.',
      },
      {
        question: 'What happens if we’re hit by ransomware?',
        answer:
          'Layered protection lowers the odds, and monitored backups with a recovery plan are what get you running again. We help you plan that recovery before you need it.',
      },
      {
        question: 'Do you work with small practices?',
        answer:
          'Yes. Smaller practices often benefit most from managed IT, because they rarely have in-house IT staff.',
      },
    ],
  },

  nonprofits: {
    key: 'nonprofits',
    path: '/industries/nonprofits/',
    shortName: 'Nonprofits',
    serviceType: 'Managed IT services for nonprofit organizations',
    titleTag: 'Nonprofit IT Services in Beaumont, TX | Recon Managed Services',
    description:
      'Budget-conscious managed IT and cybersecurity for nonprofits in Southeast Texas: dependable support, donor data protection, and practical technology planning.',
    hero: {
      title: 'Nonprofit IT that stretches every dollar.',
      text: 'Secure, dependable technology and practical planning for nonprofits across Southeast Texas, so more of your time and budget goes to your mission.',
    },
    intro: {
      eyebrow: 'Mission first',
      title: 'Technology that serves the mission.',
      paragraphs: [
        'Nonprofits do important work with limited staff and tight budgets, often with volunteers coming and going. Technology needs to be simple, secure, and affordable, and it has to protect donor and client information.',
        'Recon helps nonprofits across Southeast Texas get dependable support, sensible security, and a technology plan that fits their budget and grant cycles.',
        'We also help you take advantage of the nonprofit pricing and donation programs that many software and cloud providers offer to eligible organizations.',
      ],
    },
    reasons: {
      eyebrow: 'Why nonprofits choose Recon',
      title: 'More mission, less IT hassle.',
      items: [
        {
          title: 'Budget-conscious planning',
          text: 'Prioritized recommendations and predictable costs that fit your budget and grant timelines.',
        },
        { title: 'Protect donor and client data', text: 'Security for the information your supporters and clients trust you with.' },
        {
          title: 'Simple for staff and volunteers',
          text: 'Onboarding, offboarding, and access that keep up with a changing team.',
        },
      ],
    },
    included: {
      eyebrow: 'What we support',
      title: 'IT support built for mission-driven teams.',
      items: [
        {
          icon: 'headset',
          title: 'Help desk support',
          text: 'Friendly help for staff and volunteers, from email problems to new-device setup.',
        },
        {
          icon: 'users',
          title: 'Staff and volunteer accounts',
          text: 'Fast setup and removal of accounts and access as people join and leave.',
        },
        {
          icon: 'shield',
          title: 'Cybersecurity',
          text: 'Email security, multi-factor authentication, and endpoint protection for donor and client information.',
        },
        {
          icon: 'strategy',
          title: 'Technology planning and budgeting',
          text: 'A prioritized roadmap and cost estimates you can use in budgeting and grant requests.',
        },
        {
          icon: 'cloud',
          title: 'Microsoft 365 and cloud',
          text: 'Microsoft 365 set up and secured, including nonprofit licensing for eligible organizations.',
        },
        {
          icon: 'layers',
          title: 'Backup and recovery',
          text: 'Monitored backups of files, email, and databases, so important records aren’t lost.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Make the budget go further',
      title: 'Spend on what moves the mission.',
      paragraphs: [
        'A clear plan helps you avoid surprise expenses, replace equipment on a schedule, and make the case for technology in grant applications. Recon helps you prioritize the improvements that matter most and phase in the rest.',
      ],
      points: ['Prioritized technology roadmap', 'Predictable support costs', 'Guidance on nonprofit licensing'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'A practical start, at your pace.',
      steps: steps(
        'We learn about your mission, team, systems, and budget, and where technology is getting in the way.',
        'We document your environment, fix the most pressing issues first, and set up simple processes for staff and volunteers.',
        'Dependable support and regular planning that fit your budget and grant cycles.',
      ),
    },
    faqs: [
      {
        question: 'Can you help us use nonprofit software discounts?',
        answer:
          'Yes. Many software and cloud providers offer discounted or donated licenses to eligible nonprofits. We help you understand what’s available and set it up correctly.',
      },
      {
        question: 'We rely on volunteers. How do you handle access?',
        answer:
          'We set up a simple process for adding and removing accounts, give volunteers only the access they need, and make sure access is removed when someone leaves.',
      },
      {
        question: 'Can you help with technology budgets for grants?',
        answer:
          'Yes. We can provide a prioritized plan and cost estimates you can use when budgeting or applying for technology-related grants.',
      },
      {
        question: 'How do you protect donor information?',
        answer:
          'With layered security: multi-factor authentication, email protection, managed devices, access controls, and monitored backups.',
      },
    ],
  },

  localGovernment: {
    key: 'localGovernment',
    path: '/industries/local-government/',
    shortName: 'Local Government',
    serviceType: 'Managed IT services for local government',
    titleTag: 'Local Government IT Services in Beaumont, TX | Recon Managed Services',
    description:
      'Managed IT and cybersecurity for cities, counties, and public entities in Southeast Texas: resilient systems, ransomware defense, and budget-friendly planning.',
    hero: {
      title: 'IT services for local government.',
      text: 'Secure, reliable technology for cities, counties, and public entities across Southeast Texas, so public services stay available and public data stays protected.',
    },
    intro: {
      eyebrow: 'Public service runs on technology',
      title: 'Keeping public services online and secure.',
      paragraphs: [
        'Cities, counties, and other public entities depend on technology to serve residents: offices, records, payments, communications, and staff in the field. They are also frequent targets for ransomware, and an outage is felt by the whole community.',
        'Recon helps local governments across Jefferson, Hardin, and Orange Counties and the surrounding area keep systems available and secure, with proactive support, layered cybersecurity, and planning that fits public budgets.',
        'We work alongside your staff, department heads, and existing vendors, and we understand that changes often need approval and careful scheduling.',
      ],
    },
    reasons: {
      eyebrow: 'Why public entities choose Recon',
      title: 'Dependable IT for the community you serve.',
      items: [
        { title: 'Resilient public services', text: 'Proactive monitoring, backups, and recovery planning so services stay available.' },
        { title: 'Protect public data', text: 'Layered security for resident, employee, and financial information.' },
        {
          title: 'Plans that fit public budgets',
          text: 'Prioritized roadmaps and cost estimates that work with budget cycles and approvals.',
        },
      ],
    },
    included: {
      eyebrow: 'What we support',
      title: 'IT for cities, counties, and public entities.',
      items: [
        {
          icon: 'shield',
          title: 'Cybersecurity and ransomware defense',
          text: 'Endpoint protection, multi-factor authentication, email security, and monitoring across departments.',
        },
        {
          icon: 'cap',
          title: 'Security awareness training',
          text: 'Practical training that helps employees recognize phishing and social engineering.',
        },
        {
          icon: 'cloud',
          title: 'Backup and disaster recovery',
          text: 'Monitored backups and a recovery plan for records and critical systems.',
        },
        {
          icon: 'network',
          title: 'Network and multi-site support',
          text: 'Reliable connections and support for main offices, annexes, and other locations.',
        },
        {
          icon: 'phone',
          title: 'Phones and communication',
          text: 'VoIP systems with call routing that help residents reach the right department.',
        },
        {
          icon: 'strategy',
          title: 'Planning and budgeting',
          text: 'Technology roadmaps and cost estimates that support budget planning and approvals.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Texas requirements',
      title: 'Stay ahead of cybersecurity expectations.',
      paragraphs: [
        'Texas law requires many local government employees and elected officials to complete state-certified cybersecurity training each year. Recon helps you plan security awareness alongside the technical protections that reduce risk, and keep documentation of what’s in place.',
      ],
      points: ['Security awareness planning', 'Documented security controls', 'Incident response planning'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'A careful start that respects your process.',
      steps: steps(
        'We learn how your departments work, what residents depend on, and where the biggest risks are.',
        'We document your environment and schedule changes to fit approvals and public hours.',
        'Proactive monitoring, responsive support, and regular planning aligned with your budget cycle.',
      ),
    },
    faqs: [
      {
        question: 'Do you work with small cities and counties?',
        answer:
          'Yes. Smaller local governments often have limited or no dedicated IT staff, and managed or co-managed IT gives them dependable support and security without adding headcount.',
      },
      {
        question: 'Can you work alongside our existing IT staff?',
        answer: 'Yes. Through co-managed IT, Recon adds expertise, tools, and help desk capacity while your staff keep control.',
      },
      {
        question: 'How do you reduce ransomware risk?',
        answer:
          'With layers: endpoint protection, multi-factor authentication, email security, employee training, and monitored backups with a recovery plan, so you can restore services if something gets through.',
      },
      {
        question: 'Can you help with required cybersecurity training?',
        answer:
          'We can help you plan and track security awareness for your staff as part of your broader security program. Completing state-required training through a certified program remains your organization’s responsibility.',
      },
    ],
  },
};

export const industryPageList = Object.values(industryPages);
