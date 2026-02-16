import { Elysia } from "elysia";
import { healthRoutes, waitlistRoutes } from "@/routes";

const app = new Elysia()
  .use(healthRoutes)
  .use(waitlistRoutes)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
