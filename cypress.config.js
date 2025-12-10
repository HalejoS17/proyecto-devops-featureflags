import { defineConfig } from "cypress";
import viteConfig from "./vite.config.js";

export default defineConfig({
  e2e: {
    supportFile: "cypress/support/e2e.js",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig,
    },
  },
});
