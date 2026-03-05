import { fetchAllWaitlistEntries } from "@/controllers/waitlist";
import { pipe } from "effect";
import { base } from "./base";

/** Router */
const rr = pipe(base);

const waitlistRoutes = rr.get("/", fetchAllWaitlistEntries);

export { waitlistRoutes };
