import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    baseUrl: "https://practicesoftwaretesting.com/",
    userEmail: "customer@practicesoftwaretesting.com",
    userPassword: "welcome01"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/tests/**/*.cy.ts",
    chromeWebSecurity: false
  },
});
