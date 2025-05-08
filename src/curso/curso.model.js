import { Schema, model } from "mongoose";

const cursoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del curso es obligatorio"],
        unique: true,
        maxLength: [50, "El nombre no puede exceder los 50 caracteres"]
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"],
        maxLength: [300, "La descripción no puede exceder los 300 caracteres"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

cursoSchema.methods.toJSON = function () {
    const { _id, ...curso } = this.toObject();
    curso.uid = _id;
    return curso;
};

export const Curso = model("Curso", cursoSchema);

export default Curso;