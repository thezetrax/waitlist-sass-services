import { z } from "zod";

const envSchema = z.object({
  DB_DIR: z.string(),
  DB_FILENAME: z.string(),
  ALLOWED_HOSTS: z.preprocess(
    (val) =>
      (val as string)
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) ?? [],
    z.array(z.string().min(1)),
  ),
});

const env = envSchema.parse(process.env);

export { env };
