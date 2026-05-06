/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'awcai.cloud',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'awcai.cloud',
      },
    ],
  },
  // images: {
  //   unoptimized: false,
  // },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    ASSET_ENDPOINS: process.env.ASSET_ENDPOINS,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  }
}

export default nextConfig
