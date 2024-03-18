import { Router } from "express";
import { AuthService } from "../services/AuthService";

const router = Router();

/**
 * @swagger
 * paths:
 *   /auth/login:
 *     post:
 *       summary: Autentica um usuário e retorna um token JWT
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "user@example.com"
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: "password123"
 *       responses:
 *         200:
 *           description: Login bem-sucedido, retorna token JWT
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImxldmVsIjoidXNlciIsImlhdCI6MTYwOTc1OTIwMCwiZXhwIjoxNjA5ODQ1NjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *         401:
 *           description: Email ou senha incorretos
 */
router.post("/login", AuthService);

export default router;
