/** @type {import('next').NextConfig} */

import nextPWA from '@ducanh2912/next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'awcai.cloud',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    ASSET_ENDPOINS: process.env.ASSET_ENDPOINS,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },

  // Required for Next.js 16 + Turbopack
  turbopack: {},
};

export default withPWA(nextConfig);