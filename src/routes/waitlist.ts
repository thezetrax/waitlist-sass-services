import { db } from "@/db";
import * as schema from "@/db/schema";
import { DBPlugin } from "@/plugins/db";
import { Elysia } from "elysia";
import { App } from "..";

const generateReferralCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

export const waitlistRoutes = (server: App) =>
  server.group("/waitlist", (app) =>
    app.get("/", ({ db }) => db.select().from(schema.waitlist).all()),
  );
