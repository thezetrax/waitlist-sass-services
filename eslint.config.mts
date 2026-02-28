import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";

const JS_EXT = ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"];
const TS_EXT = ["**/*.{ts,tsx,mts,cts}"];
const TS_TEST_EXT = [
  "**/*.{test.ts,mock.ts,test.mts,test.cts,test.tsx,test.mtsx,test.ctsx}",
  "**/test/*.setup.ts",
];

export default defineConfig([
  globalIgnores(["**/drizzle/", "**/dist/", "./apps/web/.astro/*"]),
  {
    files: JS_EXT,
    plugins: { js, import: importPlugin },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    // typescript
    files: TS_EXT,
    plugins: { tseslint },
    extends: ["tseslint/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {},
  },
  {
    // typescript tests
    files: TS_TEST_EXT,
    plugins: { tseslint, js },
    extends: ["tseslint/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-useless-assignment": "warn",
    },
  },
  {
    files: [...JS_EXT, ...TS_EXT],
    ignores: TS_TEST_EXT,
    plugins: { import: importPlugin },
    rules: {
      "import/exports-last": "error",
      "import/imports-first": "error",
    },
  },
  pluginReact.configs.flat["jsx-runtime"],
]);
