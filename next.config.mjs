/**
 * GitHub Pages build configuration.
 *
 * Pages is a static file host — it cannot run a Next.js server — so the site
 * is exported to plain HTML/CSS/JS. Two consequences are easy to miss and
 * both fail silently, so they are handled explicitly below.
 */

/**
 * A GitHub Pages *project* site is served from /<repo-name>, not from the
 * domain root, so every asset URL needs that prefix. Once a custom domain is
 * attached the site serves from the root instead — at that point set this to
 * an empty string (the workflow passes it in at build time).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Emit a static site into ./out instead of a server build.
  output: 'export',

  basePath,

  images: {
    // The Next.js image optimizer is a server feature. Without this flag the
    // export still *builds cleanly* but every <Image> emits a
    // /_next/image?url=... URL, which 404s on Pages — the page would render
    // with no images at all and no build error to warn you.
    //
    // Trade-off: no automatic AVIF/WebP conversion or per-viewport resizing,
    // so compress and size photographs before committing them.
    unoptimized: true,
  },

  // Pages resolves /path to /path/index.html — match that shape.
  trailingSlash: true,
};

export default nextConfig;
