import { concurrently } from "concurrently";
import type { ConcurrentlyCommandInput } from "concurrently";

const dev = {
  command: "bun run --watch ./cmd/server.ts",
  name: "dev-server",
  prefixColor: "green",
} satisfies ConcurrentlyCommandInput;
const build = {
  command: "bun build --watch --target bun --outdir ./dist ./cmd/server.ts",
  name: "build",
  prefixColor: "yellow",
} satisfies ConcurrentlyCommandInput;
const tsc = {
  command: "tsc",
  name: "tsc --watch",
  prefixColor: "blue",
} satisfies ConcurrentlyCommandInput;
const clean = {
  command: "rm -rf ./dist",
  name: "clean",
  prefixColor: "red",
} satisfies ConcurrentlyCommandInput;

concurrently([clean]);
concurrently([dev, tsc, build]);
