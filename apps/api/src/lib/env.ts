import { z } from "zod";

const envSchema = z.object({
  DB_DIR: z.string(),
  DB_FILENAME: z.string(),
});

export const env = envSchema.parse(process.env);
