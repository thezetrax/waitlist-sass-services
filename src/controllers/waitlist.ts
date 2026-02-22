// Features include
// - create a waitlist entry
// - generate referral code
// - track referral code usage
// - have channels for sending waitlist notifications
//    - email
//    - sms
//    - push notification
//    - slack/telegram

import {
  createWaitlist,
  selectWaitlist,
  tables,
  updateWaitlist,
} from "@/db/schema";
import { TODO } from "@/lib/todo";
import { and, eq, isNull } from "drizzle-orm";
import { AppContext } from "..";

type Dependencies = Pick<AppContext, "log" | "db">;

// todo pagination
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
) =>
  (
    await db
      .select()
      .from(tables.waitlist)
      .where(and(eq(tables.waitlist.id, id), isNull(tables.waitlist.deletedAt)))
      .limit(1)
  )[0];

const removeWaitlistEntry = async (
  { db }: Dependencies,
  id: typeof selectWaitlist.static.id,
) => {
  const returned = await db
    .update(tables.waitlist)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(tables.waitlist.id, id))
    .limit(1)
    .returning({
      deletedId: tables.waitlist.id,
    });

  return returned[0];
};

const updateWaitlistEntry = async (
  { db }: Dependencies,
  id: typeof selectWaitlist.static.id,
  updatedWaitlist: Partial<typeof updateWaitlist.static>,
) => {
  const returning = await db
    .update(tables.waitlist)
    .set(updatedWaitlist)
    .where(eq(tables.waitlist.id, id))
    .limit(1)
    .returning();

  return returning[0];
};

const generateWaitlistReferralCode = async () =>
  TODO("generate a unique referral code");

export {
  createWaitlistEntry,
  fetchAllWaitlistEntries,
  fetchWaitlistEntry,
  generateWaitlistReferralCode,
  removeWaitlistEntry,
  updateWaitlistEntry,
};

export type { Dependencies };
