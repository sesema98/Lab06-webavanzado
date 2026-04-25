import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
  async createPost(userId, postData) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return postRepository.create({
      ...this.normalizePostData(postData),
      user: user._id,
    });
  }

  async getPosts() {
    return postRepository.findAll();
  }

  async getPostById(postId) {
    const post = await postRepository.findById(postId);
    if (!post) {
      throw new Error("Post no encontrado");
    }
    return post;
  }

  async getPostsByUser(userId) {
    return postRepository.findByUser(userId);
  }

  async updatePost(postId, userId, postData) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const updatedPost = await postRepository.update(postId, {
      ...this.normalizePostData(postData),
      user: user._id,
      updatedAt: new Date(),
    });

    if (!updatedPost) {
      throw new Error("Post no encontrado");
    }

    return updatedPost;
  }

  async deletePost(postId) {
    const deletedPost = await postRepository.delete(postId);
    if (!deletedPost) {
      throw new Error("Post no encontrado");
    }

    return deletedPost;
  }

  getFormData(postData = {}) {
    return {
      title: postData.title ?? "",
      content: postData.content ?? "",
      userId:
        postData.userId ??
        postData.user?._id?.toString() ??
        postData.user?.toString() ??
        "",
      hashtags: Array.isArray(postData.hashtags)
        ? postData.hashtags.join(", ")
        : postData.hashtags ?? "",
      imageUrl: postData.imageUrl ?? "",
    };
  }

  normalizePostData(postData = {}) {
    return {
      title: String(postData.title ?? "").trim(),
      content: String(postData.content ?? "").trim(),
      hashtags: this.parseHashtags(postData.hashtags),
      imageUrl: String(postData.imageUrl ?? "").trim(),
    };
  }

  parseHashtags(rawHashtags) {
    return String(rawHashtags ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => `#${tag.replace(/^#+/, "").toLowerCase()}`);
  }
}

export default new PostService();
