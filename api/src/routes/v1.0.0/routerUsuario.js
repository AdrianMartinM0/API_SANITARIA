const usuRouter = require('express').Router();
const { getAllUsersController, getOneUserController, isAdmin, loginController, createUserController, updateUserController, updateUserForAdminController, updateRolController, deleteUserController, deleteUserByEmailController } = require('./../../controllers/controllerUsuario');
const { checkToken } = require('../../middleware/checkToken');

usuRouter.get('/', checkToken, getAllUsersController);

usuRouter.get('/:email', getOneUserController);

usuRouter.post('/login/:email', loginController);

usuRouter.post('/', createUserController);

usuRouter.put('/update/:id', checkToken, updateUserForAdminController);

usuRouter.put('/:email', updateUserController);

usuRouter.put('/rol/:id', checkToken, updateRolController);

usuRouter.delete('/:email', checkToken, deleteUserByEmailController);

usuRouter.delete('/one/:id', checkToken, deleteUserController);

usuRouter.get('/info/admin', checkToken, isAdmin);

module.exports = usuRouter;