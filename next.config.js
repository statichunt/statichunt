/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "statichunt-images.netlify.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t1.gstatic.com",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
};

module.exports = nextConfig;
