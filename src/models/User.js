import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: [true, "La edad es obligatoria"],
    min: [18, "La edad minima permitida es 18"],
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "La contrasena es obligatoria"],
    minlength: [8, "La contrasena debe tener al menos 8 caracteres"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
