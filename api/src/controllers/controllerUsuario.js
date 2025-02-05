const { getAllUsers, getOneUser, createUser, updateUser } = require('./../services/serviceUsuario');
const bcryptjs = require('bcryptjs');
const generator = require('generate-password');

const getAllUsersController = async ( req, res ) => {
    try{
        const users = await getAllUsers();
        res.status(200).send(users);
    }catch(error){
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}

const getOneUserController = async ( req, res ) => {
    try{
        const usu = await getOneUser(req.params.email);
        if(!usu)
            return res.status(400).send("El usuario no existe");
        res.status(200).send(usu); 
    }catch(error){
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
} 

const createUserController = async (req, res) => {
    try{
        const data = {
        email : req.body.email,
        nombre : req.body.nombre,
        apellidos : req.body.apellidos,
        centro : req.body.centro,
        password : req.body.password,
        }
        if (!data.email || !data.nombre || !data.apellidos || !data.centro || !data.password) 
            return res.status(400).send({ error: 'Solicitud Incorrecta', detalles: 'Todos los campos son requeridos' });
        const usu = await createUser(data);
        res.status(200).send(usu);
    }catch(error){
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}

const updateUserController = async ( req, res ) => {
    try{
        const usu = await getOneUser(req.params.email);
        if(!usu)
            return res.status(400).send("El usuario no existe");
        let pass;
        do {
            pass = generator.generate({
                length: 16,
                numbers: true,
                symbols: true,
            });
        } while (!/^[A-Za-z\d@$!%*?&]{8,36}$/.test(pass));
        usu = await updateUser(req.params.email, pass);
        res.status(200).send(usu);
    }catch(error){
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}

module.exports={
    getAllUsersController,
    getOneUserController,
    createUserController,
    updateUserController,

}