import { concurrently } from "concurrently";
import type { ConcurrentlyCommandInput } from "concurrently";

const dev = {
  command: "bun run --watch ./cmd/server.ts",
  name: "dev-server",
  prefixColor: "green",
} satisfies ConcurrentlyCommandInput;
const tsc = {
  command: "tsc",
  name: "tsc --watch",
  prefixColor: "blue",
} satisfies ConcurrentlyCommandInput;

concurrently([dev, tsc]);
