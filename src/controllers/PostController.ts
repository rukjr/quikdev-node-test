import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { IPost } from "../interfaces/IPost";
import { CustomRequest } from "../@types/customRequest";

export class PostController {
  private postService = new PostService();

  async findAllPost(req: Request, res: Response) {
    try {
      const post = await this.postService.findAllPost();
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Posts not found" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async createPost(req: CustomRequest, res: Response) {
    try {
      const { title, description } = req.body;
      const user_id = req.user?.userId;

      if (!user_id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const postData:IPost = {
        title,
        description,
        user_id: parseInt(user_id),
        imagePath: req.file ? req.file.filename : undefined,
      };

      const post = await this.postService.createPost(postData);

      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Creating a post is not working now, try later" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async findPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await this.postService.findPost(parseInt(id));
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async updatePost(req: CustomRequest, res: Response) {
    const { id } = req.params;
    try {
      const { title, description, views, likes, dislikes } = req.body;
      const postData:IPost = { title, description, views, likes, dislikes };

      if (req.file) {
        postData["imagePath"] = req.file.filename;
      }

      const updatedPost = await this.postService.updatePost(Number(id), postData);

      if (updatedPost) {
        res.json(updatedPost);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.postService.deletePost(parseInt(id));
      res.json({ message: "Post deleted successfully." });
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async dislikePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.postService.dislikePost(parseInt(id));
      res.json({ message: "Post desliked successfully." });
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async likePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.postService.likePost(parseInt(id));
      res.json({ message: "Post liked successfully." });
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async viewPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.postService.viewPost(parseInt(id));
      res.json({ message: "Post viewd successfully." });
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }
}
