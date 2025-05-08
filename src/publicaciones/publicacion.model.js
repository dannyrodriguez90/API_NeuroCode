import { Schema, model } from "mongoose";

const publicacionSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "El título es obligatorio"],
        maxLength: [100, "El título no puede exceder los 100 caracteres"],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"],
        maxLength: [1000, "La descripción no puede exceder los 1000 caracteres"],
        trim: true
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: "Curso",
        required: [true, "El curso asociado es obligatorio"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

publicacionSchema.methods.toJSON = function () {
    const { _id, ...publicacion } = this.toObject();
    publicacion.uid = _id;
    return publicacion;
};

export default model("Publicacion", publicacionSchema);
