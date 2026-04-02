import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip prerendering errors when Remotion initialization fails
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // Use Turbopack (default in Next.js 16)
  turbopack: {},
};

export default nextConfig;
