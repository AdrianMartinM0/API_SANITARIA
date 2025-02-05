const { getAllUsers, getOneUser, createUser, updateUser } = require('./../services/serviceUsuario');
const bcryptjs = require('bcryptjs');

const getAllUsers = async ( req, res ) => {
    const users = await getAllUsers();
    res.status(200).send(users);
}

const getOneUser = async ( req, res ) => {
    const usu = await getOneUser(req.params.email);
    res.status(200).send(usu);
} 

const createUser = async (req, res) => {
    req.body.password = bcryptjs.hashSync(req.body.password, 14);
    const data = {
        email : req.body.email,
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        centro : centro.body.centro,
        pass : req.body.password,
    }
    const usu = await createUser(req.body);
    res.status(200).send(usu);
}

const updateUser = async ( req, res ) => {
    // const pass = generarNewPass;
    const usu = await updateUser(req.params.email, 'pass');
    res.status(200).send(usu);
}

module.exports={
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,

}