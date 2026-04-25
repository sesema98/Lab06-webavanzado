import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
  async getAll(req, res) {
    try {
      const posts = await postService.getPosts();
      const message = this.getStatusMessage(req.query.status);

      res.render("posts", { posts, message });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async renderCreateForm(req, res) {
    const users = await userRepository.findAll();
    res.render("post-form", {
      pageTitle: "Registrar Post",
      submitLabel: "Guardar post",
      formAction: "/posts",
      formData: postService.getFormData(),
      users,
      errors: [],
    });
  }

  async create(req, res) {
    try {
      const { userId, ...postData } = req.body ?? {};
      await postService.createPost(userId, postData);
      res.redirect("/posts?status=created");
    } catch (error) {
      const users = await userRepository.findAll();
      res.status(400).render("post-form", {
        pageTitle: "Registrar Post",
        submitLabel: "Guardar post",
        formAction: "/posts",
        formData: postService.getFormData(req.body),
        users,
        errors: this.formatErrors(error),
      });
    }
  }

  async renderEditForm(req, res) {
    try {
      const [post, users] = await Promise.all([
        postService.getPostById(req.params.id),
        userRepository.findAll(),
      ]);

      res.render("post-form", {
        pageTitle: "Editar Post",
        submitLabel: "Actualizar post",
        formAction: `/posts/${post._id}/update`,
        formData: postService.getFormData(post),
        users,
        errors: [],
      });
    } catch (error) {
      res.status(404).redirect("/posts");
    }
  }

  async update(req, res) {
    try {
      const { userId, ...postData } = req.body ?? {};
      await postService.updatePost(req.params.id, userId, postData);
      res.redirect("/posts?status=updated");
    } catch (error) {
      const users = await userRepository.findAll();
      res.status(400).render("post-form", {
        pageTitle: "Editar Post",
        submitLabel: "Actualizar post",
        formAction: `/posts/${req.params.id}/update`,
        formData: postService.getFormData(req.body),
        users,
        errors: this.formatErrors(error),
      });
    }
  }

  async remove(req, res) {
    try {
      await postService.deletePost(req.params.id);
      res.redirect("/posts?status=deleted");
    } catch (error) {
      res.status(400).redirect("/posts");
    }
  }

  formatErrors(error) {
    if (error.name === "ValidationError") {
      return Object.values(error.errors).map((detail) => detail.message);
    }

    if (error.message?.includes("required")) {
      return ["Debes completar todos los campos obligatorios del formulario."];
    }

    return [error.message];
  }

  getStatusMessage(status) {
    const messages = {
      created: "Post registrado correctamente.",
      updated: "Post actualizado correctamente.",
      deleted: "Post eliminado correctamente.",
    };

    return messages[status] ?? "";
  }
}

export default new PostController();
