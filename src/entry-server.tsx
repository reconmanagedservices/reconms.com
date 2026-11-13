import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App';

export { allPages, canonicalUrl, fullTitle, isNotFound, pageMeta, socialImage, structuredData } from './seo';
export { posts, formatPostDate } from './blog';

/** Renders a route to HTML, waiting for lazy-loaded pages (unlike renderToString). */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}
