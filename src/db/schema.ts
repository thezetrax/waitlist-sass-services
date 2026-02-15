import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const waitlistSchema = sqliteTable("waitlist", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
});
