import { env } from "@/lib/env";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { join } from "node:path";
import { table } from "./schema";

const sqlite = new Database(join(env.DB_DIR!, env.DB_FILENAME!));
const db = drizzle(sqlite, { schema: table });
type DBInstance = typeof db;

export { db, sqlite };
export type { DBInstance };
