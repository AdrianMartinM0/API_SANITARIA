const { getAllUsers, getOneUser, createUser, updateUser } = require('./../services/serviceUsuario');
const bcryptjs = require('bcryptjs');
const generator = require('generate-password');

const getAllUsersController = async ( req, res ) => {
    const users = await getAllUsers();
    res.status(200).send(users);
}

const getOneUserController = async ( req, res ) => {
    const usu = await getOneUser(req.params.email);
    res.status(200).send(usu);
} 

const createUserController = async (req, res) => {
    // req.body.password = bcryptjs.hashSync(req.body.password, 14);
    console.log(req.body.password)
    const data = {
        email : req.body.email,
        nombre : req.body.nombre,
        apellidos : req.body.apellidos,
        centro : req.body.centro,
        password : req.body.password,
    }
    const usu = await createUser(req.body, data);
    res.status(200).send(usu);
}

const updateUserController = async ( req, res ) => {
    let pass;
    do {
        pass = generator.generate({
            length: 16,
            numbers: true,
            symbols: true,
        });
    } while (!/^[A-Za-z\d@$!%*?&]{8,36}$/.test(pass));
    console.log(pass)
    // pass = bcryptjs.hashSync(pass, 14);
    const usu = await updateUser(req.params.email, pass);
    res.status(200).send(usu);
}

module.exports={
    getAllUsersController,
    getOneUserController,
    createUserController,
    updateUserController,

}