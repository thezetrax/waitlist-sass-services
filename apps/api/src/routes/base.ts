import { db } from "@/db";
import { logger } from "@/lib/logger";
import { pipe } from "effect";
import Elysia from "elysia";

/**
 * Base Elysia router with db and log decorators
 */
const createBaseRouter = () =>
  pipe(
    new Elysia(),
    (app) => app.decorate("log", logger),
    (app) => app.decorate("db", db),
  );

export { createBaseRouter };
