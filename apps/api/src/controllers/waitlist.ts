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
  tables,
  CreateWaitlist,
  SelectWaitlist,
  UpdateWaitlist,
} from "@waitlist/schema";
import { and, eq, isNull } from "drizzle-orm";
import { AppContext } from "..";
import { User } from "better-auth/*";

type Dependencies = Pick<AppContext, "log" | "db">;

// todo pagination
const fetchAllWaitlistEntries = async ({ db }: Dependencies) =>
  db
    .select()
    .from(tables.waitlist)
    .where(isNull(tables.waitlist.deletedAt))
    .all();

const createWaitlistEntry = async (
  { db }: Dependencies,
  waitlist: CreateWaitlist,
) => {
  const returned = await db
    .insert(tables.waitlist)
    .values({
      ...waitlist,
      referralCode:
        waitlist.referralCode || (await generateWaitlistReferralCode()),
    })
    .returning();
  return returned[0];
};

const fetchWaitlistEntry = async (
  { db }: Dependencies,
  id: SelectWaitlist["id"],
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
  id: SelectWaitlist["id"],
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
  id: SelectWaitlist["id"],
  updatedWaitlist: Partial<UpdateWaitlist>,
) => {
  const returning = await db
    .update(tables.waitlist)
    .set(updatedWaitlist)
    .where(eq(tables.waitlist.id, id))
    .limit(1)
    .returning();

  return returning[0];
};

const generateWaitlistReferralCode = async () => {
  // Create an array of size $len
  // Randomly choose a character from the character set
  // Convert the random index to a character
  // Join the characters into a string
  const generateRandomCode = (len: number): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const code = [...Array(len).keys()]
      .map(() => Math.floor(Math.random() * chars.length))
      .map((randIdx) => chars.charAt(randIdx))
      .join("");

    return code;
  };
  const CODE_LEN = 10; // Length of the referral code

  const code = generateRandomCode(CODE_LEN);
  return code;
};

const fetchUserWaitlistEntries = async ({ db }: Dependencies, user: User) => {
  const waitlists = await db
    .select()
    .from(tables.waitlist)
    .where(
      and(
        eq(tables.waitlist.userId, Number(user.id)),
        isNull(tables.waitlist.deletedAt),
      ),
    );

  return waitlists;
};

export {
  createWaitlistEntry,
  generateWaitlistReferralCode,
  removeWaitlistEntry,
  updateWaitlistEntry,
  fetchAllWaitlistEntries,
  fetchWaitlistEntry,
  fetchUserWaitlistEntries,
};

export type { Dependencies };
