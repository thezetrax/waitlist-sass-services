import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const waitlist = table(
  "waitlist",
  {
    id: t.integer().primaryKey({ autoIncrement: true }),
    name: t.text().notNull(),
    email: t.text().notNull().unique(),
    referralCode: t.text().notNull().unique(),
    referredBy: t.text(),
    createdAt: t
      .integer({
        mode: "timestamp",
      })
      .$defaultFn(() => new Date()),
  },
  (ctx) => [t.uniqueIndex("email_idx").on(ctx.email)],
);

export const waitlistInsertSchema = createInsertSchema(waitlist);
