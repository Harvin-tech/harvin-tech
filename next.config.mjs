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
  // Required for Amplify serverless functions
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: [
      'mongoose',
      'aws-sdk',
      'sharp',
      'bcryptjs',
      'jsonwebtoken',
    ],
    serverActions: true,
  },
  // Amplify-specific optimization
  compress: false, // Amplify handles compression
};
export default nextConfig;
