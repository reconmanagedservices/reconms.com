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
