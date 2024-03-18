import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  level: string;

  @Column({ length: 191 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn({ name: "user_id" })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @JoinColumn({ name: "user_id" })
  comments: Comment[];
}
