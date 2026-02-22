import Elysia from "elysia";
import { LogLayer } from "loglayer";

const LogPlugin = (logger: LogLayer) => new Elysia().decorate("log", logger);

export { LogPlugin };
