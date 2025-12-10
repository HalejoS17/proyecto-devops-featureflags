const { defineConfig } = require("cypress");
const viteConfig = require("./vite.config.js");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig,
    },
  },
});
