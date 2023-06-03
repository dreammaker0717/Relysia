// const withImages = require('next-images')

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self';",
  },
]

module.exports = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'assets.vercel.com',
      'a.storyblok.com',
      'img2.storyblok.com',
      'i.ibb.co',
      'satolearn.com'
    ],
  },
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/app/wallet',
        permanent: true,
      },
    ]
  },
  httpAgentOptions: {
    rejectUnauthorized: false,
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
