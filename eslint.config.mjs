// Flat ESLint config used by Next.js 15+
// This extends Next's defaults and disables the "no-explicit-any" rule.
import next from 'eslint-config-next';

export default [
  ...next,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
