const cassetteRouter = require('express').Router();
const { newCasseteController, getAllCassetteByUserController, updateCassetteController, deleteCasseteController, getOneCassetteController, deleteAllCassettesController } = require('../../controllers/controllerCassette');

cassetteRouter.post('/', newCasseteController);

cassetteRouter.get('/', getAllCassetteByUserController);

cassetteRouter.put('/:id',  updateCassetteController);

cassetteRouter.delete('/:id', deleteCasseteController );

cassetteRouter.get('/:id', getOneCassetteController);

cassetteRouter.delete('/', deleteAllCassettesController);

module.exports = cassetteRouter;