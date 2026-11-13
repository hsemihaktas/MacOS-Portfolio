import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // React Compiler — too strict for standard Next.js patterns
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/impure-function": "off",
      "react-hooks/static-components": "warn",
      "react-compiler/react-compiler": "off",
      // Unused vars: allow _ prefix for intentional ignores
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Downgrade any/prefer-as-const to warn (gradual adoption)
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-as-const": "warn",
    },
  },
]);

export default eslintConfig;
