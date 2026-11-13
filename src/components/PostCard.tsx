import { Link } from 'react-router';
import { formatPostDate, postPath, type PostMeta } from '../news';
import { Icon } from './Icon';

/** Card linking to a news post; used on /news/, the home page, and below posts. */
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      to={postPath(post)}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_10px_35px_rgba(17,19,18,.043)] transition-transform duration-300 hover:-translate-y-1"
    >
      {post.image ? (
        <img
          src={post.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover"
        />
      ) : (
        <div className="hero-grid relative grid aspect-[16/9] place-items-center overflow-hidden bg-[#151716] text-white/80">
          <span className="relative font-display text-3xl tracking-tight">{'{r}'}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <p className="text-xs font-semibold tracking-[.12em] text-black/50 uppercase">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.category && <> · {post.category}</>}
        </p>
        <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight">{post.title}</h3>
        <p className="mt-4 line-clamp-3 leading-7 text-black/58">{post.description}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold">
          Read article
          <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
