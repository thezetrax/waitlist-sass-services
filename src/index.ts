import { db } from "@/db";
import { logger } from "@/lib/logger";
import { DBPlugin } from "@/plugins/db";
import { LogPlugin } from "@/plugins/log";
import { healthRoutes, waitlistRoutes } from "@/routes";
import { Elysia, InferContext } from "elysia";
import { betterAuthView } from "@/routes";

// Initialize the Elysia app
const app = new Elysia().use(DBPlugin(db)).use(LogPlugin(logger));
type App = typeof app;
type AppContext = InferContext<App>;

app
  .use(healthRoutes)
  .use(waitlistRoutes)
  .all("/api/auth/*", betterAuthView)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type { App, AppContext };
