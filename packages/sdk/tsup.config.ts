import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],      // grab all files recursively
  format: ["esm"],
  outDir: "dist",
  dts: true,
  splitting: false,
  clean: true,
  minify: false,
  bundle: false,               // ⛔ disables single-file output
  skipNodeModulesBundle: true
});