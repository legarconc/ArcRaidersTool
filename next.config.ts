import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ArcRaidersTool",
  assetPrefix: "/ArcRaidersTool",
  images: {
    unoptimized: true,
  },
  // Force rebuild - v2
};

export default nextConfig;
