import { Elysia, InferContext } from "elysia";
import { healthRoutes, waitlistRoutes } from "@/routes";
import { DBPlugin } from "@/plugins/db";
import { db } from "@/db";
import { LogPlugin } from "@/plugins/log";
import { logger } from "@/lib/logger";

// Initialize the Elysia app
const app = new Elysia().use(DBPlugin(db)).use(LogPlugin(logger));
type App = typeof app;
type AppContext = InferContext<App>;

app.use(healthRoutes).use(waitlistRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type { App, AppContext };
