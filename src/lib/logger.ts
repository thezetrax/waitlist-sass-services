import { ConsoleTransport, LogLayer } from "loglayer";

const logger = new LogLayer({
  transport: new ConsoleTransport({
    logger: console,
  }),
});

export { logger };
