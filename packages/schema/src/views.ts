// Moved from apps/api/src/db/schema/views.ts
import { spread } from "@/lib/db";
import { waitlist } from "./schema";
import { t } from "elysia";

const insertForWaitlist = spread(waitlist, "insert");
const selectForWaitlist = spread(waitlist, "select");

//#region Waitlist Entry Creation and Selection
const createWaitlist = t.Object({
  userId: insertForWaitlist.userId,
  title: insertForWaitlist.title,
  description: insertForWaitlist.description,
  email: insertForWaitlist.email,
  referralCode: t.Optional(insertForWaitlist.referralCode),
  releaseDate: insertForWaitlist.releaseDate,
  status: insertForWaitlist.status,
});
const selectWaitlist = t.Object({
  id: selectForWaitlist.id,
  title: selectForWaitlist.title,
  email: selectForWaitlist.email,
  referralCode: selectForWaitlist.referralCode,
  releaseDate: selectForWaitlist.releaseDate,
  status: selectForWaitlist.status,
});
const updateWaitlist = t.Object({
  title: insertForWaitlist.title,
  email: insertForWaitlist.email,
  releaseDate: insertForWaitlist.releaseDate,
  referralCode: t.Optional(insertForWaitlist.referralCode),
  status: insertForWaitlist.status,
});
//#endregion

//#region
type CreateWaitlist = typeof createWaitlist.static;
//#endregion

export { createWaitlist, selectWaitlist, updateWaitlist };
export type { CreateWaitlist };
