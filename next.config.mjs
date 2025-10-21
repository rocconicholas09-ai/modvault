/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ do not fail production builds on lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ do not fail production builds on TS type errors
    ignoreBuildErrors: true,
  },
};
export default nextConfig;
