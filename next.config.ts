import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // TODO Remove this on the release
      new URL("https://tmp.guildkit.net/**"),
    ],
  },
};

export default nextConfig;
