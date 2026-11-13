import { useEffect, useRef, useState } from 'react';
import { postPath, type PostMeta } from '../blog';
import { site } from '../content';
import { BrandIcon, type Brand } from './BrandIcons';
import { Icon } from './Icon';

const buttonClass =
  'grid size-10 shrink-0 place-items-center rounded-full border border-black/15 bg-white text-[#111312] transition-colors hover:border-[#111312] hover:bg-[#111312] hover:text-white focus-visible:border-[#111312]';

/**
 * Share links for a blog post: plain share URLs (no third-party scripts or tracking), plus the
 * device's own share sheet where available (Teams, Messages, WhatsApp, …) and copy-link.
 */
export function ShareButtons({ post, label = 'Share this article' }: { post: PostMeta; label?: string }) {
  const url = `${site.url}${postPath(post)}`;
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  // Decided after mount so the prerendered HTML and first client render match.
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
    return () => window.clearTimeout(resetTimer.current);
  }, []);

  const e = encodeURIComponent;
  const networks: { brand: Brand; name: string; href: string }[] = [
    { brand: 'linkedin', name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}` },
    { brand: 'facebook', name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}` },
    { brand: 'x', name: 'X', href: `https://x.com/intent/post?text=${e(post.title)}&url=${e(url)}` },
  ];
  const mailto = `mailto:?subject=${e(post.title)}&body=${e(`${post.description}\n\n${url}`)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older browsers / insecure contexts: fall back to a temporary text field.
      const field = document.createElement('textarea');
      field.value = url;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2500);
  }

  async function nativeShare() {
    try {
      await navigator.share({ title: post.title, text: post.description, url });
    } catch {
      // Dismissed by the user: nothing to do.
    }
  }

  return (
    <div>
      <p className="eyebrow mb-4">{label}</p>
      <div className="flex flex-wrap items-center gap-2.5">
        {networks.map((network) => (
          <a
            key={network.brand}
            href={network.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${network.name} (opens in a new tab)`}
            title={`Share on ${network.name}`}
            className={buttonClass}
          >
            <BrandIcon brand={network.brand} />
          </a>
        ))}
        <a href={mailto} aria-label="Share by email" title="Share by email" className={buttonClass}>
          <Icon name="mail" className="size-[18px]" />
        </a>
        <button type="button" onClick={copyLink} aria-label="Copy link" title="Copy link" className={buttonClass}>
          <Icon name={copied ? 'check' : 'link'} className="size-[18px]" />
        </button>
        {canNativeShare && (
          <button
            type="button"
            onClick={nativeShare}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-black/15 bg-white px-4 text-sm font-semibold transition-colors hover:border-[#111312] hover:bg-[#111312] hover:text-white"
          >
            <Icon name="share" className="size-4" /> Share…
          </button>
        )}
        <span role="status" className={`text-sm font-semibold transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>
          {copied ? 'Link copied' : ''}
        </span>
      </div>
    </div>
  );
}
