/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  },
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
