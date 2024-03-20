import { Request, Response } from "express";
import { CommentService } from "../services/CommentService";
import { IComment } from "../interfaces/IComment";
import { CustomRequest } from "../@types/customRequest";

export class CommentController {
  private commentService = new CommentService();

  async createComment(req: CustomRequest, res: Response) {
    try {
      const { description, post_id } = req.body;
      const user_id = req.user?.userId;

      if (!user_id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const commentData: IComment = {
        description,
        post_id: parseInt(post_id),
        user_id: parseInt(user_id),
      };

      const comment = await this.commentService.createComment(commentData);

      if (comment) {
        res.json(comment);
      } else {
        res.status(404).json({ message: "Creating a comment is not working now, try later" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async updateComment(req: CustomRequest, res: Response) {
    const { id } = req.params;
    try {
      const { description } = req.body;
      const commentData = { description };

      const updatedComment = await this.commentService.updateComment(Number(id), commentData);

      if (updatedComment) {
        res.json(updatedComment);
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async deleteComment(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;
      const user_id = req.user?.userId || '0';
      const data = {
        user_id: parseInt(user_id),
        id: parseInt(id),
      };
      await this.commentService.deleteComment(data);
      res.json({ message: "Comment deleted successfully." });
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }
}
