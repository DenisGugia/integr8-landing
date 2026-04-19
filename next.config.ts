import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  async rewrites() {
    return [
      {
        source: "/onboarding",
        destination: "https://integr8-634054956771.us-central1.run.app",
      },
      {
        source: "/onboarding/:path*",
        destination: "https://integr8-634054956771.us-central1.run.app/:path*",
      },
      {
        source: "/assets/:path*",
        destination: "https://integr8-634054956771.us-central1.run.app/assets/:path*",
      },
    ];
  },
};

export default nextConfig;
