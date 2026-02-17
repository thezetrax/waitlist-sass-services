import { Elysia } from "elysia";
import { healthRoutes, waitlistRoutes } from "@/routes";
import { DBPlugin } from "@/plugins/db";
import { db } from "@/db";

// Initialize the Elysia app
const app = new Elysia().use(DBPlugin(db));
export type App = typeof app;

app
  .use(healthRoutes)
  .use(waitlistRoutes)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
