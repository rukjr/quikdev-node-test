import { AppDataSource } from "../data/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

export class UserRepository {
  async createUser(data: { email: string; name: string; password: string; level: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.level = data.level;
    user.password = hashedPassword;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    return user;
  }

  async findUserByEmail(email: string) {
    return AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .select(["user.id", "user.name", "user.email", "user.level"])
      .getOne();
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(User);

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    let user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return null;
    }

    await userRepository.update(userId, userData);

    user = await userRepository.findOneBy({ id: userId });
    return user;
  }

  async deleteUser(id: number) {
    const userRepository = AppDataSource.getRepository(User);
    const userToDelete = await userRepository.findOneBy({ id });
    if (userToDelete) {
      await userRepository.remove(userToDelete);
    } else {
      throw new Error("User not found");
    }
  }
}
