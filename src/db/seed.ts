import { db } from "@/db";
import { waitlist, waitlistInsertSchema } from "@/db/schema";
import z from "zod";

type Waitlist = z.infer<typeof waitlistInsertSchema>;
const waitlistSeedData: Waitlist[] = [
  {
    name: "John Doe",
    email: "jhon.doe@example.com",
    referralCode: "ABC123",
  },
];

async function seed() {
  console.log("Seeding waitlist data...");
  await db.insert(waitlist).values(waitlistSeedData);
  console.log("Waitlist data seeded successfully!");
}

console.log("Seeding...");
await seed();
console.log("Seeding completed!");
