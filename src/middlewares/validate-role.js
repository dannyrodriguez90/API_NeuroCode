export const validateRole = (req, res, next) => {
    try {
        const { role } = req.usuario; 
        if (role !== "ADMIN_ROLE") {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para realizar esta acción"
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al verificar el rol",
            error: err.message
        });
    }
};