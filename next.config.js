/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/public/upload/**",
      },
    ],
    // domains: ["localhost"],
  },
};

module.exports = nextConfig;
