const usuRouter = require('express').Router();
const Cassette = require('../../database/models/Cassette');
const { deleteCassetecontroller ,  updateCassettecontroller , getAllCassettecontroller , newCassetecontroller } = require('../../controllers/controllerCassette');


usuRouter.post('/', newCassetecontroller);

usuRouter.get('/', getAllCassettecontroller);

usuRouter.put('/:id',  updateCassettecontroller);

usuRouter.delete('/:id', deleteCassetecontroller );

module.exports = usuRouter;