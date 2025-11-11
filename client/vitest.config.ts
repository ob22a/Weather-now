/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",  // simulate browser DOM
    globals: true,          // optional, allows 'describe'/'it' without imports
  },
});
