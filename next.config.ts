import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/spice-pay-app" : "",
  assetPrefix: isProd ? "/spice-pay-app/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
