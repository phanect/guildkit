import { core } from "@phanect/lint";
import { svelte } from "@phanect/lint-svelte";
import svelteConfigUser from "./workspaces/users/svelte.config.js";
import type { Linter } from "eslint";

const configs: Linter.Config[] = [
  ...core,
  ...svelte,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: [ "./workspaces/users/**" ],
    languageOptions: {
      parserOptions: {
        svelteConfig: svelteConfigUser,
      },
    },
  },
];

export default configs;
