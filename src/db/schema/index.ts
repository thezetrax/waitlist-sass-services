import { waitlist, createWaitlist, selectWaitlist } from "./waitlist";
import * as auth from "./auth";

const tables = {
  waitlist,
  ...auth,
} as const;
type Table = typeof tables;

export { tables };
export type { createWaitlist, selectWaitlist, Table };
