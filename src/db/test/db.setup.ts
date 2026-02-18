import { createWaitlist, table } from "@/db/schema";
import { beforeAll } from "bun:test";
import { db, waitlistSeedData } from "./db.mock";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { DBInstance } from "..";

//#region Migration and Seeding Functions
export const runMigration = async (instance: DBInstance) => {
  return migrate(instance, {
    migrationsFolder: "./drizzle",
  });
};

export async function seedDB(instance: DBInstance, data: any[]) {
  await instance.insert(table.waitlist).values(data);
}
//#endregion

async function setupDB() {
  await runMigration(db);
  await seedDB(db, waitlistSeedData);
}

beforeAll(() => {
  setupDB();
});
