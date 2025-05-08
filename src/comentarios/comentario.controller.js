import Publicacion from "../publicaciones/publicacion.model.js";
import Comentario from "./comentario.model.js";


export const crearComentario = async (req, res) => {
    try {
        const { autor, contenido, publicacion } = req.body;
        if (!autor || !contenido || !publicacion) {
            return res.status(400).json({
                message: "Los campos autor, contenido y publicacion son obligatorios."
            });
        }
        const nuevoComentario = new Comentario({ autor, contenido, publicacion });
        await nuevoComentario.save();
        await Publicacion.findByIdAndUpdate(
            publicacion,
            { $push: { comentarios: nuevoComentario._id } },
            { new: true }
        );

        res.status(201).json(nuevoComentario);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el comentario.", error });
    }
};


export const obtenerComentariosPorPublicacion = async (req, res) => {
    try {
        const { publicacionId } = req.params;
        const comentarios = await Comentario.find({ 
            publicacion: publicacionId, 
            status: true 
        }).sort({ fecha: -1 });

        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los comentarios.", error });
    }
};


export const actualizarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;
        const { contenido } = req.body;
        if (!contenido) {
            return res.status(400).json({
                message: "El contenido del comentario es obligatorio para actualizar."
            });
        }
        const comentarioActualizado = await Comentario.findByIdAndUpdate(
            comentarioId,
            { contenido },
            { new: true, runValidators: true }
        );
        if (!comentarioActualizado) {
            return res.status(404).json({ message: "Comentario no encontrado." });
        }
        res.status(200).json({ message: "Comentario actualizado correctamente.", comentario: comentarioActualizado });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el comentario.", error });
    }
};

export const eliminarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;
        const comentario = await Comentario.findByIdAndUpdate(
            comentarioId,
            { status: false },
            { new: true }
        );

        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado." });
        }

        res.status(200).json({ message: "Comentario eliminado correctamente.", comentario });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el comentario.", error });
    }
};