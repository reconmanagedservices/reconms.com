import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { Seo } from '../components/Seo';
import { pageMeta } from '../seo';

export default function NotFoundPage() {
  return (
    <section className="grid min-h-[65vh] place-items-center px-5 py-20 text-center">
      <Seo meta={pageMeta.notFound} />
      <div>
        <p className="eyebrow justify-center">Page not found</p>
        <h1 className="mt-7 font-display text-6xl tracking-[-.05em] sm:text-8xl">Lost connection.</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-black/55">
          The page you were looking for has moved or does not exist.
        </p>
        <Link to="/" className="button button-dark mt-9">
          Return home <Icon name="arrow" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
