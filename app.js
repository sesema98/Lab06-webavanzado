import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import connectDB from "./src/db/database.js";
import homeRoutes from "./src/routes/home.routes.js";
import postRoutes from "./src/routes/post.routes.js";
import userRepository from "./src/repositories/userRepository.js";
import postRepository from "./src/repositories/postRepository.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "src", "public")));

app.use("/", homeRoutes);
app.use("/posts", postRoutes);

const demoUsers = [
  {
    name: "William",
    lastName: "Arevalo",
    email: "earevalo@tecsup.edu.pe",
    age: 23,
    phoneNumber: "987654321",
    password: "Tecsup2026",
  },
  {
    name: "Maria",
    lastName: "Lopez",
    email: "mlopez@tecsup.edu.pe",
    age: 22,
    phoneNumber: "912345678",
    password: "Laboratorio9",
  },
];

async function seedDemoData() {
  const userCount = await userRepository.count();
  if (userCount === 0) {
    await userRepository.createMany(demoUsers);
  }

  const postCount = await postRepository.count();
  if (postCount === 0) {
    const users = await userRepository.findAll();
    if (users.length > 0) {
      await postRepository.create({
        title: "Mi primer post",
        content: "Este laboratorio conecta Node.js con MongoDB usando Mongoose.",
        user: users[0]._id,
        hashtags: ["#mongodb", "#nodejs", "#crud"],
        imageUrl: "",
      });
    }
  }
}

async function startServer() {
  try {
    await connectDB();
    await seedDemoData();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar la aplicacion:", error.message);
    process.exit(1);
  }
}

startServer();
