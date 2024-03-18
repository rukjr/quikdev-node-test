import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { IsAdmin } from "../middlewares/IsAdmin";
import { IsSameOrAdmin } from "../middlewares/IsSameOrAdmin";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * paths:
 *   /user/create:
 *     post:
 *       summary: Cria um novo usuário
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *                 - level
 *               properties:
 *                 name:
 *                   type: string
 *                   maxLength: 100
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   maxLength: 191
 *                   format: email
 *                   example: "johndoe@example.com"
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: "securePassword123"
 *                 level:
 *                   type: string
 *                   maxLength: 100
 *                   example: "user"
 *       responses:
 *         201:
 *           description: Usuário criado com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         400:
 *           description: Dados inválidos
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "John Doe"
 *         level:
 *           type: string
 *           example: "user"
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *         password:
 *           type: string
 *           example: "securePassword123"
 *         posts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Post'
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 */
router.post("/create", IsAdmin, (req, res) => userController.createUser(req, res));
/**
 * @swagger
 * paths:
 *   /user/find:
 *     post:
 *       summary: Busca um usuário pelo email
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "johndoe@example.com"
 *       responses:
 *         200:
 *           description: Usuário encontrado com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "johndoe@example.com"
 *                   level:
 *                     type: string
 *                     example: "user"
 *         404:
 *           description: Usuário não encontrado
 *         400:
 *           description: Requisição inválida
 */
router.post("/find", IsAdmin, (req, res) => userController.findUserByEmail(req, res));
/**
 * @swagger
 * paths:
 *   /user/update/{id}:
 *     patch:
 *       summary: Atualiza informações do usuário pelo ID
 *       tags: [User]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do usuário a ser atualizado
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Jane Doe"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "janedoe@example.com"
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: "newSecurePassword123"
 *                 level:
 *                   type: string
 *                   example: "admin"
 *       responses:
 *         200:
 *           description: Usuário atualizado com sucesso
 *         400:
 *           description: Dados inválidos
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Usuário não encontrado
 */
router.patch("/update/:id", IsSameOrAdmin, (req, res) => userController.updateUser(req, res));
/**
 * @swagger
 * paths:
 *   /user/delete/{id}:
 *     delete:
 *       summary: Deleta um usuário pelo ID
 *       tags: [User]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do usuário a ser deletado
 *       responses:
 *         200:
 *           description: Usuário deletado com sucesso
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Usuário não encontrado
 */
router.delete("/delete/:id", IsAdmin, (req, res) => userController.deleteUser(req, res));

export default router;
