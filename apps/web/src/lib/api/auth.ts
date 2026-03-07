import { authClient } from "@qeberodev/api-treaty";

// Get current user session
async function getSession() {
  const { data: session, error } = await authClient.getSession();
  if (error) {
    console.error("Error fetching session:", error);
    return null;
  }

  return session;
}

type AuthCredentials = Parameters<typeof authClient.signUp.email>[0];
async function signup({ email, password, name }: AuthCredentials) {
  const { data: user, error } = await authClient.signUp.email({
    name,
    email,
    password,
  });

  if (error) {
    console.error("Error signing up:", error);
    return null;
  }

  return user;
}

type SigninCredentials = Parameters<typeof authClient.signIn.email>[0];
async function signin({ email, password }: SigninCredentials) {
  const { data: user, error } = await authClient.signIn.email({
    email,
    password,
  });

  if (error) {
    console.error("Error signing up:", error);
    return null;
  }

  return user;
}

export { getSession, signup, signin };
export type { AuthCredentials, SigninCredentials };
