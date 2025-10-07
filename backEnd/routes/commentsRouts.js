import { Router } from "express";
import * as CommentController from "../controllers/commentsControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments on posts
 */

/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 */
router.post("/:postId", authMiddleware, requireRole(["admin", "user"]), CommentController.createComment);
router.get("/:postId", authMiddleware, requireRole(["admin", "user"]), CommentController.listComments);

/**
 * @swagger
 * /comments/{postId}/{commentId}:
 *   get:
 *     summary: Get a single comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment data
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Comment deleted
 */
router.get("/:postId/:commentId", authMiddleware, requireRole(["admin", "user"]), CommentController.getComment);
router.patch("/:postId/:commentId", authMiddleware, requireRole(["admin", "user"]), CommentController.updateComment);
router.delete("/:postId/:commentId", authMiddleware, requireRole(["admin", "user"]), CommentController.deleteComment);

export const commentRouter = router;
