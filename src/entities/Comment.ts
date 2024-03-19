import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Timestamp, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  description: string;

  @Column("text")
  post_id: number;

  @Column("text")
  user_id: number;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @Column({ default: false })
  isRemoved: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: "removed_by_user_id" }) 
  removedBy: User;
}
