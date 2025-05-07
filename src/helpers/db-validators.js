import User from "../usuario/usuario.model.js";


export const emailExists = async (email = "") => {
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
};

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({ username });
    if (existe) {
        throw new Error(`El nombre de usuario ${username} ya está registrado`);
    }
};

export const userExists = async (uid = "") => {
    const existe = await User.findById(uid);
    if (!existe) {
        throw new Error("No existe un usuario con el ID proporcionado");
    }
};
