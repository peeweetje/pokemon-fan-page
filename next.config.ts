const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
  },
  experimental: {
    viteConfig: {
      resolve: {
        tsconfigPaths: true
      }
    }
  }
};

export default nextConfig;
