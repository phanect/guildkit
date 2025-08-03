import { core } from "@phanect/lint";
import { svelte } from "@phanect/lint-svelte";
import svelteConfig from "./svelte.config.js";
import type { Linter } from "eslint";

const configs: Linter.Config[] = [
  {
    ignores: [
      "./build/**",
      "./tmp/**",
      "./src/lib/db/schema/better-auth.ts",
      "./src/lib/db/schema/currencies.ts",
      "./src/lib/db/schema/index.ts",
    ],
  },
  ...core,
  ...svelte,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        svelteConfig,
      },
    },
  },

  // In this project, I use ESLint rather than tsc's `noUnusedLocals`
  // to check unused imports because I have to ignore unused import warning
  // in tmp/drizzle-schema/better-auth.
  {
    files: [ "**/*.js" ],
    rules: {
      "no-unused-vars": "error",
    },
  },
  {
    files: [ "**/*.ts" ],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  {
    files: [ "**/*.svelte" ],
    rules: {
      // Maybe it does not work properly on Svelte?
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
];

export default configs;
