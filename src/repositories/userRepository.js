import User from "../models/User.js";

class UserRepository {
  async create(user) {
    return User.create(user);
  }

  async createMany(users) {
    return User.insertMany(users);
  }

  async findAll() {
    return User.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return User.findById(id);
  }

  async count() {
    return User.countDocuments();
  }
}

export default new UserRepository();
