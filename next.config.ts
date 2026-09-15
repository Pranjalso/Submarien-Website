import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output only when building inside Docker / container environments
  // On Vercel, Next.js must use default output to avoid ENOENT next-server.js.nft.json
  ...(process.env.BUILD_STANDALONE === "true" || process.env.DOCKER_BUILD === "true"
    ? { output: "standalone" }
    : {}),
};

export default nextConfig;
