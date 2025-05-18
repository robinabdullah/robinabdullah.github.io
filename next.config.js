/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Use this for GitHub Pages:
  basePath: process.env.NODE_ENV === 'production' ? '/robinabdullah.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/robinabdullah.github.io/' : '',
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Enable JSON imports
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
};

module.exports = nextConfig; 