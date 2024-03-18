import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { Comment } from "../entities/Comment";
import { History } from "../entities/History";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/data/database.sqlite",
  entities: [User, Post, Comment, History],
  synchronize: false,
  logging: true,
  migrations: ["./src/migrations/**/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
