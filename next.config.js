/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // For user sites (username.github.io), the basePath and assetPrefix should be empty
  // For project sites, you would use the repository name
  basePath: '',
  assetPrefix: '',
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