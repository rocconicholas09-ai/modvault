/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // let production builds complete even with ESLint errors
  },
};
export default nextConfig;
