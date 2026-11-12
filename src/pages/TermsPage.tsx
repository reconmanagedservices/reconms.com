import { LegalDocument } from '../components/LegalDocument';
import termsHtml from '../legal/terms.html?raw';
import { pageMeta } from '../seo';

export default function TermsPage() {
  return <LegalDocument meta={pageMeta.terms} heading="Terms of Use" html={termsHtml} />;
}
