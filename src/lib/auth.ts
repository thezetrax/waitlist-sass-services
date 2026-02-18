import { db } from "@/db";
import { table } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

const auth = betterAuth({
  basePath: "/api",
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: table,
  }),
});

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = () => (_schema ??= auth.api.generateOpenAPISchema());
const AuthOpenAPI = {
  getPaths: (prefix = "/auth/api") => {
    return getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];
          operation.tags = ["Better Auth"];
        }
      }

      return reference;
    }) as Promise<any>;
  },
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

export { auth, AuthOpenAPI as AuthOpenAPI };
