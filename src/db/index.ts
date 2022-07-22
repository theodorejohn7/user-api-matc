
import axios from "axios";
require('dotenv').config()

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

const users = [
  {
    userName: "Theodore",
    password: "password",
    name: "Jane Doe",
  },
];

export const sessions: Record<
  string,
  {
    sessionId: string;
    userName: string;
    valid: boolean;
    AccessToken: string;
    RefreshToken: string;
  }
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

export function createSession(userName: string, name: string) {
  const sessionId = String(Object.keys(sessions).length + 1);
  const AccessToken = "";
  const RefreshToken = "";
  const session = {
    sessionId,
    userName,
    valid: true,
    name,
    AccessToken,
    RefreshToken,
  };

  sessions[sessionId] = session;

  return session;
}

export function  getUser(userName: string) {
  axios.get(`${FIREBASE_URL}/${userName}.json`).then((response) => {
     
    if(response.data.userName)
    {
      return response.data.userName
    }
    

    console.log("@#$",  response.data.userName);
   
  });
  return users.find((user) => user.userName === userName);
}
