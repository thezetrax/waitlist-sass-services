// Moved from apps/api/src/db/schema/views.ts
import { waitlist } from "./schema";

const createWaitlistSchema = waitlist.$inferInsert;
const selectWaitlistSchema = waitlist.$inferSelect;

type CreateWaitlist = typeof waitlist.$inferInsert;
type SelectWaitlist = typeof waitlist.$inferSelect;

export { createWaitlistSchema, selectWaitlistSchema };
export type { CreateWaitlist, SelectWaitlist };
