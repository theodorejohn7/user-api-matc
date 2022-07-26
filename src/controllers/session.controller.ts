import { Request, Response } from "express";
import { createSession, getUser, invalidateSession } from "../db";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

// login handler
export function createSessionHandler(req: Request, res: Response) {
  const { userName, password } = req.body;

  const user:any = getUser(userName);

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid userName or password");
  }

  const session = createSession(userName, user.name);

  // create access token
  const accessToken = signJWT(
    { userName: user.userName, name: user.name, sessionId: session.sessionId },
    "5s"
  );

  const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");

  

  // set access token in cookie
  // res.cookie("accessToken", accessToken, {
  //   maxAge: 300000, // 5 minutes
  //   httpOnly: true,
  // });

  // res.json({token:refreshToken})
  // res.cookie("refreshToken", refreshToken, {
  //   maxAge: 3.154e10, // 1 year
  //   httpOnly: true,
  // });

  // send user back
 
  const data = session;
  Object.assign(data, {AccessToken: accessToken});
  Object.assign(data, {RefreshToken: refreshToken});


 
  return res.send(data);
}

// get the session session

// log out handler
export function getSessionHandler(req: Request, res: Response) {
  // @ts-ignore
  return res.send(req.user);
}

export function deleteSessionHandler(req: Request, res: Response) {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  // @ts-ignore
  const session = invalidateSession(req.user.sessionId);

  return res.send(session);
}
