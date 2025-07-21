import { defineConfig } from "tsup";

const config = defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  target: "node14",
  watch: true,
  treeshake: true,
});

export default config;
