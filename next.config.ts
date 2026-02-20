import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/article/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
