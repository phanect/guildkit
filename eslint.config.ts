import { core } from "@phanect/lint";
import { svelte } from "@phanect/lint-svelte";
import svelteConfig from "./svelte.config.js";
import type { Linter } from "eslint";

const configs: Linter.Config[] = [
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
];

export default configs;
