import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePostTable1710685758137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "post",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            length: "100",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "views",
            type: "int",
            default: 0,
          },
          {
            name: "likes",
            type: "int",
            default: 0,
          },
          {
            name: "dislikes",
            type: "int",
            default: 0,
          },
          {
            name: "imagePath",
            type: "varchar",
            length: "255",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("post");
  }
}
