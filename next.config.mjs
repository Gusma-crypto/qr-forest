/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "api-qrcode.fornesia.id", "192.168.4.254"], // ✅ tambahkan hostname API
  },
};

export default nextConfig;
