import type { DBInstance } from "@/db";
import { Elysia, Context } from "elysia";

const DBPlugin = (client: DBInstance) => new Elysia().decorate("db", client);

export { DBPlugin };
