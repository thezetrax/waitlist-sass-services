import { waitlist, createWaitlist } from "./waitlist";
import * as auth from "./auth";

const table = {
  waitlist,
  ...auth,
} as const;
type Table = typeof table;

export { table };
export type { createWaitlist, Table };
