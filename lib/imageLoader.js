/**
 * Custom Next.js image loader.
 * For images from settings.9gk.22b.myftpupload.com and wp-content we skip optimization (return raw URL)
 * so the browser loads them directly. That avoids 500s when the remote server
 * blocks or rejects server-side fetches from Next.js.
 */
module.exports = function imageLoader({ src, width, quality }) {
  try {
    const u = new URL(src);
    // Skip optimization for settings and wp-content (WordPress media)
    if (u.hostname === 'settings.9gk.22b.myftpupload.com' || u.pathname.includes('/wp-content/')) {
      return src;
    }
  } catch (_) {
    // invalid URL, fall through to default
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
};
