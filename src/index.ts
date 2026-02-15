import { Elysia } from "elysia";
import { healthRoutes } from "@/routes/health";

const app = new Elysia()
  .use(healthRoutes)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
