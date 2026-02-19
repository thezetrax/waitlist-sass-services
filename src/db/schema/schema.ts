import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as sql from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import * as auth from "./auth";

const waitlist = table(
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

const waitlistSignup = table("waitlist_signup", {
  id: sql.int().primaryKey({ autoIncrement: true }),
  waitlist_id: sql.integer().references(() => waitlist.id),
  status: sql
    .text({ enum: ["waiting", "invited", "cancelled"] })
    .notNull()
    .default("waiting"),
  referral_code: sql.text().notNull(),
  referred_by: sql.integer().references(() => user.id),
  joined_at: sql.integer({ mode: "timestamp_ms" }).$defaultFn(() => new Date()),
});

const waitlistAnnouncement = table("waitlist_announcement", {
  id: sql.int().primaryKey({ autoIncrement: true }),
  waitlist_id: sql.integer().references(() => waitlist.id),
  title: sql.text().notNull(),
  content: sql.text().notNull(),
  created_at: sql.integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
  user_id: sql.integer().references(() => user.id),
  published: sql.integer({ mode: "boolean" }).notNull().default(false),
});

const tables = {
  waitlist,
  waitlistSignup,
  waitlistAnnouncement,
  ...auth,
} as const;

export { waitlist, waitlistSignup, waitlistAnnouncement, tables };
