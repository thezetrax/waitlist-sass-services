// Features include
// - create a waitlist entry
// - generate referral code
// - track referral code usage
// - have channels for sending waitlist notifications
//    - email
//    - sms
//    - push notification
//    - slack/telegram

import { eq } from "drizzle-orm";
import { AppContext } from "..";
import { tables, createWaitlist, selectWaitlist } from "@/db/schema";

type Dependencies = Pick<AppContext, "log" | "db">;

const fetchAllWaitlistEntries = async ({ db }: Dependencies) =>
  db.select().from(tables.waitlist).all();

const createWaitlistEntry = async (
  { db }: Dependencies,
  waitlist: typeof createWaitlist.static,
) => {
  const returned = await db
    .insert(tables.waitlist)
    .values(waitlist)
    .returning();
  return returned[0];
};

const fetchWaitlistEntry = async (
  { db }: Dependencies,
  id: typeof selectWaitlist.static.id,
) => {
  return await db
    .select()
    .from(tables.waitlist)
    .where(eq(tables.waitlist.id, id));
};

// TODO: Implement generateWaitlistReferralCode
const generateWaitlistReferralCode = () => {};

export {
  fetchAllWaitlistEntries,
  createWaitlistEntry,
  fetchWaitlistEntry,
  Dependencies,
};
