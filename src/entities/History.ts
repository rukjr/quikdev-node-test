import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Timestamp, CreateDateColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column("text")
  description: string;

  @Column({ nullable: true })
  imagePath?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToOne(() => Post, post => post.history)
  @JoinColumn({ name: "post_id" })
  post: Post;
}
