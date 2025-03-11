import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "", // Leave empty if no specific port
        pathname: "/t/p/**", // Allow all paths under /t/p/
      },
      // If you have other remote image sources, add them here
    ],
  },
};

export default nextConfig;
