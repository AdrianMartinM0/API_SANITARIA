const { getAllUsers, getOneUser, createUser, updateUser, deleteUser, getOneUserById, deleteUserByEmail } = require('./../services/serviceUsuario');
const bcryptjs = require('bcryptjs');
const generator = require('generate-password');
const moment = require('moment');
const jwt = require('jwt-simple');

const getAllUsersController = async ( req, res, next ) => {
    try{
        const users = await getAllUsers();
        res.status(200).send(users);
    }catch(error){
        next(error);
    }
}

const getOneUserController = async ( req, res, next ) => {
    try{
        const usu = await getOneUser(req.params.email);
        if(!usu){
            const error = new Error('El usuario no existe');
            error.status=400;
            throw error;
        }
        // console.log(usu)
        const iguales = bcryptjs.compareSync(req.body.password, usu.password);
        console.log(iguales)
        if(!iguales){
            const error = new Error('La contraseña no es valida');
            error.status=400;
            throw error;
        }
        res.status(200).send(generateJWT(usu)); 
    }catch(error){
        next(error);
    }
} 

const createUserController = async ( req, res, next ) => {
    try{
        const data = {
        email : req.body.email,
        nombre : req.body.nombre,
        apellidos : req.body.apellidos,
        centro : req.body.centro,
        password : req.body.password,
        }
        if (!data.email || !data.nombre || !data.apellidos || !data.centro || !data.password) {
            const error = new Error('Todos los campos son obligatorios');
            error.status=400;
            throw error;
        }
        let usu = await getOneUser(data.email);
        if(usu){
            const error = new Error('El usuario ya existe');
            error.status=400;
            throw error;
        }
        usu = await createUser(data);
        res.status(200).send(usu);
    }catch(error){
        next(error);
    }
}

const updateUserController = async ( req, res, next ) => {
    try{
        let usu = await getOneUser(req.params.email);
        if(!usu){
            const error = new Error('El usuario no existe');
            error.status=400;
            throw error;
        }
        const pass = generatePass();
        usu = await updateUser(req.params.email, pass);
        res.status(200).send(usu);
    }catch(error){
        next(error);
    }
}

const deleteUserController = async (req, res, next ) => {
    try{
        console.log('User ID from Request:', req.id);
        let usu = await getOneUserById(req.id);
        if(!usu){
            const error = new Error('El usuario no existe');
            error.status=400;
            throw error;
        }
        usu = await deleteUser(req.id);
        res.status(200).send('Usuario eliminado con exito');
    }catch(error){
        next(error);
    }
}

const deleteUserByEmailController = async ( req, res, next ) => {
    try{
        let usu = await getOneUser(req.params.email);
        if(!usu){
            const error = new Error('El usuario no existe');
            error.status=400;
            throw error;
        }
        usu = await deleteUserByEmail(req.params.email);
        res.status(200).send('Usuario eliminado con exito');
    }catch(error){
        next(error);
    }
}

const generatePass = () => {
    let pass;
    const regex = /^[A-Za-z\d@$!%*?&]{8,36}$/;
    do {
        pass = generator.generate({
            length: 16,
            numbers: true,
            symbols: true,
        });
    } while (!regex.test(pass));
    
    return pass;
}

const generateJWT = (usu) => {
    const payload = {
        id: usu.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(2, 'months').unix(),
    }
    return jwt.encode(payload, process.env.FRASE_TOKEN);
}

module.exports={
    getAllUsersController,
    getOneUserController,
    createUserController,
    updateUserController,
    deleteUserController,
    deleteUserByEmailController,
}