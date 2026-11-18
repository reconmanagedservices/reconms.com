import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App';

export { allPages, canonicalUrl, fullTitle, isNotFound, pageMeta, socialImage, structuredData } from './seo';
export { posts, formatPostDate } from './blog';

async function prerenderOnce(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    // Never split large finished sections out of order (React does that above ~12.8 KB to help
    // streaming, which we don't use: the output is a static file).
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * Renders a route to static HTML, with every section written inline. Out-of-order content (a
 * hidden container plus inline <script>s that move it into place) would be blocked by our
 * Content-Security-Policy and is worse for crawlers, so the build fails if any slips through.
 * If a lazy-loaded page part still suspended on the first pass, a second pass renders it inline.
 */
export async function render(url: string): Promise<string> {
  let html = await prerenderOnce(url);
  if (html.includes('<template id="B:') || /<script>\$R/.test(html)) {
    html = await prerenderOnce(url);
  }
  if (/<div hidden id="S:\d+"/.test(html) || /<script>\$R/.test(html)) {
    throw new Error(`Prerendered ${url} still contains out-of-order streamed content`);
  }
  return html;
}
