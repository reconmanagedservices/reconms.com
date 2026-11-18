import type { IconName } from './components/Icon';

/**
 * Content for the dedicated service pages. Copy is grounded in Recon's existing site content;
 * avoid adding claims (response times, certifications, named products) that aren't confirmed.
 *
 * Paths reuse the old WordPress URLs where a page existed (/managed/, /comanaged/, /ai/) so
 * their search rankings carry over. Each page is registered in src/seo.ts and src/App.tsx.
 */
export type ServicePageKey = 'managed' | 'comanaged' | 'cybersecurity' | 'ai';

/** Shared content shape for dedicated service and product pages (rendered by src/pages/DetailPage.tsx). */
export type DetailPageContent = {
  /** Key into `pageMeta` in src/seo.ts. */
  key: string;
  path: string;
  /** Matches `shortName` in src/content.ts. Used in breadcrumbs and link text. */
  shortName: string;
  /** schema.org Service.serviceType (also used as the Service name). */
  serviceType: string;
  titleTag: string;
  description: string;
  hero: { title: string; text: string };
  intro: { eyebrow: string; title: string; paragraphs: string[] };
  reasons?: { eyebrow: string; title: string; items: { title: string; text: string }[] };
  included: { eyebrow: string; title: string; text?: string; items: { icon: IconName; title: string; text: string }[] };
  highlight: { eyebrow: string; title: string; paragraphs: string[]; points: string[] };
  /** Three or four steps. */
  process: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  faqs: { question: string; answer: string }[];
};

export type ServicePageContent = DetailPageContent & { key: ServicePageKey };

