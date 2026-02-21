import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { createWaitlist, tables } from "@/db/schema";
import { addDays, addMonths } from "date-fns";

const sqlite = new Database(":memory:");
// Mock data for testing
const db = drizzle(sqlite, { schema: tables });

type Waitlist = typeof createWaitlist.static;
const waitlistMockData: Waitlist[] = [
  {
    name: "John Doe",
    email: "jhon.doe@example.com",
    referralCode: "ABC123",
    releaseDate: addDays(new Date(), 10),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Abebe Biqila",
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
