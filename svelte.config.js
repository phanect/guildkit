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
      postcss: true,
    }),
  ],

  kit: {
    adapter: adapter(),

    typescript: {
      config: (tsconfigSvelte) => deepmerge.all([
        tsconfigPhanective,
        tsconfigSvelte,
        {
          include: [
            "../*.ts",
            "../*.js",
            "../**/*.ts",
            "../**/*.js",
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
