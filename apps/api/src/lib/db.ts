// Database utilities
// read: https://elysiajs.com/integrations/drizzle.html#utility
// for type inference integration with drizzle

/**
 * @lastModified 2025-02-04
 * @see https://elysiajs.com/recipe/drizzle.html#utility
 */

import { DBInstance } from "@/db";
import { tables } from "@waitlist/schema";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

export const runMigration = async (instance: DBInstance) => {
  return migrate(instance, {
    migrationsFolder: "./drizzle",
  });
};

export async function seedDB(instance: DBInstance, data: any[]) {
  console.log("Seeding waitlist data...");
  await instance.insert(tables.waitlist).values(data);
  console.log("Waitlist data seeded successfully!");
}
