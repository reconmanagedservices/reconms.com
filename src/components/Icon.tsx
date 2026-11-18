import type { ReactNode } from 'react';

const paths = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  camera: (
    <>
      <path d="M14.5 6 13 4H7L5.5 6H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
      <circle cx="10" cy="13" r="4" />
      <path d="m19 7 4-2v8l-4-2Z" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  cloud: (
    <>
      <path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9Z" />
      <path d="M12 12v4m-2-2h4" />
    </>
  ),
  door: (
    <>
      <path d="M4 21h16M6 21V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
      <path d="M14 12h.01" />
      <rect x="8" y="5" width="8" height="14" rx="1" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M18 19c0 1.1-.9 2-2 2h-3" />
      <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2Z" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  network: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h4a4 4 0 0 1 4 4v5M6 9v6" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  server: (
    <>
      <rect x="3" y="3" width="18" height="7" rx="2" />
      <rect x="3" y="14" width="18" height="7" rx="2" />
      <path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6" />
    </>
  ),
  spark: (
    <path d="m12 3 1.1 3.4a5 5 0 0 0 3.2 3.2L20 11l-3.7 1.4a5 5 0 0 0-3.2 3.2L12 19l-1.1-3.4a5 5 0 0 0-3.2-3.2L4 11l3.7-1.4a5 5 0 0 0 3.2-3.2Z" />
  ),
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v5m9 4h-5m-4 9v-5M3 12h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-3.7 8-10V5l-8-3-8 3v7c0 6.3 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20v-1a5 5 0 0 0-3.5-4.8" />
    </>
  ),
  pulse: <path d="M2 12h4l3-8 4 16 3-8h6" />,
  clipboard: (
    <>
      <rect x="8" y="2.5" width="8" height="4" rx="1" />
      <path d="M16 4.5h2a2 2 0 0 1 2 2V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  laptop: (
    <>
      <rect x="4" y="4" width="16" height="11" rx="1.5" />
      <path d="M2 19h20" />
    </>
  ),
  cap: (
    <>
      <path d="M22 9.5 12 4.5 2 9.5l10 5 10-5Z" />
      <path d="M6 11.5V16c3.5 2.5 8.5 2.5 12 0v-4.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
    </>
  ),
  link: (
    <>
      <path d="M10 13.5a4.5 4.5 0 0 0 6.36.04l3-3a4.5 4.5 0 0 0-6.36-6.36l-1.3 1.29" />
      <path d="M14 10.5a4.5 4.5 0 0 0-6.36-.04l-3 3a4.5 4.5 0 0 0 6.36 6.36l1.29-1.29" />
    </>
  ),
  share: (
    <>
      <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" />
      <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </>
  ),
  factory: (
    <>
      <path d="M2 21h20" />
      <path d="M4 21V10l5 3v-3l5 3V4h4l1 9v8" />
      <path d="M8 17h1M12 17h1M16 17h1" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12.5h18" />
    </>
  ),
  medical: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  heart: <path d="M19.5 12.6 12 20l-7.5-7.4A4.8 4.8 0 1 1 12 6.1a4.8 4.8 0 1 1 7.5 6.5Z" />,
  landmark: (
    <>
      <path d="M2.5 9 12 3.5 21.5 9H2.5Z" />
      <path d="M5 21v-9M9.7 21v-9M14.3 21v-9M19 21v-9M3 21h18" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({ name, className = 'size-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
