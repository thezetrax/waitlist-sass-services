import { Elysia } from "elysia";
import { healthRoutes, waitlistRoutes } from "@/routes";
import { DBPlugin } from "@/plugins/db";
import { db } from "@/db";
import { LogPlugin } from "@/plugins/log";
import { logger } from "@/lib/logger";

// Initialize the Elysia app
const app = new Elysia().use(DBPlugin(db));
export type App = typeof app;
const app = new Elysia().use(DBPlugin(db)).use(LogPlugin(logger));

app
  .use(healthRoutes)
  .use(waitlistRoutes)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
