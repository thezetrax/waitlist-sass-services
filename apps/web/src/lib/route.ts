const _authPaths = ["/auth/login", "/auth/signup"] as const;
const paths = [..._authPaths] as const;

function isAuthPath(path: string) {
  // @ts-ignore
  return _authPaths.includes(path);
}

function getCurrentPath() {
  return new URL(window.location.href).pathname;
}

type URLPathString = `/${string}`;
function goto(path: (typeof paths)[number] | (URLPathString & {})) {
  if (path !== getCurrentPath()) window.location.href = path;
}

function protectRoute() {
  if (!isAuthPath(getCurrentPath())) {
    // TODO: Implement authentication logic here
    // For example, check if user is logged in

    goto("/auth/login");
  }
}

export { goto, isAuthPath, getCurrentPath, protectRoute };
