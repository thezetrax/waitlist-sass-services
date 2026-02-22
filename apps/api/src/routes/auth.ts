import { Context } from "elysia";
import { auth } from "@/lib/auth";

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
};

export { betterAuthView };
