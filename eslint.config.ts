import { core } from "@phanect/lint";
import { next } from "@phanect/lint-react";
import type { Linter } from "eslint";

const configs: Linter.Config[] = [
  {
    ignores: [
      "./.next/**",
      "./build/**",
      "./out/**",
      "./tmp/**",
      "./src/lib/db/schema/better-auth.ts",
      "./src/lib/db/schema/currencies.ts",
      "./src/lib/db/schema/index.ts",
      "next-env.d.ts",
    ],
  },
  ...core,
  ...next,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default configs;
