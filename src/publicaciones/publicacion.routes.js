import { Router } from "express";
import {
    crearPublicacion,
    obtenerPublicaciones,
    obtenerPublicacionPorId,
    obtenerPublicacionesPorCurso,
    actualizarPublicacion,
    eliminarPublicacion,
    eliminarPublicacionPermanente
} from "./publicacion.controller.js";

const router = Router();

/**
 * @swagger
 * /publicaciones/crearPublicacion:
 *   post:
 *     summary: Crea una nueva publicación.
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               cursoId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente.
 */
router.post("/crearPublicacion/", crearPublicacion);

/**
 * @swagger
 * /publicaciones:
 *   get:
 *     summary: Obtiene todas las publicaciones.
 *     tags: [Publicaciones]
 *     responses:
 *       200:
 *         description: Lista de publicaciones.
 */
router.get("/", obtenerPublicaciones);

/**
 * @swagger
 * /publicaciones/obtenerPublicacionID/{id}:
 *   get:
 *     summary: Obtiene una publicación por su ID.
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación encontrada.
 */
router.get("/obtenerPublicacionID/:id", obtenerPublicacionPorId);

/**
 * @swagger
 * /publicaciones/obtenerCurso/{cursoId}:
 *   get:
 *     summary: Obtiene publicaciones asociadas a un curso.
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de publicaciones del curso.
 */
router.get("/obtenerCurso/:cursoId", obtenerPublicacionesPorCurso);

/**
 * @swagger
 * /publicaciones/actualizarPublicacion/{id}:
 *   put:
 *     summary: Actualiza una publicación por su ID.
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación actualizada exitosamente.
 */
router.put("/actualizarPublicacion/:id", actualizarPublicacion);

/**
 * @swagger
 * /publicaciones/eliminarPublicacion/{id}:
 *   delete:
 *     summary: Elimina una publicación de forma lógica.
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente.
 */
router.delete("/eliminarPublicacion/:id", eliminarPublicacion);

/**
 * @swagger
 * /publicaciones/eliminarPermanente/{id}:
 *   delete:
 *     summary: Elimina una publicación de forma permanente.
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación eliminada permanentemente.
 */
router.delete("/eliminarPermanente/:id", eliminarPublicacionPermanente);

export default router;