import { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false
    };

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true
    };
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' }
    ]
  },
  redirects: async () => [
    { source: '/', destination: '/dashboard', permanent: true },
  ]
};

export default nextConfig;