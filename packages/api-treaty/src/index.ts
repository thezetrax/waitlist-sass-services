import { treaty } from "@elysiajs/eden";
import type { App } from "@qeberodev/api";
import { createAuthClient } from "better-auth/react";

const api = treaty<App>("http://localhost:3000");

const authClient = createAuthClient({
  baseURL: "http://localhost:3000/auth/api",
});

export { api, authClient };
