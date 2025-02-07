/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Habilita o uso de Server Actions
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;