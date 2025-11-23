import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ArcRaidersTool",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
