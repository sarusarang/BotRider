import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "89r0jcnc-8000.inc1.devtunnels.ms",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "server.boatridersports.in",
        pathname: "/media/**",
      },
    ],
  },

};

export default nextConfig;
