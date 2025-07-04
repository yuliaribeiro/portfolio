import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { globalIgnores } from "eslint/config"
import eslintPluginPrettier from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"
import react from "eslint-plugin-react"

export default tseslint.config([
  globalIgnores(["dist", ".vite", "node_modules"]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      prettier: eslintPluginPrettier,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "default-case": "warn",
      "no-fallthrough": "error",
      "no-case-declarations": "error",
      "no-console": "warn",
      "no-self-compare": "error",
      "no-unsafe-optional-chaining": "error",
      "no-async-promise-executor": "error",

      "prettier/prettier": "warn",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "react/jsx-no-undef": "error",
      "react/jsx-no-duplicate-props": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
])
