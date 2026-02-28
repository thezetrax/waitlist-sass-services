// Moved from apps/api/src/db/schema/views.ts
import { spread } from "./lib/db";
import {
  tables,
  waitlist,
  waitlistAnnouncement,
  waitlistSignup,
} from "./schema";
import { t } from "elysia";

const insertForWaitlist = spread(waitlist, "insert");
const selectForWaitlist = spread(waitlist, "select");

//#region Waitlist
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

type CreateWaitlist = typeof createWaitlist.static;
type SelectWaitlist = typeof selectWaitlist.static;
type UpdateWaitlist = typeof updateWaitlist.static;
type Waitlist = typeof waitlist.$inferSelect;
//#endregion

//#region Waitlist Announcement
type WaitlistAnnouncement = typeof waitlistAnnouncement.$inferSelect;
//#endregion

//#region Waitlist Signup
type WaitlistSignup = typeof waitlistSignup.$inferSelect;
//#endregion

//#region User
type User = typeof tables.user.$inferInsert;
//#endregion

export { createWaitlist, selectWaitlist, updateWaitlist };
export type {
  CreateWaitlist,
  SelectWaitlist,
  UpdateWaitlist,
  Waitlist,
  WaitlistAnnouncement,
  WaitlistSignup,
  User,
};
