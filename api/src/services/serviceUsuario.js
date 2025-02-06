const Usuario = require('./../database/models/Usuario');

const getAllUsers = async () => {
    const usu = await Usuario.findAll();
    return usu;
}

const getOneUser = async (email) => {
    const usu = await Usuario.findOne({
        where:{
            email: email,
        }
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

const updateUser = async (email, password) => {
    const usu = await Usuario.update(
        {
            password: password 
        },
        { 
            where: { 
                email: email 
            } 
        }
    );
    return usu;
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
    const usu = await Usuario.destroy({
        where: {
            email: email,
        }
    });
    return usu;
}

module.exports = {
    getAllUsers,
    getOneUser,
    getOneUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteUserByEmail,
}