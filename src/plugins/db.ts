import type { DBInstance } from "@/db";
import Elysia from "elysia";

export const DBPlugin = (client: DBInstance) =>
  new Elysia().decorate("db", client);
