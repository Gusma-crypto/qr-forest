/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const apiHostname = new URL(apiUrl).hostname;

const nextConfig = {
  outputFileTracingRoot: new URL(".", import.meta.url).pathname,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: apiHostname,
      },
    ],
  },
};

export default nextConfig;
