// Features include
// - create a waitlist entry
// - generate referral code
// - track referral code usage
// - have channels for sending waitlist notifications
//    - email
//    - sms
//    - push notification
//    - slack/telegram

import { AppContext } from "..";
import { table } from "@/db/schema";

type Dependencies = Pick<AppContext, "log" | "db">;

const fetchAllWaitlistEntries = async ({ db }: Dependencies) =>
  db.select().from(table.waitlist).all();

export { fetchAllWaitlistEntries };
