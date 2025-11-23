import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/arc-raiders-tool",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
