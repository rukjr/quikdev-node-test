import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository = new UserRepository();

  async createUser(data: { email: string; name: string; password: string; level: string }) {
    return this.userRepository.createUser(data);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  async updateUser(userId: number, userData: Partial<User>) {
    return this.userRepository.updateUser(userId, userData);
  }

  async deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
