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
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: [
      'mongoose',
      'aws-sdk',
      'sharp',
      'bcryptjs',
      'jsonwebtoken' // Add this
    ],
    serverActions: true,
  },
};

export default nextConfig;