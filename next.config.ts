import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML in `out/`, served by GitHub Pages at https://meeyaow2.github.io/Shortcut-/.
  output: "export",
  basePath: "/Shortcut-",
  // Writes each route as `route/index.html`, which Pages serves for both `/route` and `/route/`.
  trailingSlash: true,
  // Hides the round "N" development-tools button Next.js overlays on every page in dev.
  devIndicators: false,
  // cacheComponents (and partialPrefetching, which needs it) is off: it turns on Partial
  // Prerendering, which needs a server, and `next build` refuses it with `output: "export"`.
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
