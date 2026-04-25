import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El titulo es obligatorio"],
    minlength: [5, "El titulo debe tener al menos 5 caracteres"],
    maxlength: [30, "El titulo no puede superar los 30 caracteres"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "El contenido es obligatorio"],
    minlength: [10, "El contenido debe tener al menos 10 caracteres"],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El autor es obligatorio"],
  },
  hashtags: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("Post", postSchema);
