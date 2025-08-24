import deepmerge from "deepmerge";
import { sveltePreprocess } from "svelte-preprocess";
import tsconfigPhanective from "@phanect/configs/ts/importable";
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type { import("@sveltejs/kit").Config } */
const config = {
  preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      scss: true,
    }),
  ],

  kit: {
    adapter: adapter(),

    typescript: {
      config: (tsconfigSvelte) => deepmerge.all([
        tsconfigPhanective,
        tsconfigSvelte,
        {
          // Check by ESLint to ignore files under tmp/
          compilerOptions: {
            noUnusedLocals: false,
          },
        },
        {
          include: [
            "../*.ts",
            "../*.js",
            "../**/*.ts",
            "../**/*.js",
          ],
          exclude: [
            "../build/**",
          ],
        },
      ], {
        arrayMerge: (arr1, arr2) => {
          const arr = [ ...arr1 ];

          for (const el of arr2) {
            if (!arr.includes(el)) {
              arr.push(el);
            }
          }

          return arr;
        },
      }),
    },
  },
};

export default config;
