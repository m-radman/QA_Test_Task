import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    baseUrl: "https://practicesoftwaretesting.com/",
    userEmail: "mlgd@bluff.af",
    userPassword: "111111"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
