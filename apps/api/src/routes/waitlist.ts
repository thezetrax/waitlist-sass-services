import { fetchAllWaitlistEntries, fetchWaitlistEntry } from "@/controllers/waitlist";
import { pipe } from "effect";
import { Elysia } from "elysia";
import { logger } from "@/lib/logger";
import { db } from "@/db";

/** Router */
const rr = 
  pipe(
    new Elysia({
      prefix: "/waitlist"
    }),
    (app) => app.decorate("log", logger),
    (app) => app.decorate("db", db),
  );

const waitlistRoutes = rr.get("/", fetchAllWaitlistEntries).get("/:id", ({ params: { id }, ...rest }) => {
  return fetchWaitlistEntry(rest, Number(id));
});

export { waitlistRoutes };
