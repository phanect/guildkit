import { join } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": join(import.meta.dirname, "src"),
    },
  },
  test: {
    setupFiles: [ "./tests/setup.ts" ],
    globals: true,
    projects: [{
      extends: true,
      test: {
        environment: "jsdom",
      },
    }],
  },
});
