import { App } from "@/server";
import { fetchAllWaitlistEntries } from "@/controllers/waitlist";

const waitlistRoutes = (server: App) =>
  server.group("/waitlist", (app) => {
    return app.get("/", fetchAllWaitlistEntries);
  });

export { waitlistRoutes };
