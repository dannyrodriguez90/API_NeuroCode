import Curso from "./curso.model.js";



export const obtenerCursos = async (req, res) => {
    try {
        const cursos = await Curso.find();

        return res.status(200).json({
            success: true,
            cursos
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        });
    }
};

export const obtenerCursoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findById(id);

        if (!curso) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            curso
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el curso",
            error: err.message
        });
    }
};


