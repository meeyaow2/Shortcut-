import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the round "N" development-tools button Next.js overlays on every page in dev.
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
