import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  /* Use SimpleKit by relative path to git submodule */
  resolve: {
    alias: {
      simplekit: path.resolve(__dirname, "../simplekit/src"),
    },
  },
});
