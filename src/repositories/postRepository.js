import Post from "../models/Post.js";

class PostRepository {
  async create(post) {
    return Post.create(post);
  }

  async findAll() {
    return Post.find().populate("user").sort({ createdAt: -1 });
  }

  async findById(id) {
    return Post.findById(id).populate("user");
  }

  async findByUser(userId) {
    return Post.find({ user: userId }).populate("user").sort({ createdAt: -1 });
  }

  async update(postId, postData) {
    return Post.findByIdAndUpdate(postId, postData, {
      new: true,
      runValidators: true,
    }).populate("user");
  }

  async delete(postId) {
    return Post.findByIdAndDelete(postId);
  }

  async count() {
    return Post.countDocuments();
  }
}

export default new PostRepository();
