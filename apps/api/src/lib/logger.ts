import { ConsoleTransport, LogLayer } from "loglayer";

const logger = new LogLayer({
  transport: new ConsoleTransport({
    logger: console,
  }),
});

type LoggerInstance = typeof logger;

export { logger, type LoggerInstance };
