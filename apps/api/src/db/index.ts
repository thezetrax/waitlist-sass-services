import { env } from "@/lib/env";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { join } from "node:path";
import { tables } from "@waitlist/schema";
import { sql } from "drizzle-orm";

const sqlite = new Database(join(env.DB_DIR!, env.DB_FILENAME!));
const db = drizzle(sqlite, { schema: tables });

let runOnce = false;
if (runOnce) {
  db.run(sql`PRAGMA foreign_keys = ON`);
  runOnce = true;
}

type DBInstance = typeof db;

export { db, sqlite };
export type { DBInstance };
