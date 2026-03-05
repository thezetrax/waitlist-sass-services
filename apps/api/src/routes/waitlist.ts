import {
  fetchAllWaitlistEntries,
  fetchWaitlistEntry,
} from "@/controllers/waitlist";
import { pipe } from "effect";
import { createBaseRouter } from "./base";

/** Router */
const rr = pipe(createBaseRouter());

const waitlistRoutes = rr
  .get("/", fetchAllWaitlistEntries)
  .get("/:id", ({ params: { id }, ...rest }) => {
    return fetchWaitlistEntry(rest, Number(id));
  });

export { waitlistRoutes };
