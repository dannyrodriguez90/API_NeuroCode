import { body, param } from "express-validator";
import { validarCampos } from "./validate-campos.js";
import { handleErrors } from "./haddle-error.js";



export const validarObtenerCursoPorId = [
    param("id")
        .isMongoId()
        .withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

