/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'demo.esocraftrequest.com',
        port: '',
        pathname: '/images/*.png',
      },
    ],
  },
}

module.exports = nextConfig
