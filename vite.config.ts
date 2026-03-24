import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    __SVELTEKIT_EXPERIMENTAL_USE_TRANSFORM_ERROR__: "false",
  },
  server: {
    allowedHosts: ["ab8e-161-8-96-183.ngrok-free.app"],
  },
  plugins: [tailwindcss(), sveltekit()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/lib/**/*.ts"],
      exclude: ["**/*.test.ts"],
      thresholds: {
        lines: 85,
        branches: 75,
        functions: 85,
        statements: 85,
      },
    },
  },
});
