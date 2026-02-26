import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { createWaitlist, tables } from "@/db/schema";
import { addDays, addMonths, subMonths } from "date-fns";
import { User } from "better-auth/db";
import { sql } from "drizzle-orm";

const sqlite = new Database(":memory:");
// Mock data for testing
const db = drizzle(sqlite, { schema: tables });

let runOnce = false;
if (runOnce) {
  db.run(sql`PRAGMA foreign_keys = ON`);
  runOnce = true;
}

let userCount = 1;
export const userMockData: User[] = [
  {
    name: "Jhon Doe",
    email: "jhon.doe@example.com",
    id: String(userCount++),
    createdAt: subMonths(new Date(), userCount),
    updatedAt: subMonths(new Date(), userCount),
    emailVerified: true,
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    id: String(userCount++),
    createdAt: subMonths(new Date(), userCount),
    updatedAt: subMonths(new Date(), userCount),
    emailVerified: true,
  },
  {
    name: "Alice Smith",
    email: "alice.smith@example.com",
    id: String(userCount++),
    createdAt: subMonths(new Date(), userCount),
    updatedAt: subMonths(new Date(), userCount),
    emailVerified: true,
  },
];

export const createUserEntry = async (...users: User[]) =>
  await db.insert(tables.user).values(users);

type Waitlist = typeof createWaitlist.static;
const waitlistMockData: Waitlist[] = [
  {
    userId: Number(userMockData[0].id),
    title: "John Doe",
    email: "jhon.doe@example.com",
    referralCode: "ABC123",
    releaseDate: addDays(new Date(), 10),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    userId: Number(userMockData[1].id),
    title: "Abebe Biqila",
    email: "abebe@example.com",
    referralCode: "ABAB1234",
    releaseDate: addMonths(new Date(), 1),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const cleanDB = async () => {
  await db.delete(tables.waitlist).execute();
};

export { db, waitlistMockData, Waitlist, cleanDB };
