import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { navItems, site } from '../content';
import { Icon } from './Icon';

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // On page change, start at the top — or at the linked section when the URL has a #hash.
  useEffect(() => {
    setMenuOpen(false);
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // Only react to page changes; in-page #anchor clicks are left to the browser.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#f4f4f1] text-[#111312]">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4f4f1]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" aria-label={`${site.name} home`} className="shrink-0">
            <img
              src="/assets/recon-logo.png"
              alt={site.name}
              width={500}
              height={124}
              className="h-auto w-[190px] sm:w-[220px]"
            />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={site.phoneHref} className="text-sm font-semibold tracking-tight">
              {site.phone}
            </a>
            <Link to="/contact/" className="button button-dark">
              Talk to an expert <Icon name="arrow" className="size-4" />
            </Link>
          </div>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-black/15 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} />
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="border-t border-black/10 bg-[#f4f4f1] px-5 py-6 lg:hidden">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navItems.map(([label, path]) => (
                <NavLink key={path} to={path} className="border-b border-black/10 py-4 text-lg font-semibold">
                  {label}
                </NavLink>
              ))}
              <a href={site.phoneHref} className="py-4 font-semibold">
                {site.phone}
              </a>
              <Link to="/contact/" className="button button-dark mt-2 justify-center">
                Talk to an expert <Icon name="arrow" className="size-4" />
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="bg-[#0a0b0b] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Link to="/" aria-label={`${site.name} home`}>
                <img
                  src="/assets/recon-logo.png"
                  alt={site.name}
                  width={500}
                  height={124}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-[210px] brightness-0 invert"
                />
              </Link>
              <p className="mt-6 max-w-sm leading-7 text-white/45">
                Managed IT, cybersecurity, and technology strategy for organizations across Southeast Texas.
              </p>
            </div>
            <div>
              <p className="footer-title">Explore</p>
              <div className="mt-5 grid gap-3 text-sm text-white/55">
                {navItems.map(([label, path]) => (
                  <Link key={path} to={path}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="footer-title">Connect</p>
              <div className="mt-5 grid gap-3 text-sm text-white/55">
                <a href={site.phoneHref}>{site.phone}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <a href={site.customerPortal}>Customer portal</a>
                <a href={site.careers}>Careers</a>
                <a href={site.linkedIn}>LinkedIn</a>
              </div>
              <address className="mt-6 text-sm leading-6 text-white/55 not-italic">
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-7 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p suppressHydrationWarning>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link to="/privacy-policy/">Privacy Policy</Link>
              <Link to="/terms/">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
