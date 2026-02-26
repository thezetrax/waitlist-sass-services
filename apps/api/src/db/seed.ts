import { db, DBInstance } from "@/db";
import { createWaitlist, tables } from "@/db/schema";
import { seedDB } from "@/lib/db";

type Waitlist = typeof createWaitlist.static;
const waitlistSeedData: Waitlist[] = [
  {
    userId: 1,
    title: "John Doe",
    email: "jhon.doe@example.com",
    referralCode: "ABC123",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

console.log("Seeding...");
await seedDB(db, waitlistSeedData);
console.log("Seeding completed!");
