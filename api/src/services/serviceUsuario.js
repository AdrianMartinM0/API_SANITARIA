const Usuario = require('./../database/models/Usuario');

const getAllUsers = async () => {
    const usu = await Usuario.findAll();
    return usu;
}

const getOneUser = async (email) => {
    const usu = await Usuario.findOne({
        where: {
            email: email,
        },
        include: ['Cassettes']
    });
    return usu;
}

const getOneUserById = async (id) => {
    const usu = await Usuario.findOne({
        where:{
            id: id,
        }
    });
    return usu;
}

const createUser = async ({ email, nombre, apellidos, password, centro }) => {
    const usu = await Usuario.findOrCreate({
        where: {
            email: email,
        },
        defaults: {
            nombre: nombre,
            apellidos: apellidos,
            password: password,
            centro: centro,
        }
    });
    return usu;
}

const updateUserforAdmin = async (id, {nombre, apellidos, centro, email}) => {
    const user = await Usuario.findOne({ where: { id: id } });
    if (user) {
        user.nombre = nombre;
        user.apellidos = apellidos;
        user.centro = centro;
        user.email = email;
        await user.save();
        console.log('Usuario actualizado:', user);
    }
}

const updateUser = async (email, password) => {
    const user = await Usuario.findOne({ where: { email: email } });
    if (user) {
        user.password = password;
        await user.save();
    }
}

const updateRolUser = async (id) => {
    const user = await Usuario.findOne({ where: { id: id } });
    if (user) {
        user.admin = true;
        await user.save();
    }
}

const deleteUser = async (id) => {
    const usu = await Usuario.destroy({
        where: {
            id: id
        }
    });
    return usu;
}

const deleteUserByEmail = async (email) => {
    await Usuario.destroy({
        where: {
            email: email,
        }
    });
}

const deleteAllUserNoAdmin = async () => {
    await Usuario.destroy({
        where: {
            admin: false,
        }
    });
} 

module.exports = {
    getAllUsers,
    getOneUser,
    getOneUserById,
    createUser,
    updateUser,
    updateUserforAdmin,
    updateRolUser,
    deleteUser,
    deleteUserByEmail,
    deleteAllUserNoAdmin,
}