import { db, DBInstance } from "@/db";
import { auth, AuthOpenAPI } from "@/lib/auth";
import { logger, LoggerInstance } from "@/lib/logger";
import { DBPlugin, LogPlugin } from "@/plugins";
import { healthRoutes, waitlistRoutes } from "@/routes";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { env } from "@/lib/env";

const openapiHandler = openapi({
  documentation: {
    components: await AuthOpenAPI.components,
    paths: await AuthOpenAPI.getPaths(),
  },
});

// Initialize the Elysia app
const app = new Elysia()
  .use(openapiHandler)
  .use(cors({ origin: env.ALLOWED_HOSTS }))
  .use(DBPlugin(db))
  .use(LogPlugin(logger))
  .use(healthRoutes)
  .use(waitlistRoutes)
  .mount("/auth", auth.handler);

type App = typeof app;
type AppContext = {
  db: DBInstance;
  log: LoggerInstance;
};

export type { App, AppContext };
export { app };
