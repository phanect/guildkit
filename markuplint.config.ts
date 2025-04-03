import type { Config } from "@markuplint/ml-config";

const config: Config = {
  extends: [
    "markuplint:recommended-svelte",
  ],
  overrideMode: "merge",
  overrides: {
    "./src/app.html": {
      rules: {
        "required-h1": false,
        // It requires <title> although app.html should not have <title>
        "permitted-contents": false,
        // It does not work properly if %sveltekit.head% exists in `<title>`
        "no-orphaned-end-tag": false,
      },
    },
  },
};

export default config;
