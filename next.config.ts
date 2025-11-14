import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Allow building even when Next's internal type generation exposes errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
