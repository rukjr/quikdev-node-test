import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { History } from "./History";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  user_id: number;

  @Column({ length: 100 })
  title: string;

  @Column("text")
  description: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @Column({ nullable: true })
  imagePath?: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  comments: Comment[];

  @OneToMany(() => History, (history) => history.post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  history: History[];
}
