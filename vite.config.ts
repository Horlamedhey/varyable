import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  define: {
    __SVELTEKIT_EXPERIMENTAL_USE_TRANSFORM_ERROR__: "false",
  },
  server: {
    allowedHosts: [],
  },
  plugins: [
    tailwindcss(),
    sveltekit({
      adapter: mode === "test" ? undefined : adapter(),
      alias: { "$lib": "src/lib" },
      csp: {
        mode: "auto",
        directives: {
          "default-src": ["self"],
          "style-src": ["self", "unsafe-inline"],
          "font-src": ["self"],
          "img-src": ["self", "data:", "https:"],
          "script-src": ["self", "https://static.cloudflareinsights.com"],
          "connect-src": ["self", "https://cloudflareinsights.com"],
          "base-uri": ["self"],
          "form-action": ["self"],
          "frame-ancestors": ["none"],
        },
      },
    }),
  ],
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
}));
