import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    swcPlugins: [
      [
        "@lingui/swc-plugin",
        {
          // Additional Configuration
        },
      ],
    ],
  },
};

export default nextConfig;
