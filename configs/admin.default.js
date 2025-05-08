import Usuario from '../src/usuario/usuario.model.js';
import Curso from "../src/curso/curso.model.js";
import { hash } from 'argon2'; 

export const adminDefault = async () => {
    try {
        const usuario = await Usuario.findOne({ role: "ADMIN_ROLE" });

        if (!usuario) {
            const encryptedPass = await hash("Admin123@"); 

            await Usuario.create({
                name: "Admin",
                surname: "Admin",
                username: "admin",
                email: "adminexample@gmail.com",
                password: encryptedPass, 
                phone: "12345678",
                role: "ADMIN_ROLE"
            });
            console.log("El administrador se creó exitosamente");
        } else {
            console.log("El administrador ya existe");
        } 
    }catch (error){
        console.log(`Error al crear el administrador: ${error}`);
    }
}

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