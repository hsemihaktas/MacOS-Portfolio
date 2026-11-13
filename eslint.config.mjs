import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // React Compiler rules — too strict for standard Next.js patterns
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/impure-function": "off",
      "react-hooks/static-components": "warn",
      // React Compiler auto-memoization conflicts with manual useCallback/useMemo
      "react-compiler/react-compiler": "off",
      // Style preferences, not correctness
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-as-const": "warn",
    },
  },
]);

export default eslintConfig;
