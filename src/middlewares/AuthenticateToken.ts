import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/config";

export const AuthenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) return res.sendStatus(403);

    (req as any).user = decoded;
    next();
  });
};
