/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // don't block production builds on lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // don't block production builds on TS type errors
    ignoreBuildErrors: true,
  },
};
export default nextConfig;
