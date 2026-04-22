import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}', 'tests/**/*.test.{ts,tsx}', 'tests/**/*.spec.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
 resolve: {
   tsconfigPaths: true,
   alias: {
     '@': path.resolve(__dirname, './src'),
     'components': path.resolve(__dirname, './src/components'),
     '@lib': path.resolve(__dirname, './lib'),
   },
 },
});
