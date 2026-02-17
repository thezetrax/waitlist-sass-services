import { drizzle } from "drizzle-orm/bun-sqlite";
import { env } from "@/lib/env";
import { Database } from "bun:sqlite";
import { join } from "node:path";

const sqlite = new Database(join(env.DB_DIR!, env.DB_FILENAME!));
const db = drizzle(sqlite);
type DBInstance = typeof db;

export type { DBInstance };
export { sqlite, db };
