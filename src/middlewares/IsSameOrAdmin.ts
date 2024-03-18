import { Response, NextFunction } from "express";
import { CustomRequest } from "../@types/customRequest";

export const IsSameOrAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user?.level === "admin" || req.user?.userId === req.params.id) {
    next();
  } else {
    res.json({ message: "You dont have permission" }).sendStatus(403);
  }
};
