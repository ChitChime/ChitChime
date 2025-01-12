import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["your-image-domain.com"], // دامنه‌های تصاویر خود را اضافه کنید
  },
  eslint: {
    ignoreDuringBuilds: true, // موقتاً خطاهای ESLint را نادیده بگیر
  },
  typescript: {
    ignoreBuildErrors: true, // موقتاً خطاهای TypeScript را نادیده بگیر
  },
};

export default nextConfig;
