import { concurrently } from "concurrently";
import type { ConcurrentlyCommandInput } from "concurrently";

const dev = {
  command: "bun run --watch ./cmd/server.ts",
  name: "dev-server",
  prefixColor: "green",
} satisfies ConcurrentlyCommandInput;

concurrently([dev]);
