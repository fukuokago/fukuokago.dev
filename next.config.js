/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
