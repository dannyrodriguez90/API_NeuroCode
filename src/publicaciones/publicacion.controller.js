import Publicacion from "./publicacion.model.js";
import Curso from "../curso/curso.model.js"; 

export const crearPublicacion = async (req, res) => {
    try {
        const { titulo, contenido, cursoId } = req.body; 
        const cursoExistente = await Curso.findById(cursoId);
        if (!cursoExistente) {
            return res.status(400).json({
                success: false,
                message: "El curso asociado no existe"
            });
        }
        const nuevaPublicacion = new Publicacion({ titulo, contenido, cursoId }); 
        await nuevaPublicacion.save();

        return res.status(201).json({
            success: true,
            message: "Publicación creada exitosamente",
            publicacion: nuevaPublicacion
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la publicación",
            error: err.message
        });
    }
};

export const obtenerPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find({ status: true })
            .populate("cursoId", "nombre descripcion")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            publicaciones
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message
        });
    }
};

export const obtenerPublicacionPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await Publicacion.findById(id)
            .populate("comentarios");

        if (!publicacion) {
            return res.status(404).json({ message: "Publicación no encontrada." });
        }

        res.status(200).json(publicacion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la publicación.", error });
    }
};

export const obtenerPublicacionesPorCurso = async (req, res) => {
    try {
        const { cursoId } = req.params;
        const publicaciones = await Publicacion.find({ cursoId: cursoId, status: true });
        return res.status(200).json({
            success: true,
            publicaciones
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener publicaciones por curso",
            error: err.message
        });
    }
};

export const actualizarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const publicacion = await Publicacion.findById(id);
        if (!publicacion || !publicacion.status) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }
        const publicacionActualizada = await Publicacion.findByIdAndUpdate(id, data, { new: true });
        return res.status(200).json({
            success: true,
            message: "Publicación actualizada",
            publicacion: publicacionActualizada
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error: err.message
        });
    }
};

export const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const publicacion = await Publicacion.findById(id);
        if (!publicacion || !publicacion.status) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }
        publicacion.status = false;
        await publicacion.save();
        return res.status(200).json({
            success: true,
            message: "Publicación eliminada lógicamente"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: err.message
        });
    }
};

export const eliminarPublicacionPermanente = async (req, res) => {
    try {
        const { id } = req.params;
        const publicacion = await Publicacion.findById(id);
        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }
        await publicacion.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Publicación eliminada permanentemente"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación permanentemente",
            error: err.message
        });
    }
};