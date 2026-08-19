export const SITE_URL = process.env.SITE_URL || "";

/** Turn a bundled asset path (or any relative path) into an absolute URL.
 * If SITE_URL is empty, this returns a site-root-relative path (starting with /),
 * which ensures assets and Open Graph images are loaded from the current host
 * instead of the Lovable preview host. In production set SITE_URL to your
 * canonical site (e.g. https://example.com) via environment variables.
 */
export const absUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
