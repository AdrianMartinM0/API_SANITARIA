const usuRouter = require('express').Router();
const { getAllUsersController, getOneUserController, createUserController, updateUserController } = require('../../controllers/controllerUsuario');
// const { validationUser } = require('../../middleware/middlewareUsuario');

// IMPORTANTEEEEEE!!!!! FALTA MIDLEWARE
// MUCHO MAS IMPORTANTEEEEEEEEEEEEE!!!!!!!!!!!!
// FALTA POR MEJORAR LA RESPUESTA AL USUARIO, ABRIA QUE AGREGAR AL MENOS FALLOS AL CONTENIDO DEL USUARIO CON ERRORES 400
// Y SI SE PUEDE AGREGAR LOS FALLOS CON EL SERVER COMO FALLO 500

usuRouter.get('/', getAllUsersController);

usuRouter.get('/:email', getOneUserController);

usuRouter.post('/', createUserController);

usuRouter.put('/:email', updateUserController);


module.exports = usuRouter;