export const servicePages: Record<ServicePageKey, ServicePageContent> = {
  managed: {
    key: 'managed',
    path: '/managed/',
    shortName: 'Managed IT',
    serviceType: 'Managed IT services',
    titleTag: 'Managed IT Services in Beaumont, TX | Recon Managed Services',
    description:
      'Proactive managed IT services for Southeast Texas: help desk support, monitoring, Microsoft 365, backup, and cybersecurity from a local Beaumont team.',
    hero: {
      title: 'Managed IT services for Southeast Texas.',
      text: 'Proactive support, stronger security, and practical planning from one accountable team in Beaumont, so technology keeps your organization moving instead of slowing it down.',
    },
    intro: {
      eyebrow: 'An extension of your team',
      title: 'Your IT partner should feel like part of your team.',
      paragraphs: [
        'Recon provides managed IT services for Southeast Texas organizations that need responsive support, stronger cybersecurity, Microsoft 365 expertise, backup and disaster recovery, and strategic IT guidance, all from one accountable team.',
        'Instead of waiting for something to break, we monitor, maintain, and improve your environment continuously. Your people get quick, friendly help when they need it, and you get a clear picture of where your technology stands and where it should go next.',
        'Support is available 24/7/365 with predictable, flat-rate pricing, so a bad week doesn’t turn into a surprise invoice.',
      ],
    },
    reasons: {
      eyebrow: 'Why Recon',
      title: 'Managed IT the way it should work.',
      items: [
        {
          title: 'Proactive, not just reactive',
          text: 'We fix root causes and keep systems maintained, so the same problems don’t keep coming back.',
        },
        {
          title: 'Flexible around your business',
          text: 'Fully managed or co-managed, with a plan shaped around your team, locations, and priorities.',
        },
        {
          title: 'A plan beyond the ticket queue',
          text: 'Regular conversations about risk, upgrades, and budget, so technology decisions are made ahead of time instead of in a hurry.',
        },
      ],
    },
    included: {
      eyebrow: 'What’s included',
      title: 'Everything your technology needs, managed.',
      text: 'Every plan is shaped around your organization. Most include:',
      items: [
        {
          icon: 'pulse',
          title: 'Proactive monitoring and maintenance',
          text: 'We monitor your devices, servers, and network and keep them patched and maintained, so small problems are caught before they become downtime.',
        },
        {
          icon: 'headset',
          title: 'Help desk support',
          text: 'Responsive help for your people, from login issues and slow computers to new-hire setups, from technicians who know your environment.',
        },
        {
          icon: 'laptop',
          title: 'Device and Microsoft 365 management',
          text: 'Computers, servers, and Microsoft 365 configured, secured, and managed consistently across your organization.',
        },
        {
          icon: 'cloud',
          title: 'Backup and disaster recovery',
          text: 'Monitored backups and a recovery plan for hardware failures, outages, and ransomware, so an incident doesn’t become a crisis.',
        },
        {
          icon: 'shield',
          title: 'Built-in cybersecurity',
          text: 'Endpoint and identity protection, security monitoring, and employee training are part of the plan, not an afterthought.',
        },
        {
          icon: 'strategy',
          title: 'Planning and vendor coordination',
          text: 'Regular reviews, a prioritized technology roadmap, and one point of contact for your vendors, licenses, and renewals.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Built around how you operate',
      title: 'No two organizations need the same IT.',
      paragraphs: [
        'A professional services firm, healthcare clinic, manufacturing company, and nonprofit may all rely on managed IT, but their needs are very different. Each faces its own mix of security risks, compliance requirements, support demands, and operational priorities.',
        'The right IT partner should understand more than the technology. They should understand the business behind it.',
      ],
      points: [
        'Strategic planning that fits your business goals',
        'IT support aligned with daily operations',
        'Security that reflects your industry’s requirements',
      ],
    },
    process: {
      eyebrow: 'How it works',
      title: 'Getting started is straightforward.',
      steps: [
        {
          title: 'Consultation',
          text: 'We learn about your team, systems, and goals, then recommend a tailored plan that supports long-term success.',
        },
        {
          title: 'Onboarding',
          text: 'Our team gets to work right away, documenting your environment and ensuring a smooth, efficient transition into our care.',
        },
        {
          title: 'Ongoing success',
          text: 'You have expert support, proactive maintenance, and regular planning to keep performance and security improving.',
        },
      ],
    },
    faqs: [
      {
        question: 'What do managed IT services include?',
        answer:
          'Recon’s managed IT covers day-to-day help desk support, proactive monitoring and maintenance, device and Microsoft 365 management, backup and disaster recovery, cybersecurity, vendor coordination, and long-term technology planning. Your exact plan is shaped around your team and goals.',
      },
      {
        question: 'How is managed IT priced?',
        answer:
          'Recon’s managed IT uses predictable, flat-rate pricing, so your support costs stay steady from month to month. We recommend a plan after learning about your users, devices, locations, and priorities.',
      },
      {
        question: 'We already have an IT person. Do we need managed IT?',
        answer:
          'Not necessarily fully managed IT. With co-managed IT, Recon adds expertise, tools, and help desk capacity alongside your internal staff, who stay in control.',
      },
      {
        question: 'Are you local to Beaumont?',
        answer:
          'Yes. Recon is based at 2590 Calder Ave. in Beaumont and serves organizations throughout Southeast Texas.',
      },
    ],
  },

  comanaged: {
    key: 'comanaged',
    path: '/comanaged/',
    shortName: 'Co-Managed IT',
    serviceType: 'Co-managed IT services',
    titleTag: 'Co-Managed IT Services in Beaumont, TX | Recon Managed Services',
    description:
      'Co-managed IT services that give your internal IT team extra expertise, tools, and help desk capacity while you stay in control. Based in Beaumont, Texas.',
    hero: {
      title: 'Co-managed IT that strengthens your team.',
      text: 'Recon adds expertise, tools, and proactive support to your in-house IT staff to improve security, reliability, and efficiency, while your team stays in control.',
    },
    intro: {
      eyebrow: 'Extend your team',
      title: 'More capacity without more headcount.',
      paragraphs: [
        'As your technology needs evolve, so do the demands on your internal IT team. Recon’s co-managed IT services provide the additional expertise, resources, and support needed to handle day-to-day responsibilities, while your team focuses on strategic initiatives and long-term goals.',
        'Whether you need ongoing support or help with a specific project, Recon works as an extension of your team, providing reliable expertise and resources when you need them most.',
        'You decide where we fit. Some teams hand us the help desk so they can focus on projects; others keep day-to-day support and lean on us for security, escalations, or after-hours coverage.',
      ],
    },
    reasons: {
      eyebrow: 'Why co-managed IT',
      title: 'Why organizations choose co-managed IT.',
      items: [
        {
          title: 'Optimize productivity and efficiency',
          text: 'Hand off routine tickets and maintenance so your internal team can spend its time on the work only it can do.',
        },
        {
          title: 'Enhance cybersecurity and resiliency',
          text: 'Add security tools, monitoring, and specialized expertise that are hard for a small team to build and maintain alone.',
        },
        {
          title: 'Resolve IT issues faster',
          text: 'Extra help desk capacity and escalation support mean fewer bottlenecks and shorter waits for your users.',
        },
        {
          title: 'Gain strategic guidance',
          text: 'A second set of experienced eyes on roadmaps, budgets, vendor decisions, and major projects.',
        },
      ],
    },
    included: {
      eyebrow: 'How we can help',
      title: 'Choose the support your team needs.',
      items: [
        {
          icon: 'headset',
          title: 'Help desk capacity',
          text: 'Overflow, after-hours, or first-line support for your users, coordinated with your internal escalation process.',
        },
        {
          icon: 'network',
          title: 'Advanced tools and automation',
          text: 'Monitoring, patching, and remote-management tools that give your team better visibility with less manual work.',
        },
        {
          icon: 'shield',
          title: 'Security expertise',
          text: 'Endpoint and identity protection, security monitoring, and risk reviews delivered alongside your team.',
        },
        {
          icon: 'clipboard',
          title: 'Project and escalation support',
          text: 'Extra hands and specialized skills for migrations, upgrades, new locations, and complex problems.',
        },
        {
          icon: 'layers',
          title: 'Shared documentation and planning',
          text: 'One shared record of your systems and procedures, plus joint planning so everyone knows who owns what.',
        },
        {
          icon: 'users',
          title: 'Flexible team augmentation',
          text: 'Coverage for vacations, turnover, and busy seasons, scaled up or down as your needs change.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Is it a good fit?',
      title: 'Co-managed IT works well when…',
      paragraphs: [
        'Your internal team keeps ownership of decisions and priorities. Recon fills the gaps you choose, and the arrangement can grow or shrink as your needs change.',
      ],
      points: [
        'Your IT person or team is stretched thin',
        'Tickets are crowding out strategic projects',
        'You need security expertise you don’t have in-house',
        'A major project or migration is coming up',
        'You want coverage for vacations and after hours',
      ],
    },
    process: {
      eyebrow: 'How it works',
      title: 'A partnership that starts with your team.',
      steps: [
        {
          title: 'Consultation',
          text: 'We learn how your team works and where the pressure points are, then agree on who owns what.',
        },
        {
          title: 'Onboarding',
          text: 'We connect our tools, document your environment, and set up a shared process with your team for a smooth start.',
        },
        {
          title: 'Ongoing success',
          text: 'We work side by side with regular check-ins and adjust the arrangement as your organization grows.',
        },
      ],
    },
    faqs: [
      {
        question: 'What is co-managed IT?',
        answer:
          'Co-managed IT is a partnership between your internal IT staff and an outside provider. Recon adds specialized expertise, help desk capacity, enterprise-grade tools, and project support, while your team retains control and focuses on strategic priorities.',
      },
      {
        question: 'Will we lose control of our systems?',
        answer:
          'No. Your team decides what Recon handles and keeps the final say on priorities and changes. We document what we do and work within your processes.',
      },
      {
        question: 'Can Recon help with just one project?',
        answer:
          'Yes. Whether you need ongoing support or help with a specific project, Recon can work as an extension of your team.',
      },
      {
        question: 'How is co-managed IT different from managed IT?',
        answer:
          'With fully managed IT, Recon acts as your IT department. With co-managed IT, Recon supports the IT staff you already have.',
      },
    ],
  },

  cybersecurity: {
    key: 'cybersecurity',
    path: '/cybersecurity/',
    shortName: 'Cybersecurity',
    serviceType: 'Cybersecurity services',
    titleTag: 'Cybersecurity Services in Beaumont, TX | Recon Managed Services',
    description:
      'Layered cybersecurity for Southeast Texas organizations: endpoint and identity protection, email security, monitoring, and employee training. Based in Beaumont.',
    hero: {
      title: 'Cybersecurity that keeps your organization ready.',
      text: 'Layered protection for your people, devices, email, and data, plus the training and planning to keep your team ready for evolving threats.',
    },
    intro: {
      eyebrow: 'A practical approach',
      title: 'Protection built around how attacks really happen.',
      paragraphs: [
        'Most security incidents start with something ordinary: a convincing phishing email, a reused password, a computer that missed an update. Recon builds layers of protection around those everyday risks and keeps them maintained as threats change.',
        'No product or service can promise to stop every attack. A strong security program lowers the odds of an incident, limits the damage if one happens, and helps you recover quickly. That is what we design for.',
        'Security is a core part of Recon’s managed IT, and we can also work alongside an internal IT team through co-managed IT.',
      ],
    },
    included: {
      eyebrow: 'Layers of protection',
      title: 'What our cybersecurity services cover.',
      items: [
        {
          icon: 'laptop',
          title: 'Endpoint protection',
          text: 'Protection for computers and servers against malware and ransomware, kept up to date and centrally managed.',
        },
        {
          icon: 'lock',
          title: 'Identity and access protection',
          text: 'Multi-factor authentication, account security, and access controls that make stolen passwords far less useful.',
        },
        {
          icon: 'mail',
          title: 'Email security',
          text: 'Safeguards that reduce phishing, impersonation, and malicious attachments before they reach your team.',
        },
        {
          icon: 'pulse',
          title: 'Security monitoring',
          text: 'Ongoing monitoring of your environment for suspicious activity, so issues are spotted and handled quickly.',
        },
        {
          icon: 'cap',
          title: 'Employee security training',
          text: 'Practical training that helps your people recognize phishing and social engineering, one of the most common ways attacks begin.',
        },
        {
          icon: 'clipboard',
          title: 'Risk and readiness reviews',
          text: 'Regular reviews of your security posture with clear, prioritized recommendations and a plan for responding to incidents.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Prepared to recover',
      title: 'When something gets through, recovery is what counts.',
      paragraphs: [
        'Reliable backups and a clear recovery plan are your last line of defense against ransomware, hardware failure, and human error.',
        'Recon pairs security with backup and disaster recovery, so an incident becomes an inconvenience instead of a shutdown.',
      ],
      points: ['Monitored backups', 'Recovery planning', 'Incident response guidance'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'Security that improves over time.',
      steps: [
        {
          title: 'Assess',
          text: 'We review your current protections, risks, and requirements, and identify the gaps that matter most.',
        },
        {
          title: 'Protect',
          text: 'We put layered safeguards in place for devices, identities, email, and data, starting with the highest-priority risks.',
        },
        {
          title: 'Maintain and improve',
          text: 'We monitor, update, train, and review regularly, so your protection keeps pace as threats and your organization change.',
        },
      ],
    },
    faqs: [
      {
        question: 'Is my business too small to be a target?',
        answer:
          'No. Many attacks are automated and opportunistic, so they reach organizations of every size. Smaller organizations are often targeted precisely because they tend to have fewer defenses.',
      },
      {
        question: 'Can you guarantee we won’t be breached?',
        answer:
          'No one can honestly guarantee that. What we can do is reduce your risk with layered protection, help detect problems early, and make sure you can recover quickly if something happens.',
      },
      {
        question: 'Do you help with compliance requirements?',
        answer:
          'We can help align your security controls with the requirements you’re responsible for and document what’s in place. Recon doesn’t provide legal advice or compliance certifications, so we work alongside your legal or compliance advisers where needed.',
      },
      {
        question: 'Where should we start?',
        answer:
          'Start with a conversation about your current setup and concerns. We’ll recommend practical first steps, often things like multi-factor authentication, backup checks, and security awareness training.',
      },
    ],
  },

  ai: {
    key: 'ai',
    path: '/ai/',
    shortName: 'Managed AI',
    serviceType: 'Managed AI services',
    titleTag: 'Managed AI Services in Beaumont, TX | Recon Managed Services',
    description:
      'Managed AI services and AI governance for Southeast Texas organizations: readiness planning, secure implementation, usage policies, and ongoing management.',
    hero: {
      title: 'Managed AI services that are practical and secure.',
      text: 'Recon helps organizations adopt artificial intelligence with the oversight, governance, and technical expertise to use it securely and responsibly.',
    },
    intro: {
      eyebrow: 'Why managed AI',
      title: 'AI with oversight, not guesswork.',
      paragraphs: [
        'Managed AI services provide the oversight, governance, and technical expertise organizations need to adopt artificial intelligence securely and responsibly. Like managed IT, they help ensure AI platforms are properly configured, continuously monitored, and aligned with business goals.',
        'Recon helps organizations evaluate AI solutions, integrate them with existing systems, establish secure configurations, and provide ongoing management and support. This structured approach lets you take advantage of AI while keeping control over security, data privacy, and how AI is used across your organization.',
      ],
    },
    included: {
      eyebrow: 'What we help with',
      title: 'From first experiment to everyday tool.',
      items: [
        {
          icon: 'strategy',
          title: 'AI readiness planning',
          text: 'Identify where AI can create measurable value, and what data, security, and process groundwork needs to come first.',
        },
        {
          icon: 'lock',
          title: 'Secure implementation',
          text: 'Configure AI platforms securely and integrate them with your existing systems and permissions.',
        },
        {
          icon: 'clipboard',
          title: 'AI governance and policies',
          text: 'Practical policies, approved tools, and controls that define how AI may be used with company data.',
        },
        {
          icon: 'network',
          title: 'Workflow optimization',
          text: 'Apply AI to real processes, such as drafting, summarizing, and finding information, where it saves your team time.',
        },
        {
          icon: 'pulse',
          title: 'Ongoing management',
          text: 'Keep AI platforms configured, monitored, and aligned with business goals as tools and needs change.',
        },
        {
          icon: 'users',
          title: 'Adoption support',
          text: 'Training and guidance that help your team use approved AI tools confidently and responsibly.',
        },
      ],
    },
    highlight: {
      eyebrow: 'Start your AI strategy',
      title: 'Is shadow AI already in your organization?',
      paragraphs: [
        'Many organizations face the growing challenge of “shadow AI,” where employees use public AI tools without formal approval or oversight. These tools can improve productivity, but unmanaged use can expose sensitive data, create compliance concerns, introduce inaccurate information, and lead to unauthorized connections with business systems.',
        'AI governance establishes clear policies, security controls, and approved use cases, so employees can benefit from AI while company data, intellectual property, and regulatory obligations stay protected.',
      ],
      points: ['Clear AI use policies', 'Approved tools and use cases', 'Security controls for company data'],
    },
    process: {
      eyebrow: 'How it works',
      title: 'A measured path to useful AI.',
      steps: [
        {
          title: 'Consultation',
          text: 'We learn about your goals, data, and current AI use, including tools your people may already be using.',
        },
        {
          title: 'Onboarding',
          text: 'We set up governance and secure configurations, then implement the first high-value use cases.',
        },
        {
          title: 'Ongoing success',
          text: 'We monitor, support, and refine your AI tools and policies as the technology and your needs evolve.',
        },
      ],
    },
    faqs: [
      {
        question: 'What are managed AI services?',
        answer:
          'Managed AI services give organizations ongoing oversight of their AI tools: evaluating solutions, configuring them securely, integrating them with existing systems, and managing them over time, much like managed IT does for the rest of your technology.',
      },
      {
        question: 'What is shadow AI?',
        answer:
          'Shadow AI is employees using public AI tools without approval or oversight. It can expose sensitive data and create compliance risks. A clear AI policy and approved alternatives are the most effective fix.',
      },
      {
        question: 'Will AI tools have access to our sensitive data?',
        answer:
          'That depends on the tool and how it is configured, which is why secure configuration and access controls are central to how Recon implements AI.',
      },
      {
        question: 'Where should we start?',
        answer:
          'Most organizations start with AI readiness planning: understanding current AI use, setting a policy, and choosing one or two high-value use cases to implement securely.',
      },
    ],
  },
};

export const servicePageList = Object.values(servicePages);
