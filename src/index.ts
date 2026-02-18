import { db } from "@/db";
import { logger } from "@/lib/logger";
import { DBPlugin } from "@/plugins/db";
import { LogPlugin } from "@/plugins/log";
import { healthRoutes, waitlistRoutes } from "@/routes";
import { Elysia, InferContext } from "elysia";
import { betterAuthView } from "@/routes";
import { auth, AuthOpenAPI } from "@/lib/auth";
import { openapi } from "@elysiajs/openapi";

// Initialize the Elysia app
const app = new Elysia()
  .use(
    openapi({
      documentation: {
        components: await AuthOpenAPI.components,
        paths: await AuthOpenAPI.getPaths(),
      },
    }),
  )
  .use(DBPlugin(db))
  .use(LogPlugin(logger))
  .mount(auth.handler);
type App = typeof app;
type AppContext = InferContext<App>;

app.use(healthRoutes).use(waitlistRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type { App, AppContext };
