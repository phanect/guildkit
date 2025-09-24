import { nextCookies } from "better-auth/next-js";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // TODO Remove this on the release
      new URL("https://tmp.guildkit.net/**"),
    ],
  },

  plugins: [
    nextCookies(), // this plugin has to be the last plugin in the array
  ],

  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
