import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  devIndicators: false,
  images: { remotePatterns: [{ protocol: "https", hostname: "cdn.21st.dev" }, { protocol: "https", hostname: "images.unsplash.com" }] },
};
export default nextConfig;
