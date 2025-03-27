/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'harvinn-tech.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
  // Required for AWS Amplify deployment
  output: 'standalone',

  // Essential for serverless functions
  experimental: {
    serverComponentsExternalPackages: [
      'mongoose',
      'aws-sdk',
      'sharp',
      'bcryptjs',
    ],
    serverActions: true,
  },

  // Enable proper source maps for debugging
  productionBrowserSourceMaps: true,
};

export default nextConfig;
