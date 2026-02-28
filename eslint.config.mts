import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["**/drizzle/", "**/dist/", "./apps/web/.astro/*"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    // typescript
    files: ["**/*.{ts,tsx,mts,cts}"],
    plugins: { tseslint },
    extends: ["tseslint/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {},
  },
  {
    // typescript tests
    files: [
      "**/*.{test.ts,mock.ts,test.mts,test.cts,test.tsx,test.mtsx,test.ctsx}",
      "**/test/*.setup.ts",
    ],
    plugins: { tseslint, js },
    extends: ["tseslint/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-useless-assignment": "warn",
    },
  },
  pluginReact.configs.flat["jsx-runtime"],
]);
