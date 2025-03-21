import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000', // Default to localhost if not set
  },
};

export default nextConfig;
