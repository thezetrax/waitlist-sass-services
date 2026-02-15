import { env } from "@/lib/env";
import { defineConfig } from "drizzle-kit";
import { join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";

/**
 * Initialize the database directory if it doesn't exist.
 */
if (!existsSync(env.DB_DIR)) {
  mkdirSync(env.DB_DIR, { recursive: true });
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: join(env.DB_DIR, env.DB_FILENAME),
  },
});
