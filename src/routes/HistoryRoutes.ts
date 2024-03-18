import { Router } from "express";
import { HistoryController } from "../controllers/HistoryController";
import { upload } from '../config/multerConfig';

const router = Router();
const historyController = new HistoryController();

/**
 * @swagger
 * paths:
 *   /history/create:
 *     post:
 *       summary: Cria um novo registro de histórico para um post
 *       tags: [History]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - description
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Alteração de Título"
 *                 description:
 *                   type: string
 *                   example: "O título do post foi atualizado."
 *                 imagePath:
 *                   type: string
 *                   example: "/images/updated-post.jpg"
 *                   nullable: true
 *                 post_id:
 *                   type: integer
 *                   description: "ID do post relacionado ao registro de histórico"
 *                   example: 1
 *       responses:
 *         201:
 *           description: Registro de histórico criado com sucesso
 *         400:
 *           description: Dados inválidos
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Post não encontrado
 */
router.post("/create", upload.single('imagePath'), (req, res) => historyController.createHistory(req, res));
/**
 * @swagger
 * paths:
 *   /history/delete/{id}:
 *     delete:
 *       summary: Deleta um registro de histórico pelo ID
 *       tags: [History]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do registro de histórico a ser deletado
 *       responses:
 *         200:
 *           description: Registro de histórico deletado com sucesso
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Registro de histórico não encontrado
 */
router.delete("/delete/:id", (req, res) => historyController.deleteHistory(req, res));

export default router;
