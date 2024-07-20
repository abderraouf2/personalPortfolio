/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "https://server.stocktide.app",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
