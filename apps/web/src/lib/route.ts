import { getSession } from "./api";

const _authPaths = ["/auth/login", "/auth/signup"] as const;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const paths = [..._authPaths] as const;

function isAuthPath(path: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore TypeScript doesn't understand that _authPaths is a tuple of string literals
  return _authPaths.includes(path);
}

function getCurrentPath() {
  return new URL(window.location.href).pathname;
}

type URLPathString = `/${string}`;
function goto(path: (typeof paths)[number] | (URLPathString & {})) {
  if (path !== getCurrentPath()) window.location.href = path;
}

// Protect non-auth routes by redirecting to login if no session exists
async function protectRoute() {
  if (!isAuthPath(getCurrentPath())) {
    const session = await getSession();
    if (!session) goto("/auth/login");
  }
}

export { goto, isAuthPath, getCurrentPath, protectRoute };
