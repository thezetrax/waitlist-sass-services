import { db } from "@/db";
import * as schema from "@/db/schema";
import { Elysia } from "elysia";

const generateReferralCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

export const waitlistRoutes = new Elysia({
  prefix: "/waitlist",
}).get("/", () => db.select().from(schema.waitlist).all());
