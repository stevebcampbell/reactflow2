import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fixed turbopack configuration
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
