import type { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const authRoute = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null || !token)
    return res.status(401).json({ error: "You must be logged in" });

  jwt.verify(token, (process.env.TOKEN_SECRET as Secret), (err: any, user: any) => {
    if (err) return res.status(400).json({ error: "Invalid token" });

    //@ts-ignore
    req.user = user;

    next();
  });
};

export default authRoute;
