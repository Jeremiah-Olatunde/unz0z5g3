import * as esbuild from "esbuild";

const context = await esbuild.context({
  bundle: true,
  entryPoints: ["src/index.ts"],
  format: "cjs",
  outExtension: { ".js": ".cjs" },
  outdir: "dist",
  platform: "node",
  target: "node14",
});

await context.watch();
