import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "http", hostname: "www.animal.go.kr" },
      { protocol: "http", hostname: "www.daejeon.go.kr" },
    ],
  },
};

export default nextConfig;
