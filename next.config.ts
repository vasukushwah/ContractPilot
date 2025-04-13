import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['placehold.co'], // Add other domains as needed
    formats: ['image/webp'], // Optionally, specify preferred formats
    
  },
};

export default nextConfig;
