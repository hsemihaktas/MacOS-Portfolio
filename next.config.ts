import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Modern format önceliği: AVIF → WebP → orijinal
    formats: ["image/avif", "image/webp"],
    // 30 gün cache — resimler nadiren değişir
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "yawdxcqkbkhlrxmalfdw.supabase.co",
        // Hem object (dosya) hem render (transform) endpoint'leri
        pathname: "/storage/v1/**",
      },
    ],
  },
};

export default nextConfig;
