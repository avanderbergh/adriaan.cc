// @ts-check
import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        ignores: ["**/dist", "**/node_modules", "**/.astro"],
    },

    // JavaScript
    eslint.configs.recommended,

    // TypeScript
    ...tseslint.configs.recommended,

    // Astro
    ...eslintPluginAstro.configs.recommended,

    // Globals
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
]);
