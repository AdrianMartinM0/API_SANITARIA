const Usuario = require('../../database/models/Usuario');

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

const createUser = async ({ email, nombre, apellido, password, centro }) => {
    const usu = await Usuario.findOrCreate({
        where: {
            email: email,
        },
        defaults: {
            nombre: nombre,
            apellido: apellido,
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

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,

}