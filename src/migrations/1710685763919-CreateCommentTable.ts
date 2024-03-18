import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCommentTable1710685763919 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comment",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
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
            name: "post_id",
            type: "int",
          },
          {
            name: "isRemoved",
            type: "boolean",
            default: false,
          },
          {
            name: "removed_by_user_id",
            type: "int",
            isNullable: true,
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
      }),
      true
    );

    await queryRunner.createForeignKey(
      "comment",
      new TableForeignKey({
        columnNames: ["removed_by_user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL"
      })
    );

    await queryRunner.createForeignKey(
      "comment",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "comment",
      new TableForeignKey({
        columnNames: ["post_id"],
        referencedTableName: "post",
        referencedColumnNames: ["id"],
      })
    );

    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("comment");
  }
}
