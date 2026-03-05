import type { DBInstance } from "@/db";
import Elysia from "elysia";

const DBDecorator = (client: DBInstance) => (server: Elysia) => server.decorate("db", client);
const DBPlugin = (client: DBInstance, server: Elysia = new Elysia()) => server.decorate("db", client);

export { DBPlugin, DBDecorator };
