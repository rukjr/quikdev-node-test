import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../@types/customRequest";

export const IsAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.level === "admin") {
    next();
  } else {
    res.json({message: 'Only admin have access'}).sendStatus(403);
  }
};
