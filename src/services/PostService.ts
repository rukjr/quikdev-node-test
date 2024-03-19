import { Post } from "../entities/Post";
import { IPost } from "../interfaces/IPost";
import { PostRepository } from "../repositories/PostRepository";

export class PostService {
  private postRepository = new PostRepository();

  async findAllPost() {
    return this.postRepository.findAllPost();
  }

  async createPost(data: IPost) {
    return this.postRepository.createPost(data);
  }

  async findPost(id: number) {
    return this.postRepository.findPost(id);
  }

  async updatePost(postId: number, postData: Partial<Post>) {
    return this.postRepository.updatePost(postId, postData);
  }

  async deletePost(id: number) {
    return this.postRepository.deletePost(id);
  }

  async dislikePost(id: number) {
    return this.postRepository.dislikePost(id);
  }

  async likePost(id: number) {
    return this.postRepository.likePost(id);
  }
}
