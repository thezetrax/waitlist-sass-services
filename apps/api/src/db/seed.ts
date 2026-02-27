import { db, DBInstance } from "@/db";
import type { CreateWaitlist as Waitlist } from "@waitlist/schema";
import { seedDB } from "@/lib/db";

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
