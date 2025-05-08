import { Router } from "express";
import { validarCrearCurso, validarObtenerCursoPorId, validarActualizarCurso, validarEliminarCurso } from "../middlewares/curso-validator.js";
import { crearCurso, obtenerCursos, obtenerCursoPorId, actualizarCurso, eliminarCurso } from "./curso.controller.js";

const router = Router();

/**
 * @swagger
 * /curso/crearCurso/:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Curso]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del curso
 *               descripcion:
 *                 type: string
 *                 description: Descripción del curso
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *       500:
 *         description: Error al crear el curso
 */
router.post("/crearCurso/", validarCrearCurso, crearCurso);

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

/**
 * @swagger
 * /curso/actualizarCurso/{id}:
 *   put:
 *     summary: Actualizar un curso
 *     tags: [Curso]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del curso
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del curso
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error al actualizar el curso
 */
router.put("/actualizarCurso/:id", validarActualizarCurso, actualizarCurso);

/**
 * @swagger
 * /curso/eliminarCurso/{id}:
 *   delete:
 *     summary: Eliminar un curso (lógico)
 *     tags: [Curso]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error al eliminar el curso
 */
router.delete("/eliminarCurso/:id",  eliminarCurso);

export default router;