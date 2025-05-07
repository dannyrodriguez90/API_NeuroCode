import jwt from "jsonwebtoken";
import User from "../usuario/usuario.model.js";

export const validarJWT = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token no proporcionado o formato inválido"
            });
        }

        token = token.split(" ")[1];

        const { uid } = jwt.verify(token, process.env.KEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "El usuario no existe en la base de datos"
            });
        }

        if (user.status === false) {
            return res.status(400).json({
                success: false,
                message: "Usuario previamente desactivado"
            });
        }

        req.usuario = user;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Token inválido o expirado",
            error: err.message
        });
    }
};
