import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  async createUser(req: Request, res: Response) {
    try {
      const { email, name, password, level } = req.body;

      const user = await this.userService.createUser({ email, name, password, level });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Creating a user is not working now, try later" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async findUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await this.userService.findUserByEmail(email as string);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedUser = await this.userService.updateUser(Number(id), req.body);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(parseInt(id));
      res.json({ message: "User deleted successfully." });
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }
}
