import { db } from "@/db";
import { auth, AuthOpenAPI } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { DBPlugin, LogPlugin } from "@/plugins";
import { healthRoutes } from "@/routes";
import { openapi } from "@elysiajs/openapi";
import { Elysia, InferContext } from "elysia";
import { cors } from "@elysiajs/cors";

const openapiHandler = openapi({
  documentation: {
    components: await AuthOpenAPI.components,
    paths: await AuthOpenAPI.getPaths(),
  },
});

// Initialize the Elysia app
const app = new Elysia()
  .use(openapiHandler)
  .use(cors({ origin: "http://localhost:4321" }))
  .use(DBPlugin(db))
  .use(LogPlugin(logger))
  .mount(auth.handler)
  .use(healthRoutes);
// .use(waitlistRoutes) // FIXME: causes circular type annotation issue

type App = typeof app;
type AppContext = InferContext<App>;

export type { App, AppContext };
export { app };
