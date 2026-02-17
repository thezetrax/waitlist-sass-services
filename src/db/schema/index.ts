import { waitlist, createWaitlist } from "./waitlist";

const table = {
  waitlist,
} as const;
type Table = typeof table;

export { table };
export type { createWaitlist, Table };
