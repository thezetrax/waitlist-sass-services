import { db, DBInstance } from "@/db";
import { createWaitlist, tables } from "@/db/schema";
import { seedDB } from "@/lib/db";

type Waitlist = typeof createWaitlist.static;
const waitlistSeedData: Waitlist[] = [
  {
    name: "John Doe",
    email: "jhon.doe@example.com",
    referralCode: "ABC123",
  },
];

console.log("Seeding...");
await seedDB(db, waitlistSeedData);
console.log("Seeding completed!");
