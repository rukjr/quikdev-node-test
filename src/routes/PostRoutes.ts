import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { IsAdminOrAuthorPost } from "../middlewares/IsAdminOrAuthorPost";
import { upload } from '../config/multerConfig';
import { IsAdmin } from "../middlewares/IsAdmin";

const router = Router();
const postController = new PostController();

/**
 * @swagger
 * paths:
 *   /post/all:
 *     get:
 *       summary: Lista todos os posts com a contagem de comentários
 *       tags: [Post]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Uma lista de posts com a contagem de comentários
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/PostWithCommentCount'
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Posts não encontrados
 * 
 * components:
 *   schemas:
 *     PostWithCommentCount:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           maxLength: 100
 *           example: "Meu Novo Post"
 *         views:
 *           type: integer
 *           example: 0
 *         likes:
 *           type: integer
 *           example: 0
 *         dislikes:
 *           type: integer
 *           example: 0
 *         commentCount:
 *           type: integer
 *           description: "O número total de comentários no post"
 *           example: 5
 */
router.get("/all", IsAdmin, (req, res) => postController.findAllPost(req, res));
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           maxLength: 100
 *           example: "Meu Novo Post"
 *         description:
 *           type: string
 *           example: "Descrição do meu novo post."
 *         views:
 *           type: integer
 *           example: 0
 *         likes:
 *           type: integer
 *           example: 0
 *         dislikes:
 *           type: integer
 *           example: 0
 *         imagePath:
 *           type: string
 *           example: "/images/meu-post.jpg"
 *           nullable: true
 *         user:
 *           $ref: '#/components/schemas/User'
 *     CreatePostRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           example: "Meu Novo Post"
 *         description:
 *           type: string
 *           example: "Descrição do meu novo post."
 *         user_id:
 *           type: integer
 *           example: 1
 *         imagePath:
 *           type: string
 *           example: "/images/meu-post.jpg"
 *           nullable: true
 * 
 * paths:
 *   /post/create:
 *     post:
 *       summary: Cria um novo post
 *       tags: [Post]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatePostRequest'
 *       responses:
 *         200:
 *           description: Post criado com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         401:
 *           description: Não autorizado
 *         400:
 *           description: Dados inválidos
 */
router.post("/create", upload.single('imagePath'), (req, res) => postController.createPost(req, res));
/**
 * @swagger
 * paths:
 *   /post/find/{id}:
 *     get:
 *       summary: Encontra um post pelo ID
 *       tags: [Post]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do post
 *       responses:
 *         200:
 *           description: Detalhes do post encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/DetailedPost'
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Post não encontrado
 * 
 * components:
 *   schemas:
 *     DetailedPost:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Título do Post"
 *         description:
 *           type: string
 *           example: "Descrição do post aqui."
 *         views:
 *           type: integer
 *           example: 100
 *         likes:
 *           type: integer
 *           example: 50
 *         dislikes:
 *           type: integer
 *           example: 5
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Nome do Usuário"
 *             email:
 *               type: string
 *               example: "usuario@example.com"
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *         history:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/History'
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "Comentário sobre o post."
 *     History:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "Histórico de alterações do post."
 */
router.get("/find/:id", IsAdminOrAuthorPost, (req, res) => postController.findPost(req, res));
/**
 * @swagger
 * paths:
 *   /post/update/{id}:
 *     patch:
 *       summary: Atualiza um post pelo ID
 *       tags: [Post]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do post a ser atualizado
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Título do Post Atualizado"
 *                 description:
 *                   type: string
 *                   example: "Descrição atualizada do post."
 *                 imagePath:
 *                   type: string
 *                   example: "/images/meu-post-atualizado.jpg"
 *                   nullable: true
 *       responses:
 *         200:
 *           description: Post atualizado com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         400:
 *           description: Dados inválidos
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Post não encontrado
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Título do Post Atualizado"
 *         description:
 *           type: string
 *           example: "Descrição atualizada do post."
 *         views:
 *           type: integer
 *           example: 100
 *         likes:
 *           type: integer
 *           example: 50
 *         dislikes:
 *           type: integer
 *           example: 5
 *         imagePath:
 *           type: string
 *           example: "/images/meu-post-atualizado.jpg"
 *         user:
 *           $ref: '#/components/schemas/User'
 */
router.patch("/update/:id", IsAdminOrAuthorPost, upload.single('imagePath'), (req, res) => postController.updatePost(req, res));
/**
 * @swagger
 * paths:
 *   /post/delete/{id}:
 *     delete:
 *       summary: Deleta um post pelo ID
 *       tags: [Post]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do post a ser deletado
 *       responses:
 *         200:
 *           description: Post deletado com sucesso
 *         401:
 *           description: Não autorizado
 *         404:
 *           description: Post não encontrado
 */
router.delete("/delete/:id", IsAdminOrAuthorPost, (req, res) => postController.deletePost(req, res));

export default router;
