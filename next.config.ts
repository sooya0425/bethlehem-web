import type { NextConfig } from "next";
import { ROUTE_MAP } from "./src/lib/routes";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  async rewrites() {
    return [
      // 난독화 경로 → 실제 파일 경로 매핑
      ...Object.entries(ROUTE_MAP).map(([source, destination]) => ({
        source,
        destination,
      })),
    ];
  },
};

export default nextConfig;
