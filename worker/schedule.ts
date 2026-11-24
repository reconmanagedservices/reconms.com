/**
 * Scheduled blog posts. The build leaves out posts dated after today (Central time) and lists
 * their dates in dist/scheduled-posts.json. Once a day, the Worker's cron trigger runs
 * publishScheduledPosts(): if any of those dates has arrived, it calls the Workers Builds
 * deploy hook, and the fresh build includes the post.
 */
import type { Env } from './index';

/** Matches SCHEDULE_FILE in vite-plugin-blog.ts. */
export const SCHEDULE_PATH = '/scheduled-posts.json';

type Schedule = { timeZone: string; dates: string[] };

export async function publishScheduledPosts(env: Env) {
  const response = await env.ASSETS.fetch(`https://assets.local${SCHEDULE_PATH}`);
  if (!response.ok) {
    console.warn(`Scheduled posts: ${SCHEDULE_PATH} not found (status ${response.status}); nothing to do.`);
    return;
  }
  const { timeZone, dates } = (await response.json()) as Schedule;
  const today = new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date());
  const due = dates.filter((date) => date <= today);
  if (!due.length) {
    console.log(`Scheduled posts: none due today (${today}); upcoming: ${dates.join(', ') || 'none'}.`);
    return;
  }
  if (!env.DEPLOY_HOOK_URL) {
    console.error('Scheduled posts: a post is due but DEPLOY_HOOK_URL is not set, so the site was not rebuilt.');
    return;
  }
  const hook = await fetch(env.DEPLOY_HOOK_URL.trim(), { method: 'POST' });
  const result = await hook.text();
  if (!hook.ok) {
    console.error(`Scheduled posts: deploy hook failed (${hook.status}): ${result.slice(0, 500)}`);
    return;
  }
  console.log(`Scheduled posts: rebuild started for posts dated ${due.join(', ')}: ${result.slice(0, 500)}`);
}
