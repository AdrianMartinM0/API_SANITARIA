const usuRouter = require('express').Router();
const { getAllUsers, getOneUser, createUser, updateUser } = require('../../controllers/controllerUsuario');

// IMPORTANTEEEEEE!!!!! FALTA MIDLEWARE
// MUCHO MAS IMPORTANTEEEEEEEEEEEEE!!!!!!!!!!!!
// FALTA POR MEJORAR LA RESPUESTA AL USUARIO, ABRIA QUE AGREGAR AL MENOS FALLOS AL CONTENIDO DEL USUARIO CON ERRORES 400
// Y SI SE PUEDE AGREGAR LOS FALLOS CON EL SERVER COMO FALLO 500

usuRouter.get('/', getAllUsers);

usuRouter.get('/:email', getOneUser);

usuRouter.post('/', createUser);

usuRouter.put('/:email', updateUser);


module.exports = usuRouter;