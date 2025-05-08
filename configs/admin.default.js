import Usuario from '../src/usuario/usuario.model.js';
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