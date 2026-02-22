import * as schema from "@/db/schema";
import { App } from "..";
import { fetchAllWaitlistEntries } from "@/controllers/waitlist";

const generateReferralCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const waitlistRoutes = (server: App) =>
  server.group("/waitlist", (app) => {
    return app.get("/", fetchAllWaitlistEntries);
  });

export { waitlistRoutes };
