const cassetteRouter = require('express').Router();
const { newCasseteController, getAllCassetteByUserController, updateCassetteController, deleteCasseteController, getOneCassetteController } = require('../../controllers/controllerCassette');

cassetteRouter.post('/', newCasseteController);

cassetteRouter.get('/', getAllCassetteByUserController);

cassetteRouter.put('/:id',  updateCassetteController);

cassetteRouter.delete('/:id', deleteCasseteController );

cassetteRouter.get('/:id', getOneCassetteController);

module.exports = cassetteRouter;