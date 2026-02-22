import { db } from "@/db";
import { runMigration } from "@/lib/db";

console.log("Starting migration");
runMigration(db);
console.log("Migration completed");
