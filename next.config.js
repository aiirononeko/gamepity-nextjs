/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'dgcqfzhophkhekhfppvl.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
