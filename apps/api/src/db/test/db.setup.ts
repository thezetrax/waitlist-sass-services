import { tables } from "@waitlist/schema";
import { beforeAll } from "bun:test";
import { db } from "./db.mock";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { DBInstance } from "..";

//#region Migration and Seeding Functions
export const runMigration = async (instance: DBInstance) => {
  return migrate(instance, {
    migrationsFolder: "./drizzle",
  });
};

export async function seedDB(instance: DBInstance, data: any[]) {
  return await instance.insert(tables.waitlist).values(data).returning();
}
//#endregion

async function setupDB() {
  await runMigration(db);
}

beforeAll(() => {
  setupDB();
});
