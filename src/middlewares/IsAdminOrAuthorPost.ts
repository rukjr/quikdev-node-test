import { Response, NextFunction } from "express";
import { CustomRequest } from "../@types/customRequest";
import { AppDataSource } from "../data/data-source";
import { Post } from "../entities/Post";

export const IsAdminOrAuthorPost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const postId = parseInt(req.params.id);

  if (!postId) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  if (req.user?.level === "admin") {
    return next();
  }

  try {
    const postRepository = AppDataSource.getRepository(Post);
    const post = await postRepository.findOneBy({ id: postId });

    if (post && req.user?.userId === post.user.id.toString()) {
      return next();
    } else {
      return res.status(403).json({ message: "You don't have permission" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
