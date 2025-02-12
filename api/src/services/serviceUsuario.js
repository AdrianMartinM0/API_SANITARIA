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

const updateUser = async (email, password) => {
    await Usuario.update(
        {
            password: password 
        },
        { 
            where: { 
                email: email 
            } 
        }
    );
}

const updateRolUser = async (email) => {
    const usu = await Usuario.update(
        {
            admin: true 
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
    await Usuario.destroy({
        where: {
            email: email,
        }
    });
}

module.exports = {
    getAllUsers,
    getOneUser,
    getOneUserById,
    createUser,
    updateUser,
    updateRolUser,
    deleteUser,
    deleteUserByEmail,
}