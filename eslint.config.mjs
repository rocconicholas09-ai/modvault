import next from 'eslint-config-next';
export default [
  ...next,
  { rules: { '@typescript-eslint/no-explicit-any': 'off' } },
];
