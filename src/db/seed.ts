import { db } from "@/db";
import { createWaitlist, table } from "@/db/schema";

type Waitlist = typeof createWaitlist.static;
const waitlistSeedData: Waitlist[] = [
  {
    name: "John Doe",
    email: "jhon.doe@example.com",
    referralCode: "ABC123",
  },
];

async function seed() {
  console.log("Seeding waitlist data...");
  await db.insert(table.waitlist).values(waitlistSeedData);
  console.log("Waitlist data seeded successfully!");
}

console.log("Seeding...");
await seed();
console.log("Seeding completed!");
