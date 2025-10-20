import next from 'eslint-config-next';

export default [
  ...next.configs.recommended,
  ...next.configs['core-web-vitals'],
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];
