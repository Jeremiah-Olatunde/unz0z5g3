import { context, type BuildContext } from "esbuild";

const buildContext: BuildContext = await context({
  bundle: true,
  entryPoints: ["src/index.ts"],
  format: "cjs",
  outExtension: { ".js": ".cjs" },
  outdir: "dist",
  platform: "node",
  target: "node14",
  external: ["fp-ts", "fp-ts-std"],
});

await buildContext.watch();
