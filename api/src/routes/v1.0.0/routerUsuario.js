const usuRouter = require('express').Router();
const { getAllUsersController, getOneUserController, loginController, createUserController, updateUserController, updateRolController, deleteUserController, deleteUserByEmailController } = require('./../../controllers/controllerUsuario');
const { checkToken } = require('../../middleware/checkToken');

usuRouter.get('/', checkToken, getAllUsersController);

usuRouter.get('/:email', getOneUserController);

usuRouter.get('/login/:email', loginController);

usuRouter.post('/', createUserController);

usuRouter.put('/:email', updateUserController);

usuRouter.put('/:email', updateRolController);

usuRouter.delete('/:email', checkToken, deleteUserByEmailController);

usuRouter.delete('/', checkToken, deleteUserController);

module.exports = usuRouter;