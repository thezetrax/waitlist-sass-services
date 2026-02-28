import { App } from "..";
import { fetchAllWaitlistEntries } from "@/controllers/waitlist";

const waitlistRoutes = (server: App) =>
  server.group("/waitlist", (app) => {
    return app.get("/", fetchAllWaitlistEntries);
  });

export { waitlistRoutes };
