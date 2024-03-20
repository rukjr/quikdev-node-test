import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from "bcryptjs";

export class SeedAdminUser1710685992283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Hasheia a senha antes de inserir
    const password = await bcrypt.hash("123", 10); // Substitua 'adminPassword' pela senha desejada

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("user")
      .values([
        {
          name: "Admin",
          email: "admin@example.com",
          password: password, // Use a senha hasheada
          level: "admin",
        },
      ])
      .execute();
    
      await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("user")
      .values([
        {
          name: "User",
          email: "user@example.com",
          password: password, // Use a senha hasheada
          level: "user",
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("user")
      .where("email = :email", { email: "admin@example.com" })
      .execute();
  }
}
