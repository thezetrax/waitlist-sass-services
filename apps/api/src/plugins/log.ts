import Elysia from "elysia";
import { LogLayer } from "loglayer";

const LogPlugin = (logger: LogLayer, server: Elysia = new Elysia()) => server.decorate("log", logger);

export { LogPlugin };
