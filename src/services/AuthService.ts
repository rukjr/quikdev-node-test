import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/config";
import { AppDataSource } from "../data/data-source";
import { User } from "../entities/User";

export const AuthService = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user.id, level: user.level, username: user.name }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    res.json({ token, userId: user.id, username: user.name});
  } else {
    res.json({message: "Email or password is incorrect."}).status(401);
  }
};
