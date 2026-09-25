import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    setupFiles: ["./src/tests/setup.ts"],
    env: {
      NODE_ENV: "test",
    },
    include: ["src/tests/**/*.test.ts"],
    environment: "node",
    globals: true,
  },
});
