/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'firebasestorage.googleapis.com']
  },
  env: {
    API_URL: process.env.API_URL,
  }
}

module.exports = nextConfig
