/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
    remotePatterns: [
      { protocol: 'https', hostname: '9gk.22b.myftpupload.com' },
      { protocol: 'https', hostname: 'www.9gk.22b.myftpupload.com' },
      { protocol: 'https', hostname: 'settings.9gk.22b.myftpupload.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

module.exports = nextConfig;
