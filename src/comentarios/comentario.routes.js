import { Router } from "express";
import {
    crearComentario,
    obtenerComentariosPorPublicacion,
    actualizarComentario,
    eliminarComentario
} from "./comentario.controller.js";

const router = Router();

/**
 * @swagger
 * /comentarios/crearComentario:
 *   post:
 *     summary: Crea un nuevo comentario.
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               autor:
 *                 type: string
 *               contenido:
 *                 type: string
 *               publicacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente.
 */
router.post("/crearComentario/", crearComentario);

/**
 * @swagger
 * /comentarios/obtenerComentario/{publicacionId}:
 *   get:
 *     summary: Obtiene comentarios activos de una publicación.
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: publicacionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios.
 */
router.get("/obtenerComentario/:publicacionId", obtenerComentariosPorPublicacion);

/**
 * @swagger
 * /comentarios/actualizarComentario/{comentarioId}:
 *   put:
 *     summary: Actualiza un comentario por su ID.
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: comentarioId
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
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente.
 */
router.put("/actualizarComentario/:comentarioId", actualizarComentario);

/**
 * @swagger
 * /comentarios/eliminarComentario/{comentarioId}:
 *   delete:
 *     summary: Elimina un comentario de forma lógica.
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: comentarioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente.
 */
router.delete("/eliminarComentario/:comentarioId", eliminarComentario);

export default router;