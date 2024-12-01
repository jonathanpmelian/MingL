import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Testing environment
    baseUrl: "http://localhost:3100",
    supportFile: false,
    specPattern: "tests/e2e/**/*.cy.{ts,tsx}",
  },
});
