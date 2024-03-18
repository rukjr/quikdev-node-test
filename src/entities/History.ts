import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
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

  @ManyToOne(() => Post, post => post.history)
  @JoinColumn({ name: "post_id" })
  post: Post;
}
