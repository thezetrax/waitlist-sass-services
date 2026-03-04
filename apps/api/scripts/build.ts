import type { ConcurrentlyCommandInput } from "concurrently";
import { concurrently } from "concurrently";

/**
 "build:compile": "bun build --compile ./cmd/server.ts --outfile ./dist/server",
 "build": "bun --target bun build ./src/index.ts --outdir ./dist/ && tsc",
 */
const build = {
  command: "bun --target bun build ./src/index.ts --outdir ./dist/",
  name: "build",
  prefixColor: "green",
} satisfies ConcurrentlyCommandInput;
const compile = {
  command: "bun build --compile ./cmd/server.ts --outfile ./dist/server",
  name: "compile",
  prefixColor: "yellow",
} satisfies ConcurrentlyCommandInput;
const tsc = {
  command: "tsc",
  prefixColor: "blue",
} satisfies ConcurrentlyCommandInput;
const clean = {
  command: "rm -rf ./dist",
  name: "clean",
  prefixColor: "red",
} satisfies ConcurrentlyCommandInput;

const commands = [clean, build, compile, tsc];

concurrently(commands, {
  maxProcesses: 1,
});
