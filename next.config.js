/* eslint-disable spellcheck/spell-checker */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['makerdao-ses.github.io', 'raw.githubusercontent.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
