# Blog posts

Each `.md` file in this folder is one post on the site. The file name becomes the post's
address: `my-post-title.md` is published at `https://reconms.com/my-post-title/`.
Use lowercase words separated by hyphens.

The easiest way to write posts is **Pages CMS** (see the main README). To create one by hand,
add a file here that starts like this:

```markdown
---
title: How Long Business Computers Last
date: 2026-11-20
description: One or two sentences for the Blog page and Google (about 150 characters).
category: IT Management
image: /assets/blog/computers.jpg
imageAlt: A row of office laptops
draft: false
---

The post itself, written in Markdown.

## A subheading

- A bulleted list
- [A link](/managed/)
```

- `title` and `date` are required. Everything else is optional.
- Images go in `public/assets/blog/` and are referenced as `/assets/blog/<file>`.
- `draft: true` keeps a post off the live site (it still shows in `npm run dev`).
- Add `updated: YYYY-MM-DD` when you make a significant change to an older post.
