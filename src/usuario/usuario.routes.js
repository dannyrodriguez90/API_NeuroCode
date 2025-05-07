import { Router } from "express";
import { obtenerUsuarios, eliminarUsuario, actualizarContrasena, actualizarUsuario } from "./usuario.controller.js";
import { validarObtenerUsuarios, validarEliminarUsuario, validarActualizarPassword, validarActualizarUsuario } from "../middlewares/usuario-validator.js";

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener una lista de usuarios
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Número máximo de usuarios a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Número de usuarios a omitir desde el inicio
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get("/", validarObtenerUsuarios, obtenerUsuarios);

/**
 * @swagger
 * /usuarios/eliminarUsuario/{uid}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete("/eliminarUsuario/:uid", validarEliminarUsuario, eliminarUsuario);

/**
 * @swagger
 * /usuarios/actualizarPassword/{uid}:
 *   put:
 *     summary: Actualizar la contraseña de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *                 example: NuevaContraseña123!
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       500:
 *         description: Error al actualizar la contraseña
 */
router.put("/actualizarPassword/:uid", validarActualizarPassword, actualizarContrasena);

/**
 * @swagger
 * /usuarios/actualizarUsuario/{uid}:
 *   put:
 *     summary: Actualizar los datos de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Carlos
 *               surname:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: Gómez
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: carlosgomez
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: carlos.gomez@example.com
 *               phone:
 *                 type: string
 *                 description: Teléfono del usuario
 *                 example: 12345678
 *               role:
 *                 type: string
 *                 description: Rol del usuario
 *                 example: ADMIN_ROLE
 *               status:
 *                 type: boolean
 *                 description: Estado del usuario
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       500:
 *         description: Error al actualizar el usuario
 */
router.put("/actualizarUsuario/:uid", validarActualizarUsuario, actualizarUsuario);

export default router;