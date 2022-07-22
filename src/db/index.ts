const users = [
  {
    email: "test@test.com",
    password: "password",
    name: "Jane Doe",
  },
];

export const sessions: Record<
  string,
  { sessionId: string; email: string; valid: boolean;AccessToken:string;RefreshToken:string }
> = {};

export function getSession(sessionId: string) {
  const session = sessions[sessionId];

  return session && session.valid ? session : null;
}

export function invalidateSession(sessionId: string) {
  const session = sessions[sessionId];

  if (session) {
    sessions[sessionId].valid = false;
  }

  return sessions[sessionId];
}

export function createSession(email: string, name: string) {
  const sessionId = String(Object.keys(sessions).length + 1);
const AccessToken = "";
const RefreshToken="";
  const session = { sessionId, email, valid: true, name, AccessToken,RefreshToken};

  sessions[sessionId] = session;

  return session;
}

export function getUser(email: string) {
  return users.find((user) => user.email === email);
}
