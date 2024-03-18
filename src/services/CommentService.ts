import { Comment } from "../entities/Comment";
import { IComment } from "../interfaces/IComment";
import { CommentRepository } from "../repositories/CommentRepository";

export class CommentService {
  private commentRepository = new CommentRepository();

  async createComment(data: IComment) {
    return this.commentRepository.createComment(data);
  }

  async updateComment(commentId: number, commentData: Partial<Comment>) {
    return this.commentRepository.updateComment(commentId, commentData);
  }

  async deleteComment(data: { user_id: number; id: number }) {
    return this.commentRepository.deleteComment(data);
  }
}
