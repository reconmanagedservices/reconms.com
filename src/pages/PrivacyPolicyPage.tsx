import { LegalDocument } from '../components/LegalDocument';
import privacyHtml from '../legal/privacy-policy.html?raw';
import { pageMeta } from '../seo';

export default function PrivacyPolicyPage() {
  return <LegalDocument meta={pageMeta.privacy} heading="Privacy Policy" html={privacyHtml} />;
}
