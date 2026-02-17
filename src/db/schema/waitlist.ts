import { spread } from "@/lib/db";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as sql from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { t } from "elysia";

const waitlistSchema = table(
  "waitlist",
  {
    id: sql.integer().primaryKey({ autoIncrement: true }),
    name: sql.text().notNull(),
    email: sql.text().notNull().unique(),
    referralCode: sql.text().notNull().unique(),
    referredBy: sql.text(),
    createdAt: sql
      .integer({
        mode: "timestamp",
      })
      .$defaultFn(() => new Date()),
  },
  (ctx) => [sql.uniqueIndex("email_idx").on(ctx.email)],
);

const waitlistForInsert = spread(waitlistSchema, "insert");
export const _createWaitlist = createInsertSchema(waitlistSchema);
const createWaitlist = t.Object({
  name: waitlistForInsert.name,
  email: waitlistForInsert.email,
  referralCode: waitlistForInsert.referralCode,
});

export { waitlistSchema as waitlist, createWaitlist };
