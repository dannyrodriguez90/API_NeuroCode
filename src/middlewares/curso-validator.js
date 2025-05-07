import { body, param } from "express-validator";
import { validarCampos } from "./validate-campos.js";
import { handleErrors } from "./haddle-error.js";

// Validar creación de curso
export const validarCrearCurso = [
    body("nombre")
        .notEmpty()
        .withMessage("El nombre es requerido")
        .isString()
        .withMessage("El nombre debe ser un texto")
        .isLength({ min: 3, max: 50 })
        .withMessage("El nombre debe tener entre 3 y 50 caracteres"),
    body("descripcion")
        .notEmpty()
        .withMessage("La descripción es requerida")
        .isString()
        .withMessage("La descripción debe ser un texto")
        .isLength({ min: 10, max: 200 })
        .withMessage("La descripción debe tener entre 10 y 200 caracteres"),
    validarCampos,
    handleErrors
];

// Validar obtención de curso por ID
export const validarObtenerCursoPorId = [
    param("id")
        .isMongoId()
        .withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

// Validar actualización de curso
export const validarActualizarCurso = [
    param("id")
        .isMongoId()
        .withMessage("No es un ID válido de MongoDB"),
    body("nombre")
        .optional()
        .isString()
        .withMessage("El nombre debe ser un texto")
        .isLength({ min: 3, max: 50 })
        .withMessage("El nombre debe tener entre 3 y 50 caracteres"),
    body("descripcion")
        .optional()
        .isString()
        .withMessage("La descripción debe ser un texto")
        .isLength({ min: 10, max: 200 })
        .withMessage("La descripción debe tener entre 10 y 200 caracteres"),
    validarCampos,
    handleErrors
];

// Validar eliminación de curso
export const validarEliminarCurso = [
    param("id")
        .isMongoId()
        .withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];