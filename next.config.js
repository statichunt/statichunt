/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
        hostname: 'www.github.com',
        port: '',
        pathname: '/**',
    },{
      protocol: 'https',
        hostname: 'teamosis-sg.vercel.app',
        port: '',
        pathname: '/**',
    },{
      protocol: 'https',
        hostname: 't1.gstatic.com',
        port: '',
        pathname: '/**',
    }],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
