const CassetteRouter = require('express').Router();
const Cassette = require('../../database/models/Cassette');
const { deleteCassetecontroller ,  updateCassettecontroller , getAllCassettecontroller , newCassetecontroller } = require('../../controllers/controllerCassette');


CassetteRouter.post('/', newCassetecontroller);

CassetteRouter.get('/', getAllCassettecontroller);

CassetteRouter.put('/:id',  updateCassettecontroller);

CassetteRouter.delete('/:id', deleteCassetecontroller );

module.exports = CassetteRouter;