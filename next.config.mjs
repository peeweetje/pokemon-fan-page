/**
 * NOTE: This file must be `.mjs` (not `.ts`). The `actions/configure-pages`
 * step in the GitHub Pages deploy workflow only injects `basePath` into
 * `next.config.js`/`.cjs`/`.mjs` files. When only a `next.config.ts` existed,
 * it generated its own `next.config.js` without `trailingSlash: true`, which
 * made the CI export flat `*.html` files that GitHub Pages serves as 404 for
 * nested routes (e.g. `/battle-simulator/score`).
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
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
};

export default nextConfig;
