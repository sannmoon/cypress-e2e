const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: Cypress.env("baseUrl"),
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true, // to run all tests at the same time
  },
});
