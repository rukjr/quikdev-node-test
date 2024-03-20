import { AppDataSource } from "../data/data-source";
import { Comment } from "../entities/Comment";
import { History } from "../entities/History";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { IPost } from "../interfaces/IPost";

export class PostRepository {
  async findAllPost() {
    const postRepository = AppDataSource.getRepository(Post);

    const postWithCommentCount = await postRepository
      .createQueryBuilder("post")
      .leftJoin("post.comments", "comment")
      .loadRelationCountAndMap("post.commentCount", "post.comments")
      .select(["post.id", "post.title", "post.views", "post.likes", "post.dislikes"])
      .addSelect((subQuery) => {
        return subQuery
          .select("COUNT(comment.id)", "commentCount")
          .from("comment", "comment")
          .where("comment.post_id = post.id");
      }, "commentCount")
      .groupBy("post.id")
      .getMany();

    if (!postWithCommentCount) {
      throw new Error("Post not found");
    }

    return postWithCommentCount;
  }

  async createPost(data: IPost) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: data.user_id });

    if (!user) {
      throw new Error("User not found");
    }

    const post = new Post();
    post.title = data.title;
    post.description = data.description;
    post.user = user;
    post.views = 0;
    post.likes = 0;
    post.dislikes = 0;

    if (data.imagePath) {
      post.imagePath = data.imagePath;
    }

    const postRepository = AppDataSource.getRepository(Post);
    await postRepository.save(post);

    return post;
  }

  async findPost(id: number) {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("post.comments", "comment")
      .leftJoinAndSelect("comment.user", "commentUser")
      .leftJoinAndSelect("post.history", "history")
      .select([
        "post.id",
        "post.title",
        "post.description",
        "post.views",
        "post.user_id",
        "post.likes",
        "post.dislikes",
        "user.name",
        "user.email",
        "user.id",
        "comment.id",
        "comment.description",
        "comment.createdAt",
        "comment.isRemoved",
        "commentUser.name",
        "commentUser.id",
        "history.id",
        "history.description",
        "history.title",
        "history.createdAt",
      ])
      .where("post.id = :id", { id })
      .getOne();

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  async updatePost(postId: number, postData: Partial<Post>): Promise<Post | null> {
    const postRepository = AppDataSource.getRepository(Post);
    const historyRepository = AppDataSource.getRepository(History);

    let post = await postRepository.findOneBy({ id: postId });
    if (!post) {
      return null;
    }

    if (!postData.views) {
      const newHistory = new History();
      newHistory.post = post;
      newHistory.title = post.title;
      newHistory.description = post.description;

      if (post.imagePath) {
        newHistory.imagePath = post.imagePath;
      }
      await historyRepository.save(newHistory);
    }

    await postRepository.update(postId, postData);

    post = await postRepository.findOneBy({ id: postId });
    return post;
  }

  async deletePost(id: number) {
    const postRepository = AppDataSource.getRepository(Post);
    const commentRepository = AppDataSource.getRepository(Comment);
    const historyRepository = AppDataSource.getRepository(History);

    const comments = await commentRepository.find({ where: { post: { id } } });
    await commentRepository.remove(comments);

    const history = await historyRepository.find({ where: { post: { id } } });
    await historyRepository.remove(history);
    
    const postToDelete = await postRepository.findOneBy({ id });
    if (postToDelete) {
      await postRepository.remove(postToDelete);
    } else {
      throw new Error("Post not found");
    }
  }

  async likePost(postId: number): Promise<void> {
    const postRepository = AppDataSource.getRepository(Post);
    await postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        likes: () => "likes + 1",
      })
      .where("id = :id", { id: postId })
      .execute();
  }

  async dislikePost(postId: number): Promise<void> {
    const postRepository = AppDataSource.getRepository(Post);
    await postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        dislikes: () => "dislikes + 1",
      })
      .where("id = :id", { id: postId })
      .execute();
  }

  async viewPost(postId: number): Promise<void> {
    const postRepository = AppDataSource.getRepository(Post);
    await postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        views: () => "views + 1",
      })
      .where("id = :id", { id: postId })
      .execute();
  }
}
