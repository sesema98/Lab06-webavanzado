import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", (req, res) => postController.getAll(req, res));
router.get("/new", (req, res) => postController.renderCreateForm(req, res));
router.post("/", (req, res) => postController.create(req, res));
router.get("/:id/edit", (req, res) => postController.renderEditForm(req, res));
router.post("/:id/update", (req, res) => postController.update(req, res));
router.post("/:id/delete", (req, res) => postController.remove(req, res));

export default router;
