import { Router } from "express";
import { CommentController } from "../controllers/CommentController";
import { IsAdminOrAuthorComment } from "../middlewares/IsAdminOrAuthorComment";

const router = Router();
const commentController = new CommentController();

/**
 * @swagger
 * paths:
 *   /comment/create:
 *     post:
 *       summary: Cria um novo comentário
 *       tags: [Comment]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - description
 *                 - user_id
 *                 - post_id
 *               properties:
 *                 description:
 *                   type: string
 *                   example: "Isso é um comentário."
 *                 user_id:
 *                   type: integer
 *                   description: "ID do usuário que está fazendo o comentário"
 *                   example: 1
 *                 post_id:
 *                   type: integer
 *                   description: "ID do post ao qual o comentário pertence"
 *                   example: 1
 *       responses:
 *         201:
 *           description: Comentário criado com sucesso
 *         400:
 *           description: Dados inválidos
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Usuário ou Post não encontrado
 */
router.post("/create", (req, res) => commentController.createComment(req, res));
/**
 * @swagger
 * paths:
 *   /comment/update/{id}:
 *     patch:
 *       summary: Atualiza um comentário pelo ID
 *       tags: [Comment]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do comentário a ser atualizado
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: "Isso é um comentário atualizado."
 *       responses:
 *         200:
 *           description: Comentário atualizado com sucesso
 *         400:
 *           description: Dados inválidos
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Comentário não encontrado
 */
router.patch("/update/:id", IsAdminOrAuthorComment, (req, res) => commentController.updateComment(req, res));
/**
 * @swagger
 * paths:
 *   /comment/delete/{id}:
 *     delete:
 *       summary: Deleta (soft delete) um comentário pelo ID
 *       tags: [Comment]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do comentário a ser deletado (soft delete)
 *       responses:
 *         200:
 *           description: Comentário deletado (soft delete) com sucesso
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Comentário não encontrado
 */
router.delete("/delete/:id", IsAdminOrAuthorComment, (req, res) => commentController.deleteComment(req, res));

export default router;
