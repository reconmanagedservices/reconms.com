import { lazy, Suspense, type ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import { SiteLayout } from './components/SiteLayout';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductsPage from './pages/ProductsPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServicesPage from './pages/ServicesPage';
import { servicePageList } from './servicePages';

// The legal pages carry ~55 KB of policy text, so they load as separate chunks instead of
// being shipped to every visitor. Prerendering waits for them, so their HTML is complete.
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));

const deferred = (page: ReactNode) => <Suspense fallback={<div className="min-h-screen" />}>{page}</Suspense>;

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        {servicePageList.map((page) => (
          <Route key={page.key} path={page.path.slice(1, -1)} element={<ServiceDetailPage page={page} />} />
        ))}
        <Route path="products" element={<ProductsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="terms" element={deferred(<TermsPage />)} />
        <Route path="privacy-policy" element={deferred(<PrivacyPolicyPage />)} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
