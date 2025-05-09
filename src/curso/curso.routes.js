import { Router } from "express";
import { validarObtenerCursoPorId } from "../middlewares/curso-validator.js";
import { obtenerCursos, obtenerCursoPorId } from "./curso.controller.js";

const router = Router();



/**
 * @swagger
 * /curso/:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Curso]
 *     responses:
 *       200:
 *         description: Lista de todos los cursos
 *       500:
 *         description: Error al obtener los cursos
 */
router.get("/", obtenerCursos);

/**
 * @swagger
 * /curso/obtenerCursoID/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     tags: [Curso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error al obtener el curso
 */
router.get("/obtenerCursoID/:id", validarObtenerCursoPorId, obtenerCursoPorId);


export default router;