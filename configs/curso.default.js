import Curso from "../src/curso/curso.model.js";
import mongoose from "mongoose";

export const inicializarCursos = async () => {
    try {
        const cursosPorDefecto = [
            { 
                _id: new mongoose.Types.ObjectId("68210790ea080f65da4a1c23"),
                nombre: "Taller III", 
                descripcion: "Curso de Taller III" 
            },
            { 
                _id: new mongoose.Types.ObjectId("68210790ea080f65da4a1c27"),
                nombre: "Tecnología III", 
                descripcion: "Curso de Tecnología III" 
            },
            { 
                _id: new mongoose.Types.ObjectId("08210790ea080f65da4a1c2a"),
                nombre: "Prácticas Supervisadas", 
                descripcion: "Curso de Prácticas Supervisadas" 
            }
        ];

        for (const curso of cursosPorDefecto) {
            await Curso.deleteOne({ nombre: curso.nombre });

            await Curso.create(curso);
            console.log(`Curso creado: ${curso.nombre}`);
        }
    } catch (err) {
        console.error("Error al inicializar los cursos por defecto:", err.message);
    }
};
