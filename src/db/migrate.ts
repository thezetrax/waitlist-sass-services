import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "@/db";

console.log("Starting migration");

migrate(db, {
  migrationsFolder: "./drizzle",
});

console.log("Migration completed");
