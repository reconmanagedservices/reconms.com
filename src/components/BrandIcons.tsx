/** Filled brand marks on a 24×24 grid, used for the footer social links and post share buttons. */
export const brandPaths = {
  linkedin:
    'M5 9h3.2v10.5H5V9Zm1.6-5a1.85 1.85 0 1 1 0 3.7 1.85 1.85 0 0 1 0-3.7ZM10.2 9h3.07v1.44h.04c.43-.81 1.47-1.66 3.03-1.66 3.24 0 3.84 2.13 3.84 4.9v5.82H17v-5.16c0-1.23-.02-2.81-1.71-2.81-1.71 0-1.97 1.34-1.97 2.72v5.25H10.2V9Z',
  facebook:
    'M13.6 21.5v-8h2.7l.4-3.13h-3.1V8.38c0-.9.25-1.52 1.55-1.52h1.65V4.07c-.29-.04-1.27-.12-2.41-.12-2.38 0-4.02 1.46-4.02 4.13v2.29H7.67v3.13h2.7v8h3.23Z',
  x: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z',
} as const;

export type Brand = keyof typeof brandPaths;

export function BrandIcon({ brand, className = 'size-[18px]' }: { brand: Brand; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={brandPaths[brand]} />
    </svg>
  );
}
