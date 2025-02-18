const usuRouter = require('express').Router();
const { getAllUsersController, getOneUserController, isAdmin, loginController, createUserController, updateUserController, updateRolController, deleteUserController, deleteUserByEmailController } = require('./../../controllers/controllerUsuario');
const { checkToken } = require('../../middleware/checkToken');

usuRouter.get('/', checkToken, getAllUsersController);

usuRouter.get('/:email', getOneUserController);

usuRouter.post('/login/:email', loginController);

usuRouter.post('/', createUserController);

usuRouter.put('/:email', updateUserController);

usuRouter.put('/:email', updateRolController);

usuRouter.delete('/:email', checkToken, deleteUserByEmailController);

usuRouter.delete('/', checkToken, deleteUserController);

usuRouter.get('/info/admin', checkToken, isAdmin);

module.exports = usuRouter;