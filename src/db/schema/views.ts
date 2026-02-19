import { spread } from "@/lib/db";
import { waitlist } from "./schema";
import { t } from "elysia";

const insertForWaitlist = spread(waitlist, "insert");
const selectForWaitlist = spread(waitlist, "select");

const createWaitlist = t.Object({
  name: insertForWaitlist.name,
  email: insertForWaitlist.email,
  referralCode: insertForWaitlist.referralCode,
  releaseDate: insertForWaitlist.releaseDate,
});
const selectWaitlist = t.Object({
  id: selectForWaitlist.id,
  name: selectForWaitlist.name,
  email: selectForWaitlist.email,
  referralCode: selectForWaitlist.referralCode,
  releaseDate: selectForWaitlist.releaseDate,
});

export { createWaitlist, selectWaitlist };
