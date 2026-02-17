import { spread } from "@/lib/db";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as schema from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { t } from "elysia";

const waitlistSchema = table(
  "waitlist",
  {
    id: schema.integer().primaryKey({ autoIncrement: true }),
    name: schema.text().notNull(),
    email: schema.text().notNull().unique(),
    referralCode: schema.text().notNull().unique(),
    referredBy: schema.text(),
    createdAt: schema
      .integer({
        mode: "timestamp",
      })
      .$defaultFn(() => new Date()),
  },
  (ctx) => [schema.uniqueIndex("email_idx").on(ctx.email)],
);

const waitlist = spread(waitlistSchema, "insert");
export const _createWaitlist = createInsertSchema(waitlistSchema);
const createWaitlist = t.Object({
  name: waitlist.name,
  email: waitlist.email,
  referralCode: waitlist.referralCode,
});

export { waitlistSchema as waitlist, createWaitlist };
