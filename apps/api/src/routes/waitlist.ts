import { fetchAllWaitlistEntries } from "@/controllers/waitlist";
import { pipe } from "effect";
import { base } from "./base";

const rr = pipe(base);

/** Router */
const waitlistRoutes = rr.get("/", fetchAllWaitlistEntries);

export { waitlistRoutes };
