import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ArcRaidersTool",
  assetPrefix: "/ArcRaidersTool",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === "production" ? "/ArcRaidersTool" : "",
  },
};

export default nextConfig;
