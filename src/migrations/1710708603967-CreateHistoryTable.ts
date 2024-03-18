import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateHistoryTable1710708603967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "history",
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
            name: "post_id",
            type: "int",
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
      }),
      true
    );

    await queryRunner.createForeignKey(
      "history",
      new TableForeignKey({
        columnNames: ["post_id"],
        referencedTableName: "post",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("history");
  }
}
