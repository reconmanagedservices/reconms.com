import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { pageMeta } from './seo';

export { pageMeta };
export { canonicalUrl, fullTitle } from './seo';

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
