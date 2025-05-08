import { Schema, model } from "mongoose";

const publicacionSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "El título es obligatorio"],
        trim: true
    },
    contenido: {
        type: String,
        required: [true, "El contenido es obligatorio"]
    },
    cursoId: {
        type: Schema.Types.ObjectId,
        ref: "Curso",
        required: true
    },
    comentarios: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comentario"
        }
    ],
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model("Publicacion", publicacionSchema);