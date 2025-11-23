import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ArcRaidersTool",
  assetPrefix: "/ArcRaidersTool",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
