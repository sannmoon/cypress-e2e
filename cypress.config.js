const { defineConfig } = require("cypress");
const envs = require("./cypress.env.json");

module.exports = defineConfig({
  e2e: {
    baseUrl: envs.baseUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true, // to run all tests at the same time
  },
});
