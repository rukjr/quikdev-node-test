import { Response, NextFunction } from "express";
import { CustomRequest } from "../@types/customRequest";
import { AppDataSource } from "../data/data-source";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";

export const IsAdminOrAuthorComment = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const commentId = parseInt(req.params.id);

  if (!commentId) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  if (req.user?.level === "admin") {
    return next();
  }

  try {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOneBy({ id: commentId });

    const postRepository = AppDataSource.getRepository(Post);
    const post = await postRepository.findOneBy({ id: comment?.post_id });

    if (!comment) {
      throw new Error("Comment not found");
    }

    const userID = parseInt(req.user?.userId || "0");

    if (userID === comment.user_id || userID === post?.user_id) {
      return next();
    } else {
      return res.status(403).json({ message: "You don't have permission" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
