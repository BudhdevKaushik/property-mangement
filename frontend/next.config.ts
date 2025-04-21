/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/public/property/**",
      },
    ],
    // Optional: Disable image optimization in development
    unoptimized: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;
