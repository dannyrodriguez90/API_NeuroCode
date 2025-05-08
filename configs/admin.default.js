import Curso from "../src/curso/curso.model.js";

export const inicializarCursos = async () => {
    try {
        const cursosPorDefecto = [
            { nombre: "Taller III", descripcion: "Curso de Taller III" },
            { nombre: "Tecnología III", descripcion: "Curso de Tecnología III" },
            { nombre: "Prácticas Supervisadas", descripcion: "Curso de Prácticas Supervisadas" }
        ];

        for (const curso of cursosPorDefecto) {
            const existeCurso = await Curso.findOne({ nombre: curso.nombre });
            if (!existeCurso) {
                await Curso.create(curso);
                console.log(`Curso creado: ${curso.nombre}`);
            } else {
                console.log(`El curso "${curso.nombre}" ya existe.`);
            }
        }
    } catch (err) {
        console.error("Error al inicializar los cursos por defecto:", err.message);
    }
};