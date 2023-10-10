/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/dashboard/category",
  //       destination: "/dashboard/category/root",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
