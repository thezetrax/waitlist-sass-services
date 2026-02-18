import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { createWaitlist, table } from "@/db/schema";

const sqlite = new Database(":memory:");
// Mock data for testing
const db = drizzle(sqlite, { schema: table });

type Waitlist = typeof createWaitlist.static;
const waitlistSeedData: Waitlist[] = [
  {
    name: "John Doe",
    email: "jhon.doe@example.com",
    referralCode: "ABC123",
  },
];

export { db, waitlistSeedData, Waitlist };
