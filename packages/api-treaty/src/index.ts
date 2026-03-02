import { treaty } from "@elysiajs/eden";
import type { App } from "@qeberodev/api";

export const api = treaty<App>("http://localhost:3000");
