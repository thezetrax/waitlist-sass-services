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
    releaseDate: sql.integer({ mode: "timestamp" }),
    createdAt: sql
      .integer({
        mode: "timestamp",
      })
      .$defaultFn(() => new Date()),
  },
  (ctx) => [sql.uniqueIndex("email_idx").on(ctx.email)],
);

const waitlistForInsert = spread(waitlistSchema, "insert");
const waitlistForSelect = spread(waitlistSchema, "select");

const createWaitlist = t.Object({
  name: waitlistForInsert.name,
  email: waitlistForInsert.email,
  referralCode: waitlistForInsert.referralCode,
  releaseDate: waitlistForInsert.releaseDate,
});
const selectWaitlist = t.Object({
  id: waitlistForSelect.id,
  name: waitlistForSelect.name,
  email: waitlistForSelect.email,
  referralCode: waitlistForSelect.referralCode,
  releaseDate: waitlistForSelect.releaseDate,
});

export { waitlistSchema as waitlist, createWaitlist, selectWaitlist };
