import { Schema, model } from "mongoose";

const comentarioSchema = new Schema({
    autor: {
        type: String,
        required: [true, "El nombre del autor es obligatorio"],
        trim: true,
        maxLength: [50, "El nombre no puede exceder los 50 caracteres"]
    },
    contenido: {
        type: String,
        required: [true, "El contenido del comentario es obligatorio"],
        trim: true,
        maxLength: [500, "El comentario no puede exceder los 500 caracteres"]
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: "Publicacion",
        required: [true, "La publicación asociada es obligatoria"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

comentarioSchema.methods.toJSON = function () {
    const { _id, ...comentario } = this.toObject();
    comentario.uid = _id;
    return comentario;
};

export default model("Comentario", comentarioSchema);
