import { body, param } from "express-validator";
import { emailExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-campos.js";
import { handleErrors } from "./haddle-error.js";

export const validarRegistro = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("email").notEmpty().withMessage("El correo electrónico es requerido"),
    body("email").isEmail().withMessage("El correo electrónico no es válido"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("La contraseña debe contener al menos 8 caracteres, una letra minúscula, una mayúscula, un número y un símbolo"),
    validarCampos,
    handleErrors
];

export const validarLogin = [
    body("email").notEmpty().withMessage("El correo electrónico es requerido"),
    body("email").isEmail().withMessage("El correo electrónico no es válido"),
    body("password").isLength({ min: 8 }).withMessage("La contraseña debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

export const validarObtenerUsuarios = [
    param("limite")
        .optional()
        .isInt({ min: 1 })
        .withMessage("El parámetro 'limite' debe ser un número entero positivo"),
    param("desde")
        .optional()
        .isInt({ min: 0 })
        .withMessage("El parámetro 'desde' debe ser un número entero mayor o igual a 0"),
    validarCampos,
    handleErrors
];

export const validarEliminarUsuario = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];

export const validarActualizarPassword = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    body("newPassword").isLength({ min: 8 }).withMessage("La nueva contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

export const validarActualizarUsuario = [
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];
