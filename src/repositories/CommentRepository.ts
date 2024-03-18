import { AppDataSource } from "../data/data-source";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { IComment } from "../interfaces/IComment";
import { sendEmail } from "../utils/sendEmail";

export class CommentRepository {
  async createComment(data: IComment) {
    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);
    const user = await userRepository.findOneBy({ id: data.user_id });
    const post = await postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .where("post.id = :id", { id: data.post_id })
      .getOne();

    if (!user) {
      throw new Error("User not found");
    }

    if (!post) {
      throw new Error("Post not found");
    }

    const comment = new Comment();
    comment.description = data.description;
    comment.user = user;
    comment.post = post;

    const commentRepository = AppDataSource.getRepository(Comment);
    await commentRepository.save(comment);

    if (post.user.email) {
      sendEmail(
        post.user.email,
        "New Comment on Your Post",
        `Hello, a new comment was added to your post: ${comment.description}`
      ).catch(console.error);
    }

    return comment;
  }

  async updateComment(commentId: number, commentData: Partial<Comment>): Promise<Comment | null> {
    const commentRepository = AppDataSource.getRepository(Comment);

    let comment = await commentRepository.findOneBy({ id: commentId });
    if (!comment) {
      return null;
    }

    await commentRepository.update(commentId, commentData);

    comment = await commentRepository.findOneBy({ id: commentId });
    return comment;
  }

  async deleteComment(data: { user_id: number; id: number }) {
    const commentRepository = AppDataSource.getRepository(Comment);
    const userRepository = AppDataSource.getRepository(User);

    const commentToDelete = await commentRepository.findOneBy({ id: data.id });
    const user = await userRepository.findOneBy({ id: data.user_id });

    if (!user) {
      throw new Error("User not found");
    }

    if (commentToDelete) {
      commentToDelete.isRemoved = true;
      commentToDelete.removedBy = user;

      await commentRepository.save(commentToDelete);
    } else {
      throw new Error("Comment not found");
    }
  }
}
