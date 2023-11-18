import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    baseUrl: "https://practicesoftwaretesting.com/"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
