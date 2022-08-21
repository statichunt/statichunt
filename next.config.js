/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    domains: ["www.github.com"],
  },
  reactStrictMode: true,
  experimental: { images: { allowFutureImage: true } },
};

module.exports = nextConfig;
