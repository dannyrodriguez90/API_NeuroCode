import Curso from "./curso.model.js";


export const crearCurso = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const nuevoCurso = new Curso({ nombre, descripcion, status: true });
        await nuevoCurso.save();

        return res.status(201).json({
            success: true,
            message: "Curso creado exitosamente",
            curso: nuevoCurso
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear el curso",
            error: err.message
        });
    }
};


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


export const actualizarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const cursoActualizado = await Curso.findByIdAndUpdate(
            id,
            { nombre, descripcion },
            { new: true }
        );

        if (!cursoActualizado) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Curso actualizado exitosamente",
            curso: cursoActualizado
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el curso",
            error: err.message
        });
    }
};


export const eliminarCurso = async (req, res) => {
    try {
        const { id } = req.params;

        const cursoEliminado = await Curso.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        );

        if (!cursoEliminado) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Curso eliminado exitosamente",
            curso: cursoEliminado
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el curso",
            error: err.message
        });
    }
};