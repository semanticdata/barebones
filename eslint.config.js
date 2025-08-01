// eslint.config.js
import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // 1. The recommended Astro config set. It includes parsing and core rules.
  ...eslintPluginAstro.configs['flat/recommended'],

  // 2. The recommended accessibility rules.
  // The plugin exposes a pre-made flat config object.
  jsxA11y.flatConfigs.recommended,

  // 3. (Optional) Your own custom rules can go in a final object.
  // This is where you override things or add your personal preferences.
  {
    rules: {
      // Example: Enforce that all images have explicit dimensions
      // 'astro/img-class-primitives': 'error',
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];