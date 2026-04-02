import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Increase timeout for static generation
  staticPageGenerationTimeout: 120,
  // Skip prerendering errors
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
