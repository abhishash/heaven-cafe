/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    ASSET_ENDPOINS: process.env.ASSET_ENDPOINS,
  }
}

export default nextConfig
