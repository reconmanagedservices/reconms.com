import type { DetailPageContent } from './servicePages';

/**
 * Content for the industry pages under /industries/. Copy describes Recon's approach for each
 * sector using services described elsewhere on the site. Avoid adding claims that aren't
 * confirmed: named clients, certifications, special pricing, signed agreements (e.g. HIPAA BAAs),
 * or compliance guarantees. Each page is registered in src/seo.ts and src/App.tsx.
 */
export type IndustryPageKey =
  | 'manufacturing'
  | 'constructionIndustrial'
  | 'transportationLogistics'
  | 'professionalServices'
  | 'financialServices'
  | 'healthcare'
  | 'nonprofits'
  | 'localGovernment'
  | 'publicSafety';

export type IndustryPageContent = DetailPageContent & { key: IndustryPageKey };

const steps = (consultation: string, onboarding: string, ongoing: string) => [
  { title: 'Consultation', text: consultation },
  { title: 'Onboarding', text: onboarding },
  { title: 'Ongoing success', text: ongoing },
];

export const industryPages: Record<IndustryPageKey, IndustryPageContent> = {
  manufacturing: {
    key: 'manufacturing',
    related: ['/industries/construction-industrial-contractors/', '/industries/transportation-logistics/', '/industries/professional-services/'],
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

  constructionIndustrial: {
    key: 'constructionIndustrial',
    related: ['/industries/manufacturing/', '/industries/transportation-logistics/', '/industries/professional-services/'],
    path: '/industries/construction-industrial-contractors/',
    shortName: 'Construction & Industrial',
    serviceType: 'Managed IT services for construction and industrial contractors',
    titleTag: 'Construction & Contractor IT Services in Beaumont, TX | Recon',
    description:
      'Managed IT and cybersecurity for construction and industrial contractors in Southeast Texas: connected job sites, secure field devices, and client requirements.',
    hero: {
      title: 'IT for construction and industrial contractors.',
      text: 'Connected job sites, secure field devices, and responsive support for general contractors, specialty trades, and industrial service companies across Southeast Texas.',
    },
    intro: {
      eyebrow: 'From the office to the job site',
      title: 'Your work doesn’t happen at a desk.',
      paragraphs: [
        'Contractors run on information that has to move between the office, the yard, and the field: estimates, drawings, schedules, timesheets, and photos. Crews need it on laptops, tablets, and phones, often from a trailer or a site with limited connectivity.',
        'Recon helps construction and industrial contractors across Southeast Texas keep that information flowing securely, with dependable support, protected devices, and connectivity that follows your projects from mobilization to closeout.',
        'For contractors serving refineries, petrochemical plants, and other industrial owners, we also help put the security controls in place that clients increasingly expect from their contractors, and document them.',
      ],
    },
    reasons: {
      eyebrow: 'Why contractors choose Recon',
      title: 'Support that keeps up with your projects.',
      items: [
        {
          title: 'Ready for the field',
          text: 'Managed laptops, tablets, and phones that stay secure and up to date wherever your crews are working.',
        },
        {
          title: 'Job sites up and running fast',
          text: 'Connectivity, cameras, and devices planned and set up as part of mobilizing a new site.',
        },
        {
          title: 'Answers for client requirements',
          text: 'Documented security controls that help you respond to owner and general contractor questionnaires.',
        },
      ],
    },
    included: {
      eyebrow: 'What we support',
      title: 'IT for the office, the yard, and the field.',
      items: [
        {
          icon: 'network',
          title: 'Job site connectivity',
          text: 'Internet, Wi-Fi, and secure connections for trailers and temporary offices, so crews can reach plans and project systems.',
        },
        {
          icon: 'laptop',
          title: 'Field device management',
          text: 'Laptops, tablets, and phones configured, updated, and protected, with the ability to lock or wipe a lost device.',
        },
        {
          icon: 'mail',
          title: 'Payment fraud protection',
          text: 'Email security and verification practices that help stop fake invoices and changed payment instructions.',
        },
        {
          icon: 'cloud',
          title: 'Project files and backup',
          text: 'Shared drawings and documents that are easy to reach and backed up, so a failure or attack doesn’t erase project records.',
        },
        {
          icon: 'camera',
          title: 'Job site and yard cameras',
          text: 'Video coverage for job sites, equipment yards, and laydown areas to help deter theft and document progress.',
        },
        {
          icon: 'headset',
          title: 'Support for office and field',
          text: 'Responsive help desk support for estimators, project managers, superintendents, and office staff.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Client security requirements',
      title: 'When an owner sends a security questionnaire, have an answer.',
      paragraphs: [
        'Industrial owners, general contractors, and cyber insurers increasingly ask contractors how they protect their systems and the client information they handle. Recon helps you put common controls in place and keep documentation of them, so responding to a questionnaire or prequalification request isn’t a scramble.',
      ],
      points: ['Multi-factor authentication and managed devices', 'Documented security controls', 'Input on questionnaires and prequalification'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'Getting started between projects, not in the middle of them.',
      steps: steps(
        'We learn how your office, yard, and crews work, which systems projects depend on, and what clients are asking for.',
        'We document your environment, secure devices and accounts, and set a standard approach for mobilizing new job sites.',
        'Responsive support, proactive maintenance, and planning that keeps pace with your project pipeline.',
      ),
    },
    faqs: [
      {
        question: 'Can you set up internet and Wi-Fi on a new job site?',
        answer:
          'Yes. We help plan and set up connectivity for job site trailers and temporary offices, including cellular or wired service, Wi-Fi, and secure access to your company systems.',
      },
      {
        question: 'Can you help us answer client security questionnaires?',
        answer:
          'Yes. We help put common controls in place, such as multi-factor authentication, managed devices, and backups, and give you documentation and input for your responses. Your company remains responsible for the answers it submits.',
      },
      {
        question: 'Do you support estimating and project management software?',
        answer:
          'We support the computers, networks, accounts, and cloud services those applications depend on, and coordinate with the software vendor for application-specific issues.',
      },
      {
        question: 'What happens if a crew member loses a laptop or tablet?',
        answer:
          'Managed devices are encrypted and can be locked or wiped remotely, and project files are stored and backed up centrally, so a lost device doesn’t mean lost or exposed data.',
      },
    ],
  },

  transportationLogistics: {
    key: 'transportationLogistics',
    related: ['/industries/manufacturing/', '/industries/construction-industrial-contractors/', '/industries/public-safety/'],
    path: '/industries/transportation-logistics/',
    shortName: 'Transportation & Logistics',
    serviceType: 'Managed IT services for transportation and logistics companies',
    titleTag: 'Transportation & Logistics IT Services in Beaumont, TX',
    description:
      'Managed IT and cybersecurity for trucking, freight, warehousing, and port-related companies in Southeast Texas: dependable dispatch, connectivity, and security.',
    hero: {
      title: 'IT for transportation and logistics.',
      text: 'Dependable connectivity, security, and support for trucking companies, freight brokers, warehouses, and port-related businesses across Southeast Texas.',
    },
    intro: {
      eyebrow: 'Freight doesn’t wait',
      title: 'When systems stop, freight stops.',
      paragraphs: [
        'Transportation and logistics companies run on time-sensitive systems: dispatch and transportation management software, tracking, scanners, email, and phones. When one of them is down, loads sit, drivers wait, and customers call.',
        'Recon helps trucking companies, freight brokers, warehouses, and port-related businesses across Southeast Texas keep those systems reliable and secure, with proactive monitoring, responsive support, and planning for the disruptions this region knows well.',
        'We work alongside your software and telematics vendors, and plan changes around your dispatch hours and busiest shipping days.',
      ],
    },
    reasons: {
      eyebrow: 'Why logistics companies choose Recon',
      title: 'Keep loads moving.',
      items: [
        { title: 'Dependable operations', text: 'Proactive monitoring and maintenance for dispatch, warehouse, and office systems.' },
        {
          title: 'Protection from payment fraud',
          text: 'Email security and verification practices that help stop fake invoices and changed payment details.',
        },
        {
          title: 'Ready for storm season',
          text: 'Backups, cloud services, and recovery planning so operations can continue during hurricanes and outages.',
        },
      ],
    },
    included: {
      eyebrow: 'What we support',
      title: 'IT for dispatch, warehouse, and yard.',
      items: [
        {
          icon: 'network',
          title: 'Warehouse and yard networks',
          text: 'Reliable Wi-Fi and network coverage for warehouses, docks, and yards, so scanners and devices stay connected.',
        },
        {
          icon: 'server',
          title: 'Dispatch and business systems',
          text: 'Support for the servers, workstations, and connections behind your transportation management and accounting software.',
        },
        {
          icon: 'shield',
          title: 'Cybersecurity and fraud prevention',
          text: 'Endpoint protection, multi-factor authentication, and email security that help prevent account takeover and payment fraud.',
        },
        {
          icon: 'cloud',
          title: 'Backup and disaster recovery',
          text: 'Monitored backups and a recovery plan for critical systems, including planning for hurricanes and extended outages.',
        },
        {
          icon: 'camera',
          title: 'Cameras and access control',
          text: 'Video coverage and controlled entry for yards, gates, docks, and warehouses.',
        },
        {
          icon: 'phone',
          title: 'Phones for dispatch and customers',
          text: 'VoIP phone systems with call routing and mobile apps, so drivers and customers reach the right person.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Payment fraud',
      title: 'Stop fraud before the payment goes out.',
      paragraphs: [
        'Logistics companies handle a steady flow of invoices, rate confirmations, and payment requests, which makes them a frequent target for impersonation and changed-payment scams. Recon helps you combine email protection and multi-factor authentication with simple verification steps, so a convincing email isn’t enough to redirect a payment.',
      ],
      points: ['Email impersonation protection', 'Multi-factor authentication on email and banking', 'Verification steps for payment changes'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'Getting started without slowing the freight.',
      steps: steps(
        'We learn how your dispatch, warehouse, and office operate, and which systems can’t go down.',
        'We document your environment and plan changes around dispatch hours and shipping peaks.',
        'Proactive monitoring, responsive support, and regular planning as your operation grows.',
      ),
    },
    faqs: [
      {
        question: 'Can you work around our dispatch hours?',
        answer:
          'Yes. We plan maintenance and changes around your operation, and agree in advance on what can happen during working hours and what should wait.',
      },
      {
        question: 'Do you support our transportation management software?',
        answer:
          'We support the computers, servers, networks, and accounts your transportation management, telematics, and accounting software depend on, and coordinate with those vendors for application-specific issues.',
      },
      {
        question: 'How do you protect us from payment and invoice fraud?',
        answer:
          'With layers: email security that flags impersonation, multi-factor authentication on email and financial accounts, employee training, and verification steps for any change to payment details.',
      },
      {
        question: 'How do you help us prepare for hurricanes?',
        answer:
          'We help you move critical systems to the cloud or keep them backed up off-site, document a recovery plan, and make sure your team can keep working remotely when the office or yard is closed.',
      },
    ],
  },

  professionalServices: {
    key: 'professionalServices',
    related: ['/industries/financial-services/', '/industries/healthcare/', '/industries/nonprofits/'],
    path: '/industries/professional-services/',
    shortName: 'Professional Services',
    serviceType: 'Managed IT services for professional services firms',
    titleTag: 'IT Support for Professional Services Firms in Beaumont, TX',
    description:
      'Secure, responsive IT for law, accounting, engineering, and other professional firms in Southeast Texas: Microsoft 365, cybersecurity, and help desk support.',
    hero: {
      title: 'IT support for professional services firms.',
      text: 'Secure, dependable technology for law, accounting, engineering, architecture, consulting, and other professional firms across Southeast Texas.',
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

  financialServices: {
    key: 'financialServices',
    related: ['/industries/professional-services/', '/industries/healthcare/', '/industries/local-government/'],
    path: '/industries/financial-services/',
    shortName: 'Financial Services',
    serviceType: 'Managed IT services for financial services organizations',
    titleTag: 'Financial Services IT & Cybersecurity in Beaumont, TX',
    description:
      'Managed IT and cybersecurity for banks, credit unions, insurance agencies, and financial firms in Southeast Texas, with layered, documented safeguards.',
    hero: {
      title: 'IT and cybersecurity for financial services.',
      text: 'Layered security, dependable support, and clear documentation for community banks, credit unions, insurance agencies, and financial firms across Southeast Texas.',
    },
    intro: {
      eyebrow: 'Trust is the business',
      title: 'Protect customer information and stay ready for review.',
      paragraphs: [
        'Financial organizations hold exactly what attackers want: personal information, account details, and access to money. Customers, regulators, auditors, and insurers all expect strong protections, and the documentation to show them.',
        'Recon helps community banks, credit unions, insurance agencies, wealth managers, and lenders across Southeast Texas protect customer information, keep systems available, and document the technical safeguards they have in place.',
        'We work alongside your compliance officer, auditors, and core and software vendors. Compliance remains your organization’s responsibility; we focus on the technical controls and the information you need to demonstrate them.',
      ],
    },
    reasons: {
      eyebrow: 'Why financial firms choose Recon',
      title: 'Security you can document.',
      items: [
        {
          title: 'Layered security',
          text: 'Multi-factor authentication, encryption, email security, and monitoring around customer information.',
        },
        {
          title: 'Ready for audits and reviews',
          text: 'Documentation of technical safeguards to support examinations, audits, and vendor due diligence.',
        },
        {
          title: 'Dependable operations',
          text: 'Proactive maintenance, monitored backups, and responsive help so customers aren’t kept waiting.',
        },
      ],
    },
    included: {
      eyebrow: 'What we support',
      title: 'IT for banks, agencies, and financial firms.',
      items: [
        {
          icon: 'shield',
          title: 'Layered cybersecurity',
          text: 'Endpoint protection, email security, and security monitoring for the systems that hold customer information.',
        },
        {
          icon: 'lock',
          title: 'Access control and multi-factor authentication',
          text: 'Role-based access to customer data, multi-factor authentication, and prompt removal of access when people leave.',
        },
        {
          icon: 'clipboard',
          title: 'Safeguard documentation',
          text: 'Records of the technical controls in place, with input for audits, examinations, and vendor reviews.',
        },
        {
          icon: 'cloud',
          title: 'Backup and recovery',
          text: 'Encrypted, monitored backups and a recovery plan for critical systems and records.',
        },
        {
          icon: 'cap',
          title: 'Security awareness training',
          text: 'Practical training that helps employees recognize phishing, impersonation, and social engineering.',
        },
        {
          icon: 'headset',
          title: 'Responsive help desk',
          text: 'Quick help for branch, agency, and office staff from technicians who know your systems.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Shared responsibility',
      title: 'Technical safeguards that support your information security program.',
      paragraphs: [
        'The Gramm-Leach-Bliley Act requires financial institutions to protect customer information. Depending on your organization, specific expectations come from banking or credit union regulators, the FTC Safeguards Rule, or state insurance regulators, and many call for controls such as multi-factor authentication, encryption, and monitoring.',
        'Recon helps put those technical controls in place and document them. We don’t provide legal advice or compliance certifications, so we work alongside your compliance officer and auditors.',
      ],
      points: ['Multi-factor authentication and encryption', 'Security monitoring and logging', 'Documentation for audits and vendor reviews'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'A careful start for a regulated business.',
      steps: steps(
        'We learn how your organization works, which systems hold customer information, and what your auditors and examiners expect.',
        'We document your environment, address the most important security gaps first, and keep disruption to customers to a minimum.',
        'Proactive monitoring, responsive support, and regular reviews of your safeguards as requirements evolve.',
      ),
    },
    faqs: [
      {
        question: 'Can you make us compliant with GLBA or the FTC Safeguards Rule?',
        answer:
          'No IT provider can make an organization compliant on its own, because compliance includes policies, oversight, and administrative practices. Recon helps with the technical safeguards and documentation, and works alongside your compliance officer and advisers.',
      },
      {
        question: 'Can you help with our vendor due diligence review?',
        answer:
          'Yes. We can provide information about how we deliver our services and protect your systems to support your vendor management process.',
      },
      {
        question: 'Do you support core banking and agency management systems?',
        answer:
          'We support the computers, networks, accounts, and connections those systems depend on, and coordinate with your core, agency management, and other software vendors for application-specific issues.',
      },
      {
        question: 'How do you protect against wire and payment fraud?',
        answer:
          'With layers: email security that flags impersonation, multi-factor authentication, employee training, and verification steps for payment and account changes.',
      },
    ],
  },

  healthcare: {
    key: 'healthcare',
    related: ['/industries/professional-services/', '/industries/public-safety/', '/industries/nonprofits/'],
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
    related: ['/industries/local-government/', '/industries/healthcare/', '/industries/professional-services/'],
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
    related: ['/industries/public-safety/', '/industries/nonprofits/', '/industries/transportation-logistics/'],
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
  publicSafety: {
    key: 'publicSafety',
    related: ['/industries/local-government/', '/industries/healthcare/', '/industries/transportation-logistics/'],
    path: '/industries/public-safety/',
    shortName: 'Public Safety',
    serviceType: 'Managed IT services for public safety agencies',
    titleTag: 'Public Safety IT Services in Beaumont, TX | Recon Managed Services',
    description:
      'Managed IT and cybersecurity for police, fire, EMS, and emergency communications agencies in Southeast Texas: dependable systems and protected data.',
    hero: {
      title: 'IT for public safety agencies.',
      text: 'Dependable systems and protected data for police departments, sheriff’s offices, fire departments, EMS, and emergency communications across Southeast Texas.',
    },
    intro: {
      eyebrow: 'When every minute matters',
      title: 'Technology first responders can count on.',
      paragraphs: [
        'Public safety agencies depend on technology around the clock: records and dispatch systems, mobile computers in vehicles, station networks, cameras, and phones. An outage isn’t an inconvenience, and the information these agencies hold is among the most sensitive there is.',
        'Recon helps police, fire, EMS, and emergency communications agencies across Jefferson, Hardin, and Orange Counties keep systems available and secure, with proactive monitoring, responsive support, and security built around criminal justice and other protected information.',
        'We work alongside your command staff, your IT or records personnel, your city or county, and the vendors behind your dispatch and records systems.',
      ],
    },
    reasons: {
      eyebrow: 'Why agencies choose Recon',
      title: 'Dependable IT for those who serve.',
      items: [
        {
          title: 'Built for 24/7 operations',
          text: 'Proactive monitoring and planned maintenance for agencies that never close.',
        },
        {
          title: 'Protected information',
          text: 'Access controls, multi-factor authentication, and encryption around criminal justice and other sensitive data.',
        },
        {
          title: 'Ready for the field',
          text: 'Managed mobile computers and secure connections for officers and crews in vehicles and on scene.',
        },
      ],
    },
    included: {
      eyebrow: 'What we support',
      title: 'IT for stations, vehicles, and dispatch.',
      items: [
        {
          icon: 'pulse',
          title: 'Proactive monitoring',
          text: 'Around-the-clock monitoring of servers, networks, and critical systems, so issues are caught early.',
        },
        {
          icon: 'lock',
          title: 'Access control and authentication',
          text: 'Multi-factor authentication and role-based access for the systems that hold protected information.',
        },
        {
          icon: 'laptop',
          title: 'Mobile and in-vehicle devices',
          text: 'Mobile computers and tablets configured, secured, and connected for use in the field.',
        },
        {
          icon: 'network',
          title: 'Station and multi-site networks',
          text: 'Reliable, segmented networks for headquarters, substations, fire stations, and other facilities.',
        },
        {
          icon: 'cloud',
          title: 'Backup and disaster recovery',
          text: 'Monitored backups and a recovery plan so critical systems can be restored quickly, including during severe weather.',
        },
        {
          icon: 'camera',
          title: 'Cameras and access control',
          text: 'Video coverage and controlled entry for stations, evidence areas, and facilities.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Criminal justice information',
      title: 'Technical controls that support CJIS requirements.',
      paragraphs: [
        'Agencies that access criminal justice information must follow the FBI CJIS Security Policy, which sets requirements for areas such as multi-factor authentication, encryption, access control, and audit logging. Vendor personnel with access may also need to complete background checks and security training.',
        'Recon helps put the technical controls in place, documents them, and coordinates with your agency on vendor requirements. Your agency remains responsible for its compliance and audits.',
      ],
      points: ['Advanced (multi-factor) authentication', 'Encryption of data in transit and at rest', 'Audit logging and access reviews'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'A careful start for an agency that can’t go offline.',
      steps: steps(
        'We learn how your agency operates, which systems can never go down, and what your security requirements are.',
        'We document your environment, coordinate vendor and personnel requirements, and plan changes around shifts and operations.',
        'Proactive monitoring, responsive support, and regular reviews as your agency’s needs evolve.',
      ),
    },
    faqs: [
      {
        question: 'Can you help us meet the CJIS Security Policy?',
        answer:
          'Recon helps with the technical controls the policy calls for, such as multi-factor authentication, encryption, access control, and logging, and documents them. Your agency remains responsible for its compliance, and we coordinate with you on vendor personnel requirements.',
      },
      {
        question: 'Do you support dispatch and records management systems?',
        answer:
          'We support the computers, servers, networks, and connections those systems depend on, and coordinate with your dispatch and records vendors for application-specific issues.',
      },
      {
        question: 'Can you work alongside our city or county IT department?',
        answer:
          'Yes. Through co-managed IT, Recon can add expertise, tools, and support capacity while your existing IT staff stay in control.',
      },
      {
        question: 'How do you handle maintenance for a 24/7 agency?',
        answer:
          'We plan updates and changes with your agency in advance, schedule them for the least disruptive times, and make sure there’s a way to roll back if something doesn’t go as expected.',
      },
    ],
  },
};

export const industryPageList = Object.values(industryPages);